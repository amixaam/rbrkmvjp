<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Shelf;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function GetAllProducts()
    {
        $products = Product::leftJoin('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category_name',
                'shelves.name as shelf_name'
            )
            ->orderByDesc('id') // Change this line to orderByDesc for descending order
            ->get();

        return response()->json($products);
    }

    public function GetDropdownOptions()
    {
        $users = User::where('role_id', 3)->pluck('username', 'id')->toArray();

        $options = [
            "categories" => Category::pluck('name', 'id')->toArray(),
            "suppliers" => Supplier::pluck('name', 'id')->toArray(),
            "assignees" => $users,
            "shelves" => Shelf::pluck('name', 'id')->toArray(),
        ];

        return response()->json($options);
    }

    public function GetAssignedProducts($user_id)
    {
        // Retrieve products with supplier, category, and shelf information, and sort by delivered field
        $matchingProducts = Product::where('asignee_id', $user_id)
            ->leftJoin('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category_name',
                'shelves.name as shelf_name'
            )
            ->orderBy('delivered')
            ->get();

        return response()->json($matchingProducts, 200);
    }

    // NESTRĀDĀ FOR SOME REASON?!?
    public function GetUnassignedProducts()
    {
        // manager
        $matchingProducts = Product::where('asignee_id', null)
            ->leftJoin('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('shelves', 'products.destination_shelf_id', '=', 'shelves.id')
            ->select(
                'products.*',
                'suppliers.name as supplier_name',
                'categories.name as category_name',
                'shelves.name as shelf_name'
            )
            ->orderBy('delivered')
            ->get();

        return response()->json($matchingProducts, 200);
    }

    public function GetProduct($product_id)
    {
        $product = Product::find($product_id);

        return response()->json($product);
    }

    public function CreateProduct(Request $request)
    {
        // RESPONSE TESTĒŠANA
        try {
            // VALIDĀCIJA
            $request->validate([
                'name' => 'nullable|string',
                'description' => 'nullable|string',
                'quantity' => 'nullable|min:1',
                'supplier_price' => 'required|numeric',
                'store_price' => 'nullable|numeric',

                'supplier_id' => 'required|exists:suppliers,id',
                'category_id' => 'nullable|exists:categories,id',
                'destination_shelf_id' => 'nullable|exists:shelves,id',

                'asignee_id' => 'nullable|exists:users,id',
                'delivered' => 'nullable|boolean',

            ]);

            if ($request->input('asignee_id')) {
                $asigneeId = $request->input('asignee_id');
                $userRole = User::where('id', $asigneeId)->value('role_id');

                if ($userRole != 3) {
                    return response()->json(['error' => 'You can only assign products to workers.'], 422);
                }
            }

            // INSERTOŠANA
            Product::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'quantity' => $request->input('quantity'),
                'supplier_price' => $request->input('supplier_price'),
                'store_price' => $request->input('store_price', $request->input('supplier_price') * 1.2),

                'supplier_id' => $request->input('supplier_id'),
                'category_id' => $request->input('category_id'),
                'destination_shelf_id' => $request->input('destination_shelf_id'),

                'asignee_id' => $request->input('asignee_id'),
                'delivered' => $request->input('delivered', false),
            ]);

            // RESPONSE
            return response()->json(['message' => "Product created successfully!"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product creation failed.' . $e], 500);
        }
    }

    public function updateProduct(Request $request)
    {
        try {
            // VALIDĀCIJA
            $request->validate([
                'id' => 'required|string',
                'name' => 'nullable|string',
                'description' => 'nullable|string',
                'quantity' => 'nullable|min:1',
                'supplier_price' => 'nullable|numeric',
                'store_price' => 'nullable|numeric',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'category_id' => 'nullable|exists:categories,id',
                'destination_shelf_id' => 'nullable|exists:shelves,id',
                'asignee_id' => 'nullable|exists:users,id',
                'delivered' => 'nullable|boolean',
            ]);

            $product = Product::find($request->input('id'));

            if (!$product) {
                return response()->json(['message' => 'Product id was not found.'], 404);
            }

            if ($request->input('asignee_id')) {
                $asigneeId = $request->input('asignee_id');
                $userRole = User::where('id', $asigneeId)->value('role_id');

                if ($userRole != 3) {
                    return response()->json(['error' => 'You can only assign products to workers.'], 422);
                }
            }

            // UPDATOŠANA
            $updateData = [];

            // Check each field and add to updateData if present in the request
            $fillableFields = ['name', 'description', 'quantity', 'supplier_price', 'store_price', 'supplier_id', 'category_id', 'destination_shelf_id', 'asignee_id', 'delivered'];

            foreach ($fillableFields as $field) {
                if ($request->has($field)) {
                    $updateData[$field] = $request->input($field);
                }
            }

            $product->update($updateData);

            // RESPONSE
            return response()->json(['message' => "Product updated successfully!"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product update failed. ' . $e->getMessage()], 500);
        }
    }

    public function DeleteProduct($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();

            return response()->json(['message' => 'Product deleted successfully']);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }
}
