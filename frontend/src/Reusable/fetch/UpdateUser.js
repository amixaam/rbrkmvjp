import React, { useEffect } from "react";

async function UpdateUser(userData) {
    console.log(userData);
    const jsonString = JSON.stringify(userData);
    // console.log("Request Payload:", jsonString);
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/users/${userData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(userData),
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to update user: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating user", error.message);
        throw error;
    }
}
export default UpdateUser;
