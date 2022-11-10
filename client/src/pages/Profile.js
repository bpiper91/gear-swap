import React from "react";

const Profile = () => {
    return (
        <main>
            {/* NEED: Pull in Name and Message to display on list */}
            <div className="profile">
                <img className="profile-pic" src="/assets/images/defaultprofile.png" alt="profile pic"></img>
                <div className="profile-info">
                    <ul>
                        <li>Name: FirstName LastName</li>
                        <li>Location: UserLocation</li>
                        <li>Groups: NumberGroups</li>
                        <li>Active Listings: NumberListings</li>
                        <li>Open Swaps: OpenSwaps</li>
                    </ul>
                    <button className="profile-btn">Create a New Listing</button>
                    <button className="profile-btn">Create a New Swap</button>
                </div>
            </div>
        </main>

    )
};
export default Profile;
