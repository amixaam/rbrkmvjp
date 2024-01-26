import React, { useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import SessionHandler from "../../Reusable/SessionHandler";

function Login() {
    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const loginHandler = async (e) => {
        e.preventDefault();

        setFormErrors({
            email: "",
            password: "",
        });

        let hasError = false;

        if (formData.email === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: "email is required.",
            }));
            hasError = true;
        }
        if (formData.password === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: "password is required.",
            }));
            hasError = true;
        }

        if (!hasError) {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                const data = await response.json();
                if (response.ok) {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("user_id", data.user.user_id);
                    sessionStorage.setItem("role_id", data.user.role_id);
                    switch (sessionStorage.getItem("role_id")) {
                        case "1":
                            window.location.href = "/admin";
                            break;
                        case "2":
                            window.location.href = "/manager";
                            break;
                        case "3":
                            console.log("d");
                            window.location.href = "/worker";
                            break;
                    }
                } else {
                    setFormErrors({
                        email: "wrong credentials.",
                        password: "",
                    });
                }
            } catch (error) {
                console.error("Login failed", error);
            }
        }
    };

    return (
        <div className="login-view" data-theme={theme}>
            <div className="main-container">
                <h1>RBRKMVJP</h1>
                <div className="messages-container">
                    <div className="input-container">
                        <div className="text">
                            <p className="label">email</p>
                            <p className="error">{formErrors.email}</p>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="flex-input"
                        />
                    </div>
                    <div className="input-container">
                        <div className="text">
                            <p className="label">password</p>
                            <p className="error">{formErrors.password}</p>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="flex-input"
                        />
                    </div>
                </div>
                <button className="flex-button" onClick={loginHandler}>
                    Log in
                </button>
            </div>
            <Background />
        </div>
    );
}

export default Login;
