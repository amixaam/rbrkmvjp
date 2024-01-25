import React, { useEffect, useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import GetUnassignedProducts from "../../Reusable/fetch/GetUnassignedProducts";
import GetAllMessages from "../../Reusable/fetch/GetAllMessages";

function Manager() {
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
