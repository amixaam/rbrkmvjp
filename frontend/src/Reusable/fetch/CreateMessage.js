import React, { useEffect } from "react";

async function create(messageData) {
    console.log(messageData);
    try {
        const response = await fetch("http://127.0.0.1:8000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(messageData),
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Return the data after a successful request
        } else {
            const errorData = await response.json(); // Retrieve detailed error message
            throw new Error(`Failed to create user: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Failed to create user", error.message);
        throw error;
    }
}

export default create;
