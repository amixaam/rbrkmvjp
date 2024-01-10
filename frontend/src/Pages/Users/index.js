import React from "react";
import "./User.css";
import LeftArrow from "../../images/left_arrow.svg"
import RightArrow from "../../images/right_arrow.svg"

function Users() {
    return <>
        <div className="main-user-container">
            <div className="user-container">
                <div className="title">

                </div>
                <div className="userList">
                    <div className="specific-user">

                    </div>
                </div>
                <div className="buttons">
                    <div className="atskaites">
                        <button>Atskaite</button>
                    </div>
                    <div className="page-swappers">
                        <button><img src={LeftArrow} alt="Previous Button"/></button>
                        <button><img src={RightArrow} alt="Next Button"/></button>
                    </div>

                </div>

            </div>
        </div>
    </>
}

export default Users;
