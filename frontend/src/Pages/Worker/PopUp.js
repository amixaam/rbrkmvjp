import React, { useState } from "react";
import "./index.css";

const PopUp = ({ onClose }) => {
  const [toUserId, setToUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed (e.g., authentication headers)
        },
        body: JSON.stringify({
          to_user_id: parseInt(toUserId), // Convert to integer assuming it's an ID
          title: title,
          content: content,
        }),
      });
  
      if (response.ok) {
        console.log("Message sent successfully");
        onClose();
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };  

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
