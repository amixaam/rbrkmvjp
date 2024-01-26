import React from "react";

function SessionHandler() {
    const role = sessionStorage.getItem("role_id");

    if (!role) {
        window.location.href = "/";
        return null;
    }

    const currentPagePath = window.location.pathname;

    switch (role) {
        case "1":
            if (currentPagePath !== "/admin") {
                window.location.href = "/admin";
            }
            break;
        case "2":
            if (currentPagePath !== "/manager") {
                window.location.href = "/manager";
            }
            break;
        case "3":
            if (currentPagePath !== "/worker") {
                window.location.href = "/worker";
            }
            break;
        default:
            // Handle unexpected roles
            window.location.href = "/"; // Redirect to the default page
            break;
    }

    return null;
}

export default SessionHandler;
