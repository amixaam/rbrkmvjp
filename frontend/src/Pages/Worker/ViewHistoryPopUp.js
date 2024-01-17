import React from "react";
import "./index.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";

const HistoryPopUp = ({ onClose }) => {
    const handleOverlayClick2 = (e) => {
        // Check if the click occurred on the overlay (popup content)
        if (e.target.classList.contains('popup-overlay')) {
          onClose();
        }
      };
  return (
    <div className="popup-overlay" onClick={handleOverlayClick2}>
      <div className="popup-content">
        <h1 className="text-primary">Work History</h1>
            
            <div className="work-due-contianer">
                        <div className="worker-title">
                            <p className="text-secondary">All work</p>
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
                                <button className="worker-edit-buttons"><p className="text-buttons">Edit</p></button>
                            </div>
                        </div>
                        <div className="worker-buttons">
                            <div className="worker-page-swappers">
                                <button className="worker-swap-buttons"><img src={LeftArrow} alt="Previous Button"/>
                                </button>
                                <button className="worker-swap-buttons"><img src={RightArrow} alt="Next Button"/>
                                </button>
                            </div>
                        </div>
                </div>
                
                <div className="popup-input">
                   <button className="sendMessageButton">create report</button>
               </div>
      </div>
    </div>
  );
};

export default HistoryPopUp;