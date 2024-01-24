import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import "../../Reusable/text.css";
import "../../Reusable/Background.css";
import LeftArrow from "../../images/left_arrow.svg";
import RightArrow from "../../images/right_arrow.svg";
import Background from "../../Reusable/Background";
import GetAllProducts from "../../Reusable/fetch/GetAllProducts";
import GetAllUsers from "../../Reusable/fetch/GetAllUsers";
import CreateUser from "../../Reusable/fetch/CreateUser";
import createProduct from "../../Reusable/fetch/CreateProduct";


function Admin() {
        const [isPopupOpen, setPopupOpen] = useState(false);
        const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const errorMessages = {
        Username: "Error message",
        Password: "Error message",
        email: "Error message",
        role: "Error message",
        EditUsername: "Error message",
        EditPassword: "Error message",
        EditEmail: "Error message",
        EditRole: "Error message",
    };

    const roles = ["Admin", "Manager", "Worker"];

    const popupRef = useRef(null);
    const editPopupRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                (popupRef.current &&
                    !popupRef.current.contains(event.target) &&
                    isPopupOpen) ||
                (editPopupRef.current &&
                    !editPopupRef.current.contains(event.target) &&
                    isEditPopupOpen)
            ) {
                setPopupOpen(false);
                setEditPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isPopupOpen, isEditPopupOpen]);

    const handleButtonClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleEditButtonClick = () => {
        setEditPopupOpen(!isEditPopupOpen);
    };
  
    const handleAddUserClick = async () => {
        try {
            const userData = {
                username: 'testasd',
                password: '123456',
                email: 'baba@jaga.com',
                role_id: 3, // Adjust the role_id based on your requirements
            };

            const createdUser = await CreateUser(userData);
            console.log("User created successfully:", createdUser);

            // Close the popup after successful user creation
            setPopupOpen(false);
        } catch (error) {
            console.error("Error creating user:", error.message);
        }
    };
    const handleAddProdctClick = async () => {
        try {
            const productData = {
                name: '',
                description:'',
                quantity:'',
                supplier_price:'',
                store_price:'',

                supplier_id:'',
                category_id:'',
                destination_shelf_id:'',

                asignee_id:'',
                delivered:'',
            };

            const createdProduct = await createProduct(productData);
            console.log("User created successfully:", createdProduct);

            // Close the popup after successful user creation
            setPopupOpen(false);
        } catch (error) {
            console.error("Error creating user:", error.message);
        }
    };




    
    useEffect(() => {
        const Fetch = async( ) => {
            const dataproducts = await GetAllProducts();
            const datausers = await GetAllUsers();
            console.log(datausers);
        };
        Fetch();
    }, []);

    return (
        <>
            <div className="main-user-container">
                <Background />
                <div className="user-container">
                    <div className="main-user-title">
                        <h1 className="text-primary">Admin interface</h1>
                    </div>
                    <div className="user-list">
                        <p className="text-secondary">Users</p>
                        <div className="specific-user-titles">
                            <div className="id-title">
                                <p className="small-text">ID</p>
                            </div>
                            <div className="role-title">
                                <p className="small-text">Role</p>
                            </div>
                            <div className="other-title">
                                <p className="small-text">Other</p>
                            </div>
                        </div>
                        <div className="specific-user">
                            <div className="id-container">
                                <p>x</p>
                            </div>
                            <div className="role-container">
                                <p>x</p>
                            </div>
                            <div className="other-container">
                                <p>x</p>
                            </div>
                            <div className="edit-container">
                                <button
                                    className="user-edit-buttons"
                                    onClick={handleEditButtonClick}
                                >
                                    <p className="text-buttons">Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-buttons">
                        <div className="user-creating-stuff">
                            <button
                                className="user-create-buttons"
                                onClick={handleButtonClick}
                            >
                                <p className="text-buttons">Add User</p>
                            </button>
                            <button className="user-create-buttons">
                                <p className="text-buttons">Create Report</p>
                            </button>
                        </div>
                        <div className="user-page-swappers">
                            <button className="user-swap-buttons">
                                <img src={LeftArrow} alt="Previous Button" />
                            </button>
                            <button className="user-swap-buttons">
                                <img src={RightArrow} alt="Next Button" />
                            </button>
                        </div>

                        {isPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup-box" ref={popupRef}>
                                    <h2 className="popup-title">Add user</h2>
                                    <div className="popup-layout">
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Username
                                                </h2>
                                                {errorMessages.Username && (
                                                    <p className="error-text">
                                                        {errorMessages.Username}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Password
                                                </h2>
                                                {errorMessages.Password && (
                                                    <p className="error-text">
                                                        {errorMessages.Password}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Email
                                                </h2>
                                                {errorMessages.email && (
                                                    <p className="error-text">
                                                        {errorMessages.email}
                                                    </p>
                                                )}
                                            </div>
                                            <input type="email" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Role
                                                </h2>
                                                {errorMessages.role && (
                                                    <p className="error-text">
                                                        {errorMessages.role}
                                                    </p>
                                                )}
                                            </div>
                                            <select
                                                name="role"
                                                className="popup-dropdown"
                                            >
                                                {roles.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="left">
                                        <button onClick = {handleAddUserClick} className="popup-button">
                                        Add User
                                            <h1 className="button-text">
                                                
                                            </h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isEditPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup-box" ref={editPopupRef}>
                                    <h2 className="popup-title">Edit User</h2>
                                    <div className="popup-layout">
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Username
                                                </h2>
                                                {errorMessages.EditUsername && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditUsername
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Password
                                                </h2>
                                                {errorMessages.EditPassword && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditPassword
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="text" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Email
                                                </h2>
                                                {errorMessages.EditEmail && (
                                                    <p className="error-text">
                                                        {
                                                            errorMessages.EditEmail
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <input type="email" />
                                        </div>
                                        <div className="popup-input">
                                            <div className="input-row">
                                                <h2 className="input-text">
                                                    Role
                                                </h2>
                                                {errorMessages.EditRole && (
                                                    <p className="error-text">
                                                        {errorMessages.EditRole}
                                                    </p>
                                                )}
                                            </div>
                                            <select className="popup-dropdown">
                                                {roles.map((role) => (
                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="left">
                                        <button className="popup-button">
                                            <h1 className="button-text">
                                                Add user
                                            </h1>
                                        </button>
                                        <button className="popup-button">
                                            <h1 className="button-text">
                                                Remove user
                                            </h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
