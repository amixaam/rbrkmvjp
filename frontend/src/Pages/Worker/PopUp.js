import React, { useState } from "react";
import "./index.css";

const PopUp = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h1 className="text-primary">Create New Message</h1>
        <h2 className="input-text">To</h2>
        <div className="popup-input">
          <input
            type="text"
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
          />
        </div>
        <h2 className="input-text">Subject</h2>
        <div className="popup-input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <h2 className="input-text">Content</h2>
        <div className="popup-textarea">
          <textarea
            type="text"
            className="descInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="popup-inputButton">
          <button className="sendMessageButton" onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
