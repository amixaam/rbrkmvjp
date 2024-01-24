import React, { useEffect } from "react";

async function GetAssignedProducts(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/assigned/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error fetching Assigned Products", error);
    }
}

export default GetAssignedProducts;