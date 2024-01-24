import React, { useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // redirect
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user_id", data.user.user_id);
                sessionStorage.setItem("role_id", data.user.role_id);
                switch (data.user.role_id) {
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
                console.log("incorrect credentials");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    //
    // TODO: ERROR HANDLING
    //

    return (
        <div className="Login-view">
            <p>hi</p>
        </div>
    );
}

export default Login;
