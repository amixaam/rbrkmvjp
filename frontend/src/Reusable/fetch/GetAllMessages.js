import React, { useEffect } from "react";

async function GetAllMessages() {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/messages/${sessionStorage.getItem(
                "user_id"
            )}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error fetching Message's", error);
    }
}

export default GetAllMessages;
