import React, { useEffect } from "react";

async function DeleteUser(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to delete user: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting user", error.message);
        throw error;
    }
}

export default DeleteUser;