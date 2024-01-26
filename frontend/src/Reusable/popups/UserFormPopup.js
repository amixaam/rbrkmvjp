import { useEffect, useState } from "react";
import "./ViewMessage.scss";
import "./ProductAddPopup.scss";

import DeleteIcon from "../../images/icons/trash.svg";
import ConfirmDelete from "./ConfirmDelete";

function UserFormPopup({
    isOpen,
    ClosePopup,
    submitCreateProduct: submitEditProduct,
    product,
    deleteItem,
}) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [confirmPopupState, setConfirmPopupState] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        role_id: "",
    });

    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: "",
        role_id: "",
    });

    useEffect(() => {
        if (isOpen && product) {
            setFormData({
                id: String(product.id),
                username: product.username,
                email: product.email,
                password: "",
                role_id: product.role_id,
            });
        }
    }, [isOpen]);

    // DELETE

    useEffect(() => {
        if (deleteConfirm) {
            deleteItem(product.id);
            setDeleteConfirm(null);
            ClosePopup();
        }
    }, [deleteConfirm]);

    const ToggleConfrimPopup = () => {
        if (confirmPopupState) {
            setConfirmPopupState(false);
        } else {
            setConfirmPopupState(true);
        }
    };

    const handleDelete = () => {
        ToggleConfrimPopup();
    };

    if (!isOpen || !product) {
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

        // if (formData.password === "") {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         password: "password is required.",
        //     }));
        //     hasError = true;
        // }

        if (formData.role_id === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                role_id: "role is required.",
            }));
            hasError = true;
        }
        if (product.role_id === 1 && product.role_id != formData.role_id) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                role_id: "cant demote yourself.",
            }));
            hasError = true;
        }

        if (!hasError) {
            submitEditProduct(formData);
            ClosePopup();
        }
    };

    return (
        <>
            <ConfirmDelete
                isOpen={confirmPopupState}
                ClosePopup={ToggleConfrimPopup}
                confirmed={setDeleteConfirm}
            />
            <div className="product-add-popup-container" onClick={ClosePopup}>
                <div className="form-popup small" onClick={handlePopupClick}>
                    <h1>Change {product.username}</h1>
                    <div className="content">
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
                                            <p className="error">
                                                {formErrors.email}
                                            </p>
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
                                                {formErrors.role_id}
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
                                    <div className="button-container margin-top">
                                        <button
                                            className="flex-button"
                                            onClick={handleFormSubmit}
                                        >
                                            confirm change
                                        </button>
                                        <button
                                            className="flex-button"
                                            onClick={handleDelete}
                                        >
                                            <img
                                                src={DeleteIcon}
                                                alt="Delete user button"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFormPopup;
