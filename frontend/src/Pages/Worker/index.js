import React, { useEffect, useState } from "react";
import "./index.css";
import WorkDue from "../../Reusable/fetch/WorkDue";
import GetAllMessages from "../../Reusable/fetch/GetAllMessages";
import create from "../../Reusable/fetch/CreateMessage";
import ProductsTable from "../../Reusable/Tables/ProductsTable";
import MessagesTable from "../../Reusable/Tables/MessagesTable";
import { useLocalStorage } from "@uidotdev/usehooks";
import Background from "../../Reusable/Background";
import FormPopup from "../../Reusable/popups/FormPopup";
import ReportPopup from "../../Reusable/popups/ReportPopup";
import ViewMessage from "../../Reusable/popups/ViewMessage";
import MarkProductDone from "../../Reusable/fetch/MarkProductDone";
import DownloadReport from "../../Reusable/fetch/DonwloadReport";

function Worker() {
    const [productData, setProductData] = useState([]);
    const [messageData, setMessageData] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

    const [messagePopup, setmessagePopup] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [viewMessage, setViewMessage] = useState(false);

    const [isMessageSent, setIsMessageSent] = useState(false);
    const [isMarkedComplete, setIsMarkedComplete] = useState(false);

    const handleMessagePopup = () => {
        if (messagePopup) {
            setmessagePopup(false);
        } else {
            setmessagePopup(true);
        }
    };

    const handleReportPopup = () => {
        if (reportPopup) {
            setReportPopup(false);
        } else {
            setReportPopup(true);
        }
    };

    const handleViewMessage = (data) => {
        if (viewMessage) {
            setViewMessage(false);
            setSelectedMessage(null);
        } else {
            setViewMessage(true);
            setSelectedMessage(data);
        }
    };

    const handleCreateMessageClick = async (data) => {
        try {
            const createdMessage = await create(data);
            // MESSAGE GOT SENT
            setIsMessageSent(true);

            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsMessageSent(false);
            }, 3000);
        } catch (error) {
            console.error("Error creating message:", error);
        }
    };

    const handleCreateReportClick = async (timeframe) => {
        try {
            switch (sessionStorage.getItem("role_id")) {
                case "1":
                    await DownloadReport(
                        timeframe,
                        "http://127.0.0.1:8000/api/reports/admin"
                    );
                    break;
                case "2":
                    await DownloadReport(
                        timeframe,
                        "http://127.0.0.1:8000/api/reports/manager"
                    );
                    break;
                case "3":
                    await DownloadReport(
                        timeframe,
                        "http://127.0.0.1:8000/api/reports/worker"
                    );
                    break;
            }
            await DownloadReport(timeframe);
            console.log("Report created for timeframe:", timeframe);
        } catch (error) {
            console.error("Error creating report:", error);
        }
    };

    const handleUpdatePostClick = async (data) => {
        try {
            await MarkProductDone(data.id);
            setIsMarkedComplete(true);
            setProductData(await WorkDue());
            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsMarkedComplete(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        const Fetch = async () => {
            sessionStorage.setItem("user_id", 6);
            sessionStorage.setItem("role_id", 3);
            sessionStorage.setItem(
                "token",
                "21|okoLwnUioOska8S9BqEhzPMw3y13X5sVYacAuchlf9e403e5"
            );
            setProductData(await WorkDue());
            setMessageData(await GetAllMessages());
        };
        Fetch();
    }, []);

    return (
        <div className="worker-view" data-theme={theme}>
            <FormPopup
                HandleSubmit={handleCreateMessageClick}
                isOpen={messagePopup}
                ClosePopup={handleMessagePopup}
            />
            <ViewMessage
                ToggleCreateMessage={handleMessagePopup}
                data={selectedMessage}
                ClosePopup={handleViewMessage}
                isOpen={viewMessage}
            />
            <ReportPopup
                ClosePopup={handleReportPopup}
                isOpen={reportPopup}
                handleReportDownload={handleCreateReportClick}
            />
            <Background />
            <div className="main-container">
                <h1>Worker interface</h1>
                <div className="work-container">
                    <div className="title">
                        <h2>Work due</h2>
                        {isMarkedComplete && <p>Marked as completed!</p>}
                    </div>
                    <ProductsTable
                        products={productData}
                        TogglePopup={handleReportPopup}
                        handleMarkComplete={handleUpdatePostClick}
                    />
                </div>
                <div className="messages-container">
                    <div className="title">
                        <h2>Recent messages</h2>
                        {isMessageSent && <p>Message sent!</p>}
                    </div>
                    <MessagesTable
                        messages={messageData}
                        TogglePopup={handleMessagePopup}
                        ToggleViewMessage={handleViewMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Worker;
