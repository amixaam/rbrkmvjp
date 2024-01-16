// Users.jsx
import React, { useState, useRef, useEffect } from "react";
import "./User.css";

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

  return (
    <>

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
    </>
  );
}

export default Users;
