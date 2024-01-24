import React, { useEffect, useState } from "react";
import "./index.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import Background from "../../Reusable/Background";
import GetUnassignedProducts from "../../Reusable/fetch/GetUnassignedProducts";
import GetAllMessages from "../../Reusable/fetch/GetAllMessages";

function Manager() {

    useEffect(() => {
        const Fetch = async( ) => {
            const messagedata = await GetAllMessages();
            const unasigneddata = await GetUnassignedProducts();
            console.log(messagedata);
        }
        Fetch();
    }, []);

    return (
        <>
            <div className="main-manager-container">
                <Background />
                <div className="manager-container">
                    <div className="main-title">
                        <h1 className="text-primary">Manager interface</h1>
                    </div>

                    {/*Unasigned products container*/}
                    <div className="unasigned-products-contianer">
                        <div className="manager-title">
                            <p className="text-secondary">Unasigned Products</p>
                        </div>
                        <div className="worker-shelves">
                            <div className="specific-manager-unasigned-product">
                                <div className="id-title">
                                    <p className="small-text">ID</p>
                                </div>
                                <div className="asignee-title">
                                    <p className="small-text">Asignee</p>
                                </div>
                                <div className="other-title1">
                                    <p className="small-text">Other</p>
                                </div>
                            </div>
                        </div>
                        <div className="specific-manager-unasigned-product">
                            <div className="id-container">
                                <p>x</p>
                            </div>
                            <div className="asignee-container">
                                <p>x</p>
                            </div>
                            <div className="other-container">
                                <p>x</p>
                            </div>
                            <div className="edit-container">
                                <button className="worker-edit-buttons">
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                        <div className="manager-buttons">
                            <div className="manager-creating-stuff">
                                <button className="manager-create-buttons">
                                    <p className="text-buttons">View History</p>
                                </button>
                                <button className="manager-create-buttons">
                                    <p className="text-buttons">Add Product</p>
                                </button>
                                <button className="manager-create-buttons">
                                    <p className="text-buttons">
                                        Create Report
                                    </p>
                                </button>
                            </div>
                            <div className="manager-page-swappers">
                                <button className="manager-swap-buttons">
                                    <img
                                        src={LeftArrow}
                                        alt="Previous Button"
                                    />
                                </button>
                                <button className="manager-swap-buttons">
                                    <img src={RightArrow} alt="Next Button" />
                                </button>
                            </div>
                        </div>

                        {/*Messages container*/}
                        <div className="message-container">
                            <div className="manager-title">
                                <p className="text-secondary">
                                    Recent Messages
                                </p>
                                <div className="specific-message">
                                    <div className="sent-received-container">
                                        <p>x</p>
                                    </div>
                                    <div className="subject-container">
                                        <p>x</p>
                                    </div>
                                    <div className="content-container">
                                        <p>x</p>
                                    </div>
                                    <div className="date-container">
                                        <p>x</p>
                                    </div>
                                    <div className="edit-container">
                                        <button className="manager-edit-buttons">
                                            <p className="text-buttons">View</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="manager-message-buttons">
                                <div className="manager-creating-stuff">
                                    <button
                                        className="manager-create-buttons">
                                        <p className="text-buttons">
                                            Create New
                                        </p>
                                    <button className="manager-create-buttons2"><p className="text-buttons">Create New</p>
                                    </button>
                                    </button>
                                </div>
                                <div className="manager-page-swappers">
                                    <button className="manager-swap-buttons">
                                        <img
                                            src={LeftArrow}
                                            alt="Previous Button"
                                        />
                                    </button>
                                    <button className="manager-swap-buttons">
                                        <img
                                            src={RightArrow}
                                            alt="Next Button"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manager;
