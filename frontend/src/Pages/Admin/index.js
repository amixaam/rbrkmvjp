import React, { useEffect, useState } from "react";
import "./index.css";
import Background from "../../Reusable/Background";
import GetUnassignedProducts from "../../Reusable/fetch/GetUnassignedProducts";
import GetAllUsers from "../../Reusable/fetch/GetAllUsers";
import { useLocalStorage } from "@uidotdev/usehooks";
import DownloadReport from "../../Reusable/fetch/DonwloadReport";
import ReportPopup from "../../Reusable/popups/ReportPopup";
import ProductsTableManager from "../../Reusable/Tables/ProductsTableManager";
import CreateProduct from "../../Reusable/fetch/CreateProduct";
import UpdateProduct from "../../Reusable/fetch/UpdateProduct";
import ProductHistoryPopup from "../../Reusable/popups/ProductHistoryPopup";
import ProductFormPopup from "../../Reusable/popups/ProductFormPopup";
import GetAllProducts from "../../Reusable/fetch/GetAllProducts";
import ProductAddPopup from "../../Reusable/popups/ProductAddPopup";
import GetDropdownOptions from "../../Reusable/fetch/GetDropdownOptions";
import UsersTable from "../../Reusable/Tables/UsersTable";

import UserFormPopup from "../../Reusable/popups/UserFormPopup";
import UserHistoryPopup from "../../Reusable/popups/UserHistoryPopup";
import UserAddPopup from "../../Reusable/popups/UserAddPopup";
import CreateUser from "../../Reusable/fetch/CreateUser";
import UpdateUser from "../../Reusable/fetch/UpdateUser";
import DeleteUser from "../../Reusable/fetch/DeleteUser";
import DeleteProduct from "../../Reusable/fetch/DeleteProduct";

import SessionHandler from "../../Reusable/SessionHandler";

function Admin() {
    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

    // const [allProductData, setAllProductData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [userForm, setUserForm] = useState(false);
    const [userAdd, setUserAdd] = useState(false);
    const [userHistoryPopup, setUserHistoryPopup] = useState(false);

    const [reportPopup, setReportPopup] = useState(false);
    const [productForm, setProductForm] = useState(false);
    const [productAdd, setProductAdd] = useState(false);

    const [productHistoryPopup, setProductHistoryPopup] = useState(false);

    const [isMessageSent, setIsMessageSent] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const handleReportPopup = () => {
        if (reportPopup) {
            setReportPopup(false);
        } else {
            setReportPopup(true);
        }
    };

    const handleProductAddPopup = () => {
        if (productAdd) {
            setProductAdd(false);
        } else {
            setProductAdd(true);
        }
    };

    const handleUserAddPopup = () => {
        if (userAdd) {
            setUserAdd(false);
        } else {
            setUserAdd(true);
        }
    };

    const handleUserHistoryPopup = () => {
        if (userHistoryPopup) {
            setUserHistoryPopup(false);
        } else {
            setUserHistoryPopup(true);
        }
    };

    const handleProductHistoryPopup = async () => {
        if (productHistoryPopup) {
            setProductHistoryPopup(false);
        } else {
            setProductHistoryPopup(true);
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

    const handleUserUpdateForm = (data) => {
        if (userForm) {
            setUserForm(false);
            setSelectedUser(null);
        } else {
            setUserForm(true);
            setSelectedUser(data);
        }
    };

    const handleCreateUserClick = async (data) => {
        try {
            await CreateUser(data);
            setUserData(await GetAllUsers());
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

    const handleUpdateUserClick = async (data) => {
        try {
            await UpdateUser(data);
            setUserData(await GetAllUsers());
            // MESSAGE GOT SENT
            setIsMessageSent(true);

            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsMessageSent(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await DeleteProduct(id);
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

    const handleDeleteUser = async (id) => {
        try {
            await DeleteUser(id);
            setUserData(await GetAllUsers());
            // MESSAGE GOT SENT
            setIsMessageSent(true);

            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsMessageSent(false);
            }, 3000);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleSubmitProduct = async (data) => {
        try {
            await CreateProduct(data);
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
            setAllProductData(await GetAllProducts());
            // Hide the message after 3000 milliseconds (3 seconds)
            setTimeout(() => {
                setIsEdited(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        const Fetch = async () => {
            setDropdownOptions(await GetDropdownOptions());
            setUserData(await GetAllUsers());
            setAllProductData(await GetAllProducts());
        };
        Fetch();
    }, []);

    return (
        <div className="manager-view" data-theme={theme}>
            <SessionHandler />
            <UserAddPopup
                submitCreateProduct={handleCreateUserClick}
                isOpen={userAdd}
                ClosePopup={handleUserAddPopup}
            />
            <UserHistoryPopup
                data={userData}
                isOpen={userHistoryPopup}
                ClosePopup={handleUserHistoryPopup}
                openEditProduct={handleUserUpdateForm}
            />
            <UserFormPopup
                product={selectedUser}
                isOpen={userForm}
                ClosePopup={handleUserUpdateForm}
                submitCreateProduct={handleUpdateUserClick}
                deleteItem={handleDeleteUser}
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
                <h1>Admin interface</h1>
                <div className="work-container">
                    <div className="title">
                        <h2>All products</h2>
                        {isEdited && <p>Product listing changed!</p>}
                    </div>
                    <ProductsTableManager
                        products={allProductData}
                        TogglePopup={handleReportPopup}
                        handleMarkComplete={handleUpdatePostClick}
                        ToggleProductHistory={handleProductHistoryPopup}
                        openEditProduct={handleUpdateForm}
                        openAddProduct={handleProductAddPopup}
                    />
                </div>
                <div className="messages-container">
                    <div className="title">
                        <h2>All users</h2>
                        {isMessageSent && <p>User listing changed!</p>}
                    </div>
                    <UsersTable
                        products={userData}
                        ToggleProductHistory={handleUserHistoryPopup}
                        openEditProduct={handleUserUpdateForm}
                        openAddProduct={handleUserAddPopup}
                    />
                </div>
            </div>
        </div>
    );
}

export default Admin;
