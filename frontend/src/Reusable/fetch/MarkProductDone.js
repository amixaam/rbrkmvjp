import React, { useEffect } from "react";

async function MarkProductDone(product_id) {
    const formData = new URLSearchParams();
    formData.append("delivered", "1");
    formData.append("id", product_id);
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: formData.toString(),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to mark product done: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching");
        throw error;
    }
}
export default MarkProductDone;
