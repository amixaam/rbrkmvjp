import React, { useState, useRef, useEffect } from "react";
import "./User.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import Background from "../../Reusable/Background";
import Popup from "../../Reusable/Popups/Popup";
import Specific from "../../Reusable/Popups/SpecificThing";
import "../../Reusable/Popups/PopupStyle.css";

function Admin() {
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

    return (
        <>
            <dialog id="history" className="blurred-bg">
                    <div className="popup-base">
                        <div className="popup-title">
                            <p className="text-primary">Product History</p>
                        </div>
                        <p className="text-secondary">All Products</p>
                        <div className="popup-specifics">
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
                        <div className="user-buttons">
                            <div className="user-creating-stuff">
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
                    </div>
                    <Specific/>
            </dialog>

            <div className="main-user-container">
                <Background/>
                {/*User List*/}
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
                                <button className="user-edit-buttons">
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-buttons">
                        <div className="product-creating-stuff">
                            <button className="user-create-buttons" onClick={() => {
                                setClosed("open")
                            }}>
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
                                <button className="user-edit-buttons">
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-buttons">
                        <div className="user-creating-stuff">
                            <button className="user-create-buttons">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;