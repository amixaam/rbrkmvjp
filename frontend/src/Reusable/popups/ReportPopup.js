import React from "react";
import "./formPopup.scss";

function ReportPopup({ ClosePopup, isOpen }) {
    if (!isOpen) {
        return;
    }

    const handlePopupClick = (event) => {
        // Prevent the click event from bubbling up to form-popup-container
        event.stopPropagation();
    };

    return (
        <div className="form-popup-container" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Report settings</h1>
                <div className="form">
                    <div className="input-container">
                        <div className="text">
                            <p className="label">from date</p>
                            <p className="error">error message</p>
                        </div>
                        <input type="date" className="flex-input" />
                    </div>
                    <div className="input-container">
                        <div className="text">
                            <p className="label">to date</p>
                            <p className="error">error message</p>
                        </div>
                        <input type="date" className="flex-input" />
                    </div>
                    <button className="flex-button">Create report</button>
                </div>
            </div>
        </div>
    );
}

export default ReportPopup;
