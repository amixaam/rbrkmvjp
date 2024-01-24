import React, { useEffect, useState } from "react";
import "./index.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import Background from "../../Reusable/Background";

function Worker() {
    useEffect(() => {
        const getWorkDue = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/products/assigned/${sessionStorage.getItem(
                        "user_id"
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                }
            } catch (error) {
                console.error("Error fetching TODO's", error);
            }
        };

        getWorkDue();
    }, []);

    return (
        <>
            <div className="main-worker-container">
                <Background />
                <div className="worker-container">
                    <div className="main-title">
                        <h1 className="text-primary">Worker interface</h1>
                    </div>

                    {/*Shelf container*/}
                    <div className="work-due-contianer">
                        <div className="worker-title">
                            <p className="text-secondary">Work Due</p>
                        </div>
                        <div className="worker-shelves">
                            <div className="specific-worker-shelf-titles">
                                <div className="shelf-title">
                                    <p className="small-text">Shelf</p>
                                </div>
                                <div className="date-title">
                                    <p className="small-text">Date</p>
                                </div>
                                <div className="other-title">
                                    <p className="small-text">Other</p>
                                </div>
                            </div>
                        </div>
                        <div className="specific-worker-shelf">
                            <div className="shelf-container">
                                <p>x</p>
                            </div>
                            <div className="date-container">
                                <p>x</p>
                            </div>
                            <div className="other-container">
                                <p>x</p>
                            </div>
                            <div className="edit-container">
                                <button
                                    className="worker-edit-buttons">
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                        <div className="worker-buttons">
                            <div className="worker-creating-stuff">
                                <button
                                    className="worker-create-buttons">
                                    <p className="text-buttons">View History</p>
                                </button>
                                <button className="worker-create-buttons">
                                    <p className="text-buttons">
                                        Create Report
                                    </p>
                                </button>
                            </div>
                            <div className="worker-page-swappers">
                                <button className="worker-swap-buttons">
                                    <img src={LeftArrow} alt="Previous Button"/>
                                </button>
                                <button className="worker-swap-buttons">
                                    <img src={RightArrow} alt="Next Button"/>
                                </button>
                            </div>
                        </div>

                        {/*Message container*/}
                        <div className="message-container">
                            <div className="worker-title">
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
                                        <button className="worker-edit-buttons">
                                            <p className="text-buttons">View</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="worker-message-buttons">
                                <div className="worker-creating-stuff">
                                    <button className="worker-create-buttons">
                                        <p className="text-buttons">
                                            Create New
                                        </p>
                                    </button>
                                </div>
                                <div className="worker-page-swappers">
                                    <button className="worker-swap-buttons">
                                        <img
                                            src={LeftArrow}
                                            alt="Previous Button"
                                        />
                                    </button>
                                    <button className="worker-swap-buttons">
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

export default Worker;
