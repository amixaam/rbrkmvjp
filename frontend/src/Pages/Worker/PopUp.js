import React, { useState } from "react";
import "./index.css";

const PopUp = ({ onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h1 className="text-primary">Create New Message</h1>
                <h2 className="input-text">To</h2>
                <div className="popup-input">
                    <input type="text" />
                </div>
                <h2 className="input-text">Subject</h2>
                <div className="popup-input">
                    <input type="text" />
                </div>
                <h2 className="input-text">Content</h2>
                <div className="popup-textarea">
                    <textarea type="text" className="descInput" />
                </div>
                <div className="popup-inputButton">
                    <button className="sendMessageButton">Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
