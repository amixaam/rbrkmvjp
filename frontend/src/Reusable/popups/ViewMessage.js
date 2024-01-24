import React from "react";
import "./ViewMessage.scss";

function ViewMessage({ data, isOpen, ClosePopup, ToggleCreateMessage }) {
    if (!isOpen || !data) {
        return;
    }

    const handlePopupClick = (event) => {
        // Prevent the click event from bubbling up to form-popup-container
        event.stopPropagation();
    };

    const handleReplyClick = () => {
        ToggleCreateMessage();
        ClosePopup();
    };

    return (
        <div className="form-popup-container" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Message</h1>
                <div className="content">
                    <div className="title">
                        <h3>{data.title}</h3>
                        <div className="from">
                            <p>from {data.from_username}</p>
                            <p>{data.formatted_created_at}</p>
                        </div>
                    </div>
                    <p>{data.content}</p>
                    <div className="button-container">
                        <button
                            className="flex-button"
                            onClick={handleReplyClick}
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewMessage;
