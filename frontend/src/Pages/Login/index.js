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
        <form id="loginform">
            <div className="login-container">
                <Background />
                <div className="login-box">
                    <h1 className="title">RBRKMVJP</h1>
                    <div className="login-layout">
                        <div className="login-input">
                            <div className="input-row">
                                <h2 className="input-text">Email</h2>
                                <h3 className="error-text"></h3>
                            </div>
                            <input

                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required

                            />
                        </div>
                        <div className="login-input">
                            <div className="input-row">
                                <h2 className="input-text">Password</h2>
                                <h3 className="error-text"></h3>
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </div>
                    <button className="login-button" onClick={loginHandler}>
                        <h1 className="text">Log in</h1>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
