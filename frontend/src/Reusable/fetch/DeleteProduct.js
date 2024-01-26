import React, { useEffect } from "react";

async function DeleteProduct(id) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to delete product: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting product", error.message);
        throw error;
    }
}

export default DeleteProduct;
