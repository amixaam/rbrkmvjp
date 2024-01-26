<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;


class ReportController extends Controller
{
    public function createAdminReport(Request $request)
    {
        // Validate the request
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => [
                'nullable',
                'date',
            ],
        ]);

        // Get start and end dates from the validated request
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Fetch your table contents from the database or wherever you have them
        $tableData = DB::table('products')
            ->join('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category',
                'shelves.name as destination_shelf',
                DB::raw("DATE_FORMAT(products.created_at, '%y-%d-%m') as formatted_created_at") // Format the created_at date
            )
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('products.created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('products.created_at', '<=', $endDate);
            })
            ->get();

        // Remove the original created_at column from the collection
        $tableData = $tableData->map(function ($item) {
            unset($item->created_at);
            return $item;
        });

        // Fetch data from the 'users' table
        $userData = DB::table('users')
            ->select('id', 'username', 'role_id', 'created_at')
            ->get();

        // Fetch additional data for each user
        foreach ($userData as $user) {
            $user->assignedProductsCount = DB::table('products')
                ->where('asignee_id', $user->id)
                ->when($startDate, function ($query) use ($startDate) {
                    return $query->where('products.created_at', '>=', $startDate);
                })
                ->when($endDate, function ($query) use ($endDate) {
                    return $query->where('products.created_at', '<=', $endDate);
                })
                ->count();

            $user->deliveredProductsCount = DB::table('products')
                ->where('asignee_id', $user->id)
                ->where('delivered', 1)
                ->when($startDate, function ($query) use ($startDate) {
                    return $query->where('products.created_at', '>=', $startDate);
                })
                ->when($endDate, function ($query) use ($endDate) {
                    return $query->where('products.created_at', '<=', $endDate);
                })
                ->count();

            $user->formatted_created_at = date('y-d-m', strtotime($user->created_at));

            // Fetch role name from 'roles' table
            $roleName = DB::table('roles')->where('id', $user->role_id)->value('name');
            $user->role = $roleName;
        }

        $pdf = PDF::loadView('report', [
            'tableData' => $tableData, 'userData' => $userData, 'startDate' => $startDate, 'endDate' => $endDate
        ]);

        // Return the PDF as a response
        return response($pdf->output())
            ->header(
                'Content-Type',
                'application/pdf'
            )
            ->header('Content-Disposition', 'inline; filename="report.pdf"');
    }

    public function createWorkerReport(Request $request)
    {
        // Check if the authenticated user has the role_id of 3 (assuming '3' represents the role for workers)
        if (Auth::user()->role_id !== 3) {
            return response()->json(['error' => 'Unauthorized access.'], 403);
        }

        // Validate the request
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'user_id' => 'required|exists:users,id',
        ]);

        // Get start and end dates from the validated request
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $userId = $request->input('user_id');

        // Fetch data for the worker
        $workerData = DB::table('users')
            ->where('id', $userId)
            ->select('id', 'username', 'email', 'role_id', 'created_at')
            ->first();

        // Check if the user has the correct role
        if ($workerData->role_id !== 3) {
            return response()->json(['error' => 'Unauthorized access.'], 403);
        }

        // Fetch assigned products for the worker within the specified timeframe
        $assignedProducts = DB::table('products')
            ->where('asignee_id', $userId)
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('products.created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('products.created_at', '<=', $endDate);
            })
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.id',
                'products.name',
                'categories.name as category_name',
                'products.quantity',
                'shelves.name as destination_shelf_name',
                'products.delivered',
                DB::raw("DATE_FORMAT(products.created_at, '%y-%d-%m') as formatted_created_at")
            )
            ->get();

        // Fetch role name from 'roles' table
        $roleName = DB::table('roles')->where('id', $workerData->role_id)->value('name');
        $workerData->role = $roleName;

        // Generate the PDF for the worker report
        $pdf = PDF::loadView('worker_report', [
            'workerData' => $workerData,
            'assignedProducts' => $assignedProducts,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);

        // Return the PDF as a response
        return response($pdf->output())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="worker_report.pdf"');
    }


    public function createManagerReport(Request $request)
    {
        // Validate the request
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => [
                'nullable',
                'date',
            ],
        ]);

        // Get start and end dates from the validated request
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Fetch assigned products
        $tableDataAssigned = DB::table('products')
            ->join('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category',
                'shelves.name as destination_shelf',
                DB::raw("DATE_FORMAT(products.created_at, '%y-%d-%m') as formatted_created_at") // Format the created_at date
            )
            ->whereNotNull('asignee_id')
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('products.created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('products.created_at', '<=', $endDate);
            })
            ->get();

        // Fetch unassigned products
        $tableDataUnassigned = DB::table('products')
            ->join('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category',
                'shelves.name as destination_shelf',
                DB::raw("DATE_FORMAT(products.created_at, '%y-%d-%m') as formatted_created_at") // Format the created_at date
            )
            ->whereNull('asignee_id')
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('products.created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('products.created_at', '<=', $endDate);
            })
            ->get();

        // Remove the original created_at column from the collections
        $tableDataAssigned = $tableDataAssigned->map(function ($item) {
            unset($item->created_at);
            return $item;
        });

        $tableDataUnassigned = $tableDataUnassigned->map(function ($item) {
            unset($item->created_at);
            return $item;
        });

        // Fetch data from the 'users' table
        $userData = DB::table('users')
            ->select('id', 'username', 'role_id', 'created_at')
            ->where('role_id', '=', 3)
            ->get();

        // Fetch additional data for each user
        foreach ($userData as $user) {
            $user->assignedProductsCount = DB::table('products')
                ->where('asignee_id', $user->id)
                ->whereNotNull('asignee_id')
                ->when($startDate, function ($query) use ($startDate) {
                    return $query->where('products.created_at', '>=', $startDate);
                })
                ->when($endDate, function ($query) use ($endDate) {
                    return $query->where('products.created_at', '<=', $endDate);
                })
                ->count();

            $user->deliveredProductsCount = DB::table('products')
                ->where('asignee_id', $user->id)
                ->where('delivered', 1)
                ->whereNotNull('asignee_id')
                ->when($startDate, function ($query) use ($startDate) {
                    return $query->where('products.created_at', '>=', $startDate);
                })
                ->when($endDate, function ($query) use ($endDate) {
                    return $query->where('products.created_at', '<=', $endDate);
                })
                ->count();

            $user->formatted_created_at = date('y-d-m', strtotime($user->created_at));

            // Fetch role name from 'roles' table
            $roleName = DB::table('roles')->where('id', $user->role_id)->value('name');
            $user->role = $roleName;
        }

        try {
            $pdf = PDF::loadView('manager_report', [
                'tableDataAssigned' => $tableDataAssigned,
                'tableDataUnassigned' => $tableDataUnassigned,
                'userData' => $userData,
                'startDate' => $startDate,
                'endDate' => $endDate,
            ]);

            // Return the PDF as a response
            return response($pdf->output())
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'inline; filename="manager_report.pdf"');
        } catch (\Exception $e) {
            // Handle PDF generation error
            return response()->json(['error' => 'Failed to generate PDF.']);
        }
    }

    public function show($path)
    {
        $file = storage_path('app/public/' . $path);

        return response()->file($file);
    }
}
