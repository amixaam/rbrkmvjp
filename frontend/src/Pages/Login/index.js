import React from "react";
import "./index.css";

function Login() {
    return( 
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">RBRKMVJP</h1>
                <div className="login-layout">
                    <div className="login-input">
                        <h2 className="input-text">Username</h2>
                        <input type="text" name="name"/> 
                    </div>   
                    <div className="login-input">
                        <h2 className="input-text">Username</h2>
                        <input type="text" name="name"/> 
                    </div>    
                </div>
                <button className="login-button">
                    <h1 className="text">Log in</h1>
                </button>
            </div>
        </div>
    );
}

export default Login;
