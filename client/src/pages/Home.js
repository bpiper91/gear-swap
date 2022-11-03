import React from 'react';
import GroupList from '../components/GroupList';
import ListingList from '../components/ListingList';



const Home = () => {
    return (
        <>
            {/*  */}
            {/* <div className="" id=""></div> */}
        <GroupList />
        <ListingList />
        
        <main className="home-main">
            <div className="background-img">

                <a href="/profile" className="listing-btn-a">
                    <input id="profile-btn" type="submit" value="Your Profile" className="browse-btn"/></a>
                <div className="profile-btn"></div>
                <div className="login-sheet-background"></div>
                <div className="login-sheet">
                    <a href="/" className="listing-btn-a">
                        <input id="group-browse-btn" type="submit" value="Browse groups near you!" className="browse-btn"/></a>
                    <a href="/" className="listing-btn-a">
                    <input id="listing-browse-btn" type="submit" value="Browse Gear" className="browse-btn"/></a>
                <div className="login-copyright">@2022 Gear Swap™ All rights reserved</div>
                </div>
            </div>
        </main>
    </>
    )
}
export default Home;