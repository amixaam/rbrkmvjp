import React, { useState } from "react";
import "./index.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import EditProductPopUp from "../../Reusable/editProductPopup.js"

const HistoryPopUp = ({ onClose }) => {
    const [isEditProductPopUpVisible, setEditProductPopUpVisibility] = useState(false);
    const showEditProductPopUp = () => {
        setEditProductPopUpVisibility(true);
      };
    const closeEditProductPopUp = () => {
        setEditProductPopUpVisibility(false);
      }
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
                                    <p className="small-text">vel vertibas</p>
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
                        <div className="ProductInfo">
                        <div className="popup-inputButton2">
                   <button className="sendMessageButton">create report</button>
               </div>
                        <div className="worker-buttons2">
                            <div className="worker-page-swappers">
                                <button className="worker-swap-buttons"><img src={LeftArrow} alt="Previous Button"/>
                                </button>
                                <button className="worker-swap-buttons"><img src={RightArrow} alt="Next Button"/>
                                </button>
                            </div>
                            </div>
                            {isEditProductPopUpVisible && <EditProductPopUp onClose={closeEditProductPopUp} />}
                        </div>
                </div>
                
                
      </div>
    </div>
  );
};

export default HistoryPopUp;