import React from 'react';
import GroupList from '../components/GroupList';
import ListingList from '../components/ListingList';
const Home = () => {
    return (
    <> 
        <GroupList />
        <ListingList />
        
        <main className="home-main">
            <div className="background-img">
             <div className="home-wrapper"></div>
            </div>
        </main>
    </>
    )
}
export default Home;