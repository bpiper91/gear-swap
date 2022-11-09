import React from 'react';
import GroupList from '../components/GroupList';
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main className='home-main-class'>
      <GroupList />
      <div className="homepage vh-100">
        {loggedIn && (
          <Link to="/profile" className="browse-btn">
            <input
              id="profile-btn"
              type="submit"
              value="Your Profile"
              className="browse-btn"
            />
          </Link>
        )}
        {/* <div className="profile-btn"></div>
          <div className="login-sheet-background"></div>
          <div className="login-sheet">
            <Link to="/" className="listing-btn-a">
              <input
                id="group-browse-btn"
                type="submit"
                value="Browse groups near you!"
                className="browse-btn"
              />
            </Link>
            <Link to="/" className="listing-btn-a">
              <input
                id="listing-browse-btn"
                type="submit"
                value="Browse Gear"
                className="browse-btn"
              />
            </Link> */}
        {/* <div className="group-browse-container w-25 d-flex flex-column">
          <div className="group-search h3 text-center ">Find a group</div>
          <div className="group-listings-container h-100">
            <ul>
              <li id="group-item"><a href="../components/GroupList">group 1</a></li>
              <li id="group-item"><a href="../components/GroupList">group 2</a></li>
              <li id="group-item"><a href="../components/GroupList">group 3</a></li>
              <li id="group-item"><a href="../components/GroupList">group 4</a></li>
              <li id="group-item"><a href="../components/GroupList">group 5</a></li>
            </ul>
          </div>
        </div> */}
        <div className="login-copyright">
          @2022 Gear Swap™ All rights reserved
        </div>
      </div>
    </main >
  );
}
export default Home;