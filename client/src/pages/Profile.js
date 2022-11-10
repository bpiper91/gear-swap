import React from "react";
// import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
// <div className="" id=""></div>
// <div className=""></div>
const Profile = () => {
    return (
        <main className="profile-main">
            <div className="user-name" id="user-name">
            <span id="upload-widget-btn"></span>
            </div>
            <div className="ugc-wrapper w-100">
            <div className="user-groups-container" id="user-groups-container">
                
                {/* NEED: display users groups in user-group-list */}
                
                <div className="user-groups" id="user-groups">
                    <div className="user-groups-title">Your Groups</div>
                    <ul className="user-groups-list">
                        <li className="user-group-list"><a href="/"><span id="user-group-list"></span></a></li>
                        {/* delete following placeholders when inputs display */}
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                        <li className="user-group-list"><a href="/">current placeholder</a></li>
                    </ul>
                </div>
                
                {/* NEED: Pull in Name and Message to display on list */}
                {/* NEED: Get new user-message <li> element to display upon being submitted */}
                
                <div className="user-messages-container" id="user-messages-container">
                    <div className="user-messages-title">Your Messages</div>
                    <div className="user-messages-list-cont" id="user-messages-lsit-cont">
                        <ul className="user-messages-list" id="user-messages-list">

                            <li className="user-message">
                                <span id="message-users-name">From: hank</span>
                                <span id="message-users-message">I wanna buy your stuff</span>
                            </li>
                            {/* delete following placeholders when inputs display */}
                            <li className="user-message"> Name:"" Message:""</li>
                            <li className="user-message"> Name:"" Message:""</li>
                            <li className="user-message"> Name:"" Message:""</li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            {/*ugc-wrapper END*/}
            <section className="user-listings-title"><i>Your Listings</i></section>
            <section className="active-listings-container d-flex justify-content-evenly flex-wrap">
                <div className="photo-desc-wrapper mt-3 mb-3">
                    <div className="listing-photo" id="listing-photo">
                        <span className="listing-photo" id="listing-photo"></span>
                    </div>
                    <div className="listing-desc" id="listing-desc">
                        <span className="listing-desc" id="listing-desc"></span>
                    </div>
                </div>
                <div className="photo-desc-wrapper mt-3 mb-3">
                    <div className="listing-photo" id="listing-photo">
                        <span className="listing-photo" id="listing-photo"></span>
                    </div>
                    <div className="listing-desc" id="listing-desc">
                        <span className="listing-desc" id="listing-desc"></span>
                    </div>
                </div>
                <div className="photo-desc-wrapper mt-3 mb-3">
                    <div className="listing-photo " id="listing-photo">
                        <span className="listing-photo" id="listing-photo"></span>
                    </div>
                    <div className="listing-desc" id="listing-desc">
                        <span className="listing-desc" id="listing-desc"></span>
                    </div>
                </div>
                <div className="photo-desc-wrapper mt-3 mb-3">
                    <div className="listing-photo" id="listing-photo">
                        <span className="listing-photo" id="listing-photo">PHOTO</span>
                    </div>
                    <div className="listing-desc" id="listing-desc">
                        <span className="listing-desc" id="listing-desc">DESCRIPTION</span>
                    </div>
                </div>
            </section>        
            </main>

    )
};
export default Profile;
