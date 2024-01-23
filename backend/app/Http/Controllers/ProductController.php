<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function GetAllProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function GetAssignedProducts($user_id)
    {
        // worker
        $matchingProducts = Product::where('asignee_id', $user_id)->get();

        return response()->json($matchingProducts, 200);
    }

    // NESTRĀDĀ FOR SOME REASON?!?
    public function GetUnassignedProducts()
    {
        // manager
        $matchingProducts = Product::where('asignee_id', null)->get();

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
        // return response()->json($request->input('name'));
        try {
            // VALIDĀCIJA
            $request->validate([
                'name' => 'nullable|string',
                'description' => 'nullable|string',
                'quantity' => 'nullable|min:1',
                'supplier_price' => 'required|numeric',
                'store_price' => 'nullable|numeric',

                'supplier_id' => 'required|exists:suppliers,id',
                'category_id' => 'required|exists:categories,id',
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
}
