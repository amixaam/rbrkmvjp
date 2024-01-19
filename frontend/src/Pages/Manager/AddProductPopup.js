import React from "react";
import "../Worker/index.css";

const AddProductPopUp = ({ onClose }) => {
    const handleOverlayClick = (e) => {
        // Check if the click occurred on the overlay (popup content)
        if (e.target.classList.contains('popup-overlay')) {
          onClose();
        }
      };
      
  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content2">
        <h1 className="text-primary">Add new Product</h1>
        <h1 className="text-secondary">Product Info</h1>
        <div className="ProductInfo">
            <div>
                
            <h2 className="input-text">Category</h2>
                <div className="popup-input2">    
                    <input className="specialInput" type="text"/>
                </div>
            <h2 className="input-text">Product Name</h2>
                <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
            <h2 className="input-text">Quantity</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                </div>
                <div>
                <h2 className="input-text">Product description</h2>
                <div className="popup-textarea2">
                <textarea type='text' className='descInput'/>
                </div>
                </div>
                </div>
                <h1 className="text-secondary">Supplier & price</h1>
                <div className="ProductInfo">
                <div>
                    <div>
                <h2 className="input-text">Supplier price</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                <h2 className="input-text">Supplier</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                </div>
                </div>
                <div>
                <h2 className="input-text">Store price</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                </div>
                </div>
                <h1 className="text-secondary">Warehouse assignment</h1>
                <div className="ProductInfo">
                    <div>
                <h2 className="input-text">Asignee</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                </div>
                <div>
                <h2 className="input-text">Shelf</h2>
            <div className="popup-input2">
                    <input className="specialInput" type="text"/>
                </div>
                </div>
                </div>
                <div className="popup-inputButton">
                   <button className="sendMessageButton">add product</button>
               </div>
      </div>
    </div>
  );
};

export default AddProductPopUp;