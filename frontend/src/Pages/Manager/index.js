import React, { useEffect, useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import GetUnassignedProducts from "../../Reusable/fetch/GetUnassignedProducts";
import GetAllMessages from "../../Reusable/fetch/GetAllMessages";

function Manager() {
    const [isPopUpVisible, setPopUpVisibility] = useState(false);
    const [isProductHistoryPopUpVisible, setProductHistoryPopUpVisibility] =
        useState(false);
    const [isEditProductPopUpVisible, setEditProductPopUpVisibility] =
        useState(false);
    const [isAddProductPopUpVisible, setAddProductPopUpVisibility] =
        useState(false);

    const showPopUp = () => {
        setPopUpVisibility(true);
        setProductHistoryPopUpVisibility(false);
        setEditProductPopUpVisibility(false);
        setAddProductPopUpVisibility(false);
    };

    const showProductHistoryPopUp = () => {
        setProductHistoryPopUpVisibility(true);
        setPopUpVisibility(false);
        setEditProductPopUpVisibility(false);
        setAddProductPopUpVisibility(false);
    };
    const showEditProductPopUp = () => {
        setEditProductPopUpVisibility(true);
        setAddProductPopUpVisibility(false);
        setProductHistoryPopUpVisibility(false);
        setPopUpVisibility(false);
    };
    const showAddProductPopUp = () => {
        setAddProductPopUpVisibility(true);
        setEditProductPopUpVisibility(false);
        setProductHistoryPopUpVisibility(false);
        setPopUpVisibility(false);
    };

    const closePopUp = () => {
        setPopUpVisibility(false);
    };
    const closeProductHistoryPopUp = () => {
        setProductHistoryPopUpVisibility(false);
    };
    const closeEditProductPopUp = () => {
        setEditProductPopUpVisibility(false);
    };
    const closeAddProductPopUp = () => {
        setEditProductPopUpVisibility(false);
    };

    useEffect(() => {
        const Fetch = async () => {
            const messagedata = await GetAllMessages();
            const unasigneddata = await GetUnassignedProducts();
            console.log(messagedata);
        };
        Fetch();
    }, []);

    return (
        <div className="manager-view">
            <p>hi</p>
        </div>
    );
}

export default Manager;
