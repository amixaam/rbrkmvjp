
import "../../text.css";
import "../../Reusable/Background.css"
import LeftArrow from "../../images/left_arrow.svg"
import RightArrow from "../../images/right_arrow.svg"
import React, { useState, useRef, useEffect } from "react";

function Users() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Admin", // Default role
  });

  const roles = ["Admin", "Manager", "Worker"];

  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddUser = () => {
    setUserData({
      Username: "",
      Password: "",
      email: "",
      role: ""
    });
    setPopupOpen(false);
  };

  const handleButtonClick = () => {
    setPopupOpen(!isPopupOpen);
  };
  
    return <>
        <div className="main-user-container">
            <div className="background-container"></div>
            <div className="user-container">
                <div className="title">
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
                            <button className="edit-buttons"><p className="text-buttons">Edit</p></button>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className="creating-stuff">
                        <button className="create-buttons" onClick={handleButtonClick}><p className="text-buttons">Add User</p></button>
                        <button className="create-buttons"><p className="text-buttons">Create Report</p></button>
                    </div>
                    <div className="page-swappers">
                        <button className="swap-buttons"><img src={LeftArrow} alt="Previous Button"/></button>
                        <button className="swap-buttons"><img src={RightArrow} alt="Next Button"/></button>
                    </div>
                                <button className="create-buttons" onClick={handleButtonClick}>
                Add User
              </button>

          {isPopupOpen && (
            <div className="popup-overlay">
              <div className="popup-box" ref={popupRef}>
                <h2 className="popup-title">Add new user</h2>
                <div className="popup-layout">
                  <div className="popup-input">
                    <div className="input-row">
                      <h2 className="input-text">Username</h2>
                    </div>
                    <input
                      type="text"
                      name="Username"
                      value={userData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="popup-input">
                    <div className="input-row">
                      <h2 className="input-text">Password</h2>
                    </div>
                    <input
                      type="text"
                      name="Password"
                      value={userData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="popup-input">
                    <div className="input-row">
                      <h2 className="input-text">Email</h2>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="popup-input">
                    <div className="input-row">
                      <h2 className="input-text">Role</h2>
                    </div>
                    <select
                      name="role"
                      value={userData.role}
                      onChange={handleInputChange}
                      className="popup-dropdown"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="left">
                  <button className="popup-button" onClick={handleAddUser}>
                    <h1 className="button-text">Add User</h1>
                  </button>
                </div>
              </div>
            </div>
          )}
                </div>
            </div>
    </>

}

export default Users;
