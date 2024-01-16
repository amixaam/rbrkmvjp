import React from "react";
import "./index.css";
import "../../text.css";
import "../../Reusable/Background.css"
import LeftArrow from "../../images/left_arrow.svg"
import RightArrow from "../../images/right_arrow.svg"

function Users() {
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
