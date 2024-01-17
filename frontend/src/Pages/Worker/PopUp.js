import React from "react";
import "./index.css";

const PopUp = ({ onClose }) => {
    const handleOverlayClick = (e) => {
        // Check if the click occurred on the overlay (popup content)
        if (e.target.classList.contains('popup-overlay')) {
          onClose();
        }
      };
  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h1 className="text-primary">Create New Message</h1>
            <h2 className="input-text">To</h2>
                <div className="popup-input">    
                    <input type="text"/>
                </div>
            <h2 className="input-text">Subject</h2>
                <div className="popup-input">
                    <input type="text"/>
                </div>
            <h2 className="input-text">Content</h2>
                <div className="popup-textarea">
                <textarea type='text' className='descInput'/>
                </div>
                <div className="popup-input">
                   <button className="sendMessageButton">send message</button>
               </div>
      </div>
    </div>
  );
};

export default PopUp;