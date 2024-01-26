import { useEffect, useState } from "react";
import "./ViewMessage.scss";
import "./ProductAddPopup.scss";

function UserAddPopup({ isOpen, ClosePopup, submitCreateProduct }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role_id: "3",
    });

    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: "",
        role_id: "",
    });

    if (!isOpen) {
        return;
    }

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {
        // Reset error messages
        setFormErrors({
            username: "",
            email: "",
            password: "",
            role_id: "",
        });

        let hasError = false;

        if (formData.username === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                username: "username is required.",
            }));
            hasError = true;
        }

        if (formData.email === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: "email is required.", // Fix the property name here
            }));
            hasError = true;
        }

        if (formData.password.length < 6) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: "password must be alteast 6 characters.",
            }));
            hasError = true;
        }
        if (formData.password === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: "password is required.",
            }));
            hasError = true;
        }

        if (!hasError) {
            console.log("hi");
            submitCreateProduct(formData);
            ClosePopup();
        }
    };

    return (
        <div className="product-add-popup-container" onClick={ClosePopup}>
            <div className="form-popup-small" onClick={handlePopupClick}>
                <h1>Create new user</h1>
                <div className="content">
                    <div className="product-info-container">
                        <div className="input-vertical-full">
                            <div className="input-container">
                                <div className="text">
                                    <p className="label">username</p>
                                    <p className="error">
                                        {formErrors.username}
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    className="flex-input small-input"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-container">
                                <div className="text">
                                    <p className="label">password</p>
                                    <p className="error">
                                        {formErrors.password}
                                    </p>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="flex-input small-input"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-container">
                                <div className="text">
                                    <p className="label">email</p>
                                    <p className="error">{formErrors.email}</p>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    className="flex-input small-input"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-container">
                                <div className="text">
                                    <p className="label">role</p>
                                    <p className="error">
                                        {formErrors.quantity}
                                    </p>
                                </div>
                                <select
                                    name="role_id"
                                    className="small-input"
                                    value={formData.role_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="3">Worker</option>
                                    <option value="2">Manager</option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>
                            <div className="button-container">
                                <button
                                    className="flex-button margin-top"
                                    onClick={handleFormSubmit}
                                >
                                    create user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAddPopup;
