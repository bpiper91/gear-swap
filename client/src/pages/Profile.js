import React from "react";
// <div className="" id=""></div>
const Profile = () => {
    return (
        <main className="profile-main">
            <div className="user-name" id="user-name">Hello, ""</div>
            <div className="user-groups-container" id="user-groups-container">
                <div className="user-groups" id="user-groups">
                    <div className="user-groups-title">Your Groups</div>
                    <ul className="user-groups-list">
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                    </ul>
                </div>
                <div className="user-messages-container" id="user-messages-container">
                    <div className="user-messages-title">Your Messages</div>
                    <div className="user-messages-list-cont" id="user-messages-lsit-cont">
                        <ul className="user-messages-list" id="user-messages-list">
                            <li className="user-message"> Name:"" Message:""</li>
                            <li className="user-message"> Name:"" Message:""</li>
                            <li className="user-message"> Name:"" Message:""</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
};
export default Profile;
