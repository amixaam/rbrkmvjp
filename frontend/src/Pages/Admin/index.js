import React, { useState, useRef, useEffect } from "react";
import "./User.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import Background from "../../Reusable/Background";

function Admin() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);

    const errorMessages = {
        Username: "Error message",
        Password: "Error message",
        email: "Error message",
        role: "Error message",
        EditUsername: "Error message",
        EditPassword: "Error message",
        EditEmail: "Error message",
        EditRole: "Error message",
    };

    const roles = ["Admin", "Manager", "Worker"];

    const popupRef = useRef(null);
    const editPopupRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                (popupRef.current &&
                    !popupRef.current.contains(event.target) &&
                    isPopupOpen) ||
                (editPopupRef.current &&
                    !editPopupRef.current.contains(event.target) &&
                    isEditPopupOpen)
            ) {
                setPopupOpen(false);
                setEditPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isPopupOpen, isEditPopupOpen]);

    const handleButtonClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleEditButtonClick = () => {
        setEditPopupOpen(!isEditPopupOpen);
    };

    return (
        <>
            <div className="main-user-container">
                <Background />
                <div className="user-container">
                    <div className="main-user-title">
                        <h1 className="text-primary">Admin interface</h1>
                    </div>

                    {/*Product List*/}
                    <div className="product-list">
                        <p className="text-secondary">Products</p>
                        <div className="specific-product-titles">
                            <div className="id-title">
                                <p className="small-text">ID</p>
                            </div>
                            <div className="role-title">
                                <p className="small-text">Asignee</p>
                            </div>
                            <div className="other-title">
                                <p className="small-text">Other</p>
                            </div>
                        </div>
                        <div className="specific-product">
                            <div className="id-container">
                                <p>x</p>
                            </div>
                            <div className="role-container">
                                <p>x</p>
                            </div>
                            <div className="other-container">
                                <p>x</p>
                            </div>
                            <div className="edit-container">
                                <button
                                    className="user-edit-buttons"
                                    onClick={handleEditButtonClick}
                                >
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-buttons">
                        <div className="product-creating-stuff">
                            <button className="user-create-buttons">
                                <p className="text-buttons">View History</p>
                            </button>
                            <button className="user-create-buttons">
                                <p className="text-buttons">Add Product</p>
                            </button>
                            <button className="user-create-buttons">
                                <p className="text-buttons">Create Report</p>
                            </button>
                        </div>
                        <div className="user-page-swappers">
                            <button className="user-swap-buttons">
                                <img src={LeftArrow} alt="Previous Button"/>
                            </button>
                            <button className="user-swap-buttons">
                                <img src={RightArrow} alt="Next Button"/>
                            </button>
                        </div>
                    </div>
                    {/*User List*/}
                    <div className="user-list">
                        <p className="text-secondary">Users</p>
                        <div className="specific-user-titles">
                            <div className="id-title">
                                <p className="small-text">ID</p>
                            </div>
                            <div className="role-title">
                                <p className="small-text">Role</p>
                            </div>
                            <div className="other-title">
                                <p className="small-text">Other</p>
                            </div>
                        </div>
                        <div className="specific-user">
                            <div className="id-container">
                                <p>x</p>
                            </div>
                            <div className="role-container">
                                <p>x</p>
                            </div>
                            <div className="other-container">
                                <p>x</p>
                            </div>
                            <div className="edit-container">
                                <button
                                    className="user-edit-buttons"
                                    onClick={handleEditButtonClick}
                                >
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-buttons">
                        <div className="user-creating-stuff">
                            <button
                                className="user-create-buttons"
                                onClick={handleButtonClick}
                            >
                                <p className="text-buttons">Add User</p>
                            </button>
                            <button className="user-create-buttons">
                                <p className="text-buttons">Create Report</p>
                            </button>
                        </div>
                        <div className="user-page-swappers">
                            <button className="user-swap-buttons">
                                <img src={LeftArrow} alt="Previous Button"/>
                            </button>
                            <button className="user-swap-buttons">
                                <img src={RightArrow} alt="Next Button"/>
                            </button>
                        </div>

                        {isPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup-box" ref={popupRef}>
                                    <h2 className="popup-title">Add user</h2>
                                    <div className="popup-layout">
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Username
                                                </h2>
                                                {errorMessages.Username && (
                                                    <p className="error-text">
                                                        {errorMessages.Username}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Password
                                                </h2>
                                                {errorMessages.Password && (
                                                    <p className="error-text">
                                                        {errorMessages.Password}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Email
                                                </h2>
                                                {errorMessages.email && (
                                                    <p className="error-text">
                                                        {errorMessages.email}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="email"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Role
                                                </h2>
                                                {errorMessages.role && (
                                                    <p className="error-text">
                                                        {errorMessages.role}
                                                    </p>
                                                )}
                                            </div>
                                            <select
                                                name="role"
                                                className="popup-dropdown"
                                            >
                                                {roles.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="left">
                                        <button className="popup-button">
                                            <h1 className="button-text">
                                                Add User
                                            </h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isEditPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup-box" ref={editPopupRef}>
                                    <h2 className="popup-title">Edit User</h2>
                                    <div className="popup-layout">
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Username
                                                </h2>
                                                {errorMessages.EditUsername && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditUsername
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Password
                                                </h2>
                                                {errorMessages.EditPassword && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditPassword
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Email
                                                </h2>
                                                {errorMessages.EditEmail && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditEmail
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="email"/>
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Role
                                                </h2>
                                                {errorMessages.EditRole && (
                                                    <p className="error-text">
                                                        {errorMessages.EditRole}
                                                    </p>
                                                )}
                                            </div>
                                            <select className="popup-dropdown">
                                                {roles.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="left">
                                        <button className="popup-button">
                                            <h1 className="button-text">
                                                Add user
                                            </h1>
                                        </button>
                                        <button className="popup-button">
                                            <h1 className="button-text">
                                                Remove user
                                            </h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;