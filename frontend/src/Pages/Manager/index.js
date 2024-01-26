import React, { useEffect, useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import GetUnassignedProducts from "../../Reusable/fetch/GetUnassignedProducts";
import GetAllMessages from "../../Reusable/fetch/GetAllMessages";
import { useLocalStorage } from "@uidotdev/usehooks";
import DownloadReport from "../../Reusable/fetch/DonwloadReport";
import ReportPopup from "../../Reusable/popups/ReportPopup";
import ProductsTableManager from "../../Reusable/Tables/ProductsTableManager";
import MessagesTable from "../../Reusable/Tables/MessagesTable";
import ViewMessage from "../../Reusable/popups/ViewMessage";
import FormPopup from "../../Reusable/popups/FormPopup";
import create from "../../Reusable/fetch/CreateMessage";
import CreateProduct from "../../Reusable/fetch/CreateProduct";
import UpdateProduct from "../../Reusable/fetch/UpdateProduct";
import ProductHistoryPopup from "../../Reusable/popups/ProductHistoryPopup";
import ProductFormPopup from "../../Reusable/popups/ProductFormPopup";
import GetAllProducts from "../../Reusable/fetch/GetAllProducts";
import ProductAddPopup from "../../Reusable/popups/ProductAddPopup";
import GetDropdownOptions from "../../Reusable/fetch/GetDropdownOptions";
import DeleteProduct from "../../Reusable/fetch/DeleteProduct";
import SessionHandler from "../../Reusable/SessionHandler";
import GetUsernameOptions from "../../Reusable/fetch/GetUsernameOptions";

function Manager() {
    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

    const [productData, setProductData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [usernameOptions, setUsernameOptions] = useState([]);
    const [messageData, setMessageData] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [messagePopup, setmessagePopup] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [productForm, setProductForm] = useState(false);
    const [productAdd, setProductAdd] = useState(false);
    const [productHistoryPopup, setProductHistoryPopup] = useState(false);
    const [viewMessage, setViewMessage] = useState(false);

    const [isMessageSent, setIsMessageSent] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const handleReportPopup = () => {
        if (reportPopup) {
            setReportPopup(false);
        } else {
            setReportPopup(true);
        }
    };

    const handleMessagePopup = () => {
        if (messagePopup) {
            setmessagePopup(false);
        } else {
            setmessagePopup(true);
        }
    };

    const handleProductAddPopup = () => {
        if (productAdd) {
            setProductAdd(false);
        } else {
            setProductAdd(true);
        }
    };

    const handleProductHistoryPopup = async () => {
        if (productHistoryPopup) {
            setProductHistoryPopup(false);
        } else {
            setProductHistoryPopup(true);
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

    const handleUpdateForm = (data) => {
        if (productForm) {
            setProductForm(false);
            setSelectedProduct(null);
        } else {
            setProductForm(true);
            setSelectedProduct(data);
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

    const handleSubmitProduct = async (data) => {
        try {
            await CreateProduct(data);
            setProductData(await GetUnassignedProducts());
            setAllProductData(await GetAllProducts());
            // MESSAGE GOT SENT
            setIsEdited(true);

            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsEdited(false);
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
            await UpdateProduct(data);
            setIsEdited(true);
            setProductData(await GetUnassignedProducts());
            setAllProductData(await GetAllProducts());
            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsEdited(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await DeleteProduct(id);
            setProductData(await GetUnassignedProducts());
            setAllProductData(await GetAllProducts());
            // MESSAGE GOT SENT
            setIsEdited(true);

            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsEdited(false);
            }, 3000);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        const Fetch = async () => {
            setDropdownOptions(await GetDropdownOptions());
            setUsernameOptions(await GetUsernameOptions());
            setMessageData(await GetAllMessages());
            setProductData(await GetUnassignedProducts());
            setAllProductData(await GetAllProducts());
        };
        Fetch();
    }, []);

    return (
        <div className="manager-view" data-theme={theme}>
            <SessionHandler />
            <FormPopup
                HandleSubmit={handleCreateMessageClick}
                isOpen={messagePopup}
                ClosePopup={handleMessagePopup}
                usernameOptions={usernameOptions}
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
            <ProductHistoryPopup
                data={allProductData}
                isOpen={productHistoryPopup}
                ClosePopup={handleProductHistoryPopup}
                openEditProduct={handleUpdateForm}
            />
            <ProductFormPopup
                product={selectedProduct}
                isOpen={productForm}
                ClosePopup={handleUpdateForm}
                options={dropdownOptions}
                submitCreateProduct={handleUpdatePostClick}
                deleteItem={handleDeleteProduct}
            />
            <ProductAddPopup
                handleSubmitProduct={handleSubmitProduct}
                isOpen={productAdd}
                ClosePopup={handleProductAddPopup}
                options={dropdownOptions}
                submitCreateProduct={handleSubmitProduct}
            />
            <Background />
            <div className="main-container">
                <h1>Manager interface</h1>
                <div className="work-container">
                    <div className="title">
                        <h2>Unasigned products</h2>
                        {isEdited && <p>Product listing changed!</p>}
                    </div>
                    <ProductsTableManager
                        products={productData}
                        TogglePopup={handleReportPopup}
                        handleMarkComplete={handleUpdatePostClick}
                        ToggleProductHistory={handleProductHistoryPopup}
                        openEditProduct={handleUpdateForm}
                        openAddProduct={handleProductAddPopup}
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

export default Manager;
