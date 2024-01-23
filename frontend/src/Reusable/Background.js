import React, { useEffect } from "react";
import "./Background.css";
import { useNavigate } from "react-router-dom";

// Ielikt main containerā
function Background() {
    // CHECK VAI IR LOGGED IN
    const navigate = useNavigate();
    useEffect(() => {
        const SESSION = sessionStorage.getItem("token");
        const role_id = sessionStorage.getItem("role_id");
        console.log("bo");
        if (SESSION) {
            switch (role_id) {
                case "1":
                    navigate("/admin");
                    break;
                case "2":
                    navigate("/manager");
                    break;
                case "3":
                    navigate("/worker");
                    break;
            }
        } else {
            navigate("/");
        }
    }, []);

    return <div className="background-container"></div>;
}

export default Background;
