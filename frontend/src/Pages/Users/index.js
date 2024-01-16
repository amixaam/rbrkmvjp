import React from "react";
import "./User.css";
import LeftArrow from "../../images/left_arrow.svg"
import RightArrow from "../../images/right_arrow.svg"
import "../../text.css";

function Users() {
    return <>
        <div className="main-user-container">
            <div className="user-container">
                <div className="title">
                    <h1 className="text-primary">Admin interface</h1>
                </div>
                <div className="user-list">
                    <p className="text-secondary">Users</p>
                    <div className="specific-user-titles">
                        <div className="id-title">
                            <p>ID</p>
                        </div>
                        <div className="role-title">
                            <p>Role</p>
                        </div>
                        <div className="other-title">
                            <p>Other</p>
                        </div>
                    </div>
                    <div className="specific-user">

                    </div>
                </div>
                <div className="buttons">
                    <div className="creating-stuff">
                    <button className="create-buttons"><p className="text-buttons">Add User</p></button>
                        <button className="create-buttons"><p className="text-buttons">Create Report</p></button>
                    </div>
                    <div className="page-swappers">
                        <button className="swap-buttons"><img src={LeftArrow} alt="Previous Button"/></button>
                        <button className="swap-buttons"><img src={RightArrow} alt="Next Button"/></button>
                    </div>

                </div>

            </div>
        </div>
    </>
}

export default Users;
