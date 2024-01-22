import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CSRF from "../../Reusable/csrf"
import Background from "../../Reusable/Background";

function Login() {
    const navigate = useNavigate();
    const [Result, setResult] = useState()
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const loginHandler = async(e)=> {
        e.preventDefault();
        const csrfToken = await CSRF();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    username: {Username},
                    password: {Password},
                    _token: csrfToken,
                }),
            });

            if (!response.ok) {
                setResult("fail");
                throw new Error("Login failed");
            }

            const data = await response.json();
            setResult("success");
            sessionStorage.setItem("token", data.token);
            navigate("/users");
        } catch (error) {
            setResult("fail");
            console.error("Login failed", error);
        }
    }

    return (
        <form id="loginform">
            <div className="login-container">
                <div className="login-box">
                    <h1 className="title">RBRKMVJP</h1>
                    <div className="login-layout">
                        <div className="login-input">
                            <div className="input-row">
                                <h2 className="input-text">Username</h2>
                                <h3 className="error-text"></h3>
                            </div>
                            <input type="text" name="name" value={Username} onChange={handleUsernameChange}/>
                        </div>
                        <div className="login-input">
                            <div className="input-row">
                                <h2 className="input-text">Password</h2>
                                <h3 className="error-text"></h3>
                            </div>
                            <input type="password" name="name" value={Password} onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <button className="login-button" onClick={loginHandler}>
                        <h1 className="text">Log in</h1>
                    </button>
                </div>
                <Background />
            </div>
        </form>
    );
}

export default Login;
