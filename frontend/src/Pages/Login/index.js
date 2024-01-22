import React from "react";
import "./index.css";
import Background from "../../Reusable/Background";

function Login() {
    function loginHandler(){

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
                                <h3 className="error-text">Error message</h3>
                            </div>
                            <input type="text" name="name" />
                        </div>
                        <div className="login-input">
                            <div className="input-row">
                                <h2 className="input-text">Username</h2>
                                <h3 className="error-text">Error message</h3>
                            </div>
                            <input type="text" name="name" />
                        </div>
                    </div>
                    <button className="login-button" onClick="">
                        <h1 className="text">Log in</h1>
                    </button>
                </div>
                <Background />
            </div>
        </form>
    );
}

export default Login;
