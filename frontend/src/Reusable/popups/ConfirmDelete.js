import React from "react";
import "./formPopup.scss";

function ConfirmDelete({ isOpen, ClosePopup, confirmed }) {
    if (!isOpen) return null;

    const handlePopupClick = (e) => e.stopPropagation();

    const handleConfirm = () => {
        confirmed(true);
        ClosePopup(true);
    };

    const handleDecline = () => {
        confirmed(false);
        ClosePopup();
    };

    return (
        <div className="form-popup-container z-top" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Are you sure?</h1>
                <p>you cannot undo this action.</p>
                <div className="buttons">
                    <button onClick={handleConfirm}>Yes</button>
                    <button onClick={handleDecline}>No</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;
