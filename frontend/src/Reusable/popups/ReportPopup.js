import "./formPopup.scss";

import React, { useState } from "react";

function ReportPopup({ ClosePopup, isOpen, handleReportDownload }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");

    if (!isOpen) {
        return null;
    }

    const handlePopupClick = (event) => {
        // Prevent the click event from bubbling up to form-popup-container
        event.stopPropagation();
    };

    const handleCreateClick = async () => {
        // Validate the dates
        if (!startDate) {
            setStartDateError("Please select a start date.");
            return;
        } else {
            setStartDateError("");
        }

        if (!endDate) {
            setEndDateError("Please select an end date.");
            return;
        } else {
            setEndDateError("");
        }

        // Close the popup
        ClosePopup();

        // Call the handleReportDownload function with the form data
        await handleReportDownload({
            start_date: startDate,
            end_date: endDate,
            user_id: sessionStorage.getItem("user_id"),
        });
    };

    return (
        <div className="form-popup-container" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Report settings</h1>
                <div className="form">
                    <div className="input-container">
                        <div className="text">
                            <p className="label">from date</p>
                            <p className="error">{startDateError}</p>
                        </div>
                        <input
                            type="date"
                            className="flex-input"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <div className="text">
                            <p className="label">to date</p>
                            <p className="error">{endDateError}</p>
                        </div>
                        <input
                            type="date"
                            className="flex-input"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button className="flex-button" onClick={handleCreateClick}>
                        Create report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportPopup;
