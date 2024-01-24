import React, { useState } from "react";
import "./formPopup.scss";

function FormPopup({ HandleSubmit, isOpen, ClosePopup }) {
    const [formData, setFormData] = useState({
        from_user_id: sessionStorage.getItem("user_id"),
        to_user_id: "",
        title: "",
        content: "",
    });

    const [formErrors, setFormErrors] = useState({
        to_user_id: "",
        title: "",
        content: "",
    });

    if (!isOpen) {
        return;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Reset error messages
        setFormErrors({
            to_user_id: "",
            title: "",
            content: "",
        });

        let hasError = false;

        if (formData.to_user_id === formData.from_user_id) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                to_user_id: "Cannot send a message to yourself.",
            }));
            hasError = true;
        }

        if (formData.to_user_id === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                to_user_id: "To is required.",
            }));
            hasError = true;
        }
        if (formData.title === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                title: "Title is required.",
            }));
            hasError = true;
        }
        if (formData.content === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                content: "Content is required.",
            }));
            hasError = true;
        }

        if (!hasError) {
            // If there are no errors, proceed with form submission
            HandleSubmit(formData);
            ClosePopup();
        }
    };

    const handlePopupClick = (event) => {
        // Prevent the click event from bubbling up to form-popup-container
        event.stopPropagation();
    };

    return (
        <div className="form-popup-container" onClick={ClosePopup}>
            <div className="form-popup" onClick={handlePopupClick}>
                <h1>Create new message</h1>
                <div className="form">
                    <div className="input-container">
                        <div className="text">
                            <p className="label">to</p>
                            <p className="error">{formErrors.to_user_id}</p>
                        </div>
                        <input
                            type="text"
                            name="to_user_id"
                            value={formData.to}
                            onChange={handleChange}
                            className="flex-input"
                        />
                    </div>
                    <div className="input-container">
                        <div className="text">
                            <p className="label">title</p>
                            <p className="error">{formErrors.title}</p>
                        </div>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="flex-input"
                        />
                    </div>
                    <div className="input-container">
                        <div className="text">
                            <p className="label">content</p>
                            <p className="error">{formErrors.content}</p>
                        </div>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                    </div>
                    <button className="flex-button" onClick={handleFormSubmit}>
                        Send message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormPopup;
