import React, { useState } from "react";
import "./index.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css"
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import PopUp from "./PopUp";
import HistoryPopUp from "./ViewHistoryPopUp";
import EditProductPopUp from "../../Reusable/editProductPopup";

function Worker() {
  const [isPopUpVisible, setPopUpVisibility] = useState(false);
  const [isHistoryPopUpVisible, setHistoryPopUpVisibility] = useState(false);
  const [isEditProductPopUpVisible, setEditProductPopUpVisibility] = useState(false);

  const showPopUp = () => {
    setPopUpVisibility(true);
    setHistoryPopUpVisibility(false);
    setEditProductPopUpVisibility(false);
  };

  const showHistoryPopUp = () => {
    setHistoryPopUpVisibility(true);
    setPopUpVisibility(false);
    setEditProductPopUpVisibility(false);
  };
  const showEditProductPopUp = () => {
    setEditProductPopUpVisibility(true);
    setHistoryPopUpVisibility(false);
    setPopUpVisibility(false);
  };

  const closePopUp = () => {
    setPopUpVisibility(false);
  };
  const closeHistoryPopUp = () => {
    setHistoryPopUpVisibility(false);
  };
  const closeEditProductPopUp = () => {
    setEditProductPopUpVisibility(false);
  }
    return (
        <>
            <div className="main-worker-container">
                <div className="background-container"></div>
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
                                <button className="worker-edit-buttons" onClick={showEditProductPopUp}><p className="text-buttons">Edit</p></button>
                            </div>
                        </div>
                        <div className="worker-buttons">
                            <div className="worker-creating-stuff">
                                <button className="worker-create-buttons" onClick={showHistoryPopUp}><p className="text-buttons">View History</p>
                                </button>
                                <button className="worker-create-buttons"><p className="text-buttons">Create Report</p>
                                </button>
                            </div>
                            <div className="worker-page-swappers">
                                <button className="worker-swap-buttons"><img src={LeftArrow} alt="Previous Button"/>
                                </button>
                                <button className="worker-swap-buttons"><img src={RightArrow} alt="Next Button"/>
                                </button>
                            </div>
                        </div>

                        {/*Message container*/}
                        <div className="message-container">
                            <div className="worker-title">
                                <p className="text-secondary">Recent Messages</p>
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
                                        <button className="worker-edit-buttons"><p className="text-buttons">View</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="worker-message-buttons">
                                <div className="worker-creating-stuff">
                                    <button className="worker-create-buttons" onClick={showPopUp}><p className="text-buttons">Create New</p>
                                    </button>
                                </div>
                                <div className="worker-page-swappers">
                                    <button className="worker-swap-buttons"><img src={LeftArrow} alt="Previous Button"/>
                                    </button>
                                    <button className="worker-swap-buttons"><img src={RightArrow} alt="Next Button"/>
                                    </button>
                                </div>
                            </div>
                            {isPopUpVisible && <PopUp onClose={closePopUp} />}
        {isHistoryPopUpVisible && <HistoryPopUp onClose={closeHistoryPopUp} />}
        {isEditProductPopUpVisible && <EditProductPopUp onClose={closeEditProductPopUp} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Worker;