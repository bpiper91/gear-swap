import React from 'react';
import GroupList from '../components/GroupList';
import ListingList from '../components/ListingList';
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS } from "../utils/queries";
import Auth from "../utils/auth";


const Home = () => {
  // use useQuery hook to make query request
  const { data } = useQuery(QUERY_GROUPS);
  console.log(data);
  const groups = data?.groups || []
  console.log(groups)
  const loggedIn = Auth.loggedIn();
  return (
    <>
      <main>
        <GroupList
          groups={groups}
        />
        <ListingList/>
        <div className="homepage">
          {loggedIn && (
          <a href="/profile" className="listing-btn-a">
            <input
              id="profile-btn"
              type="submit"
              value="Your Profile"
              className="browse-btn"
            />
          </a>
          )}
          <div className="profile-btn"></div>
          <div className="login-sheet-background"></div>
          <div className="login-sheet">
            <a href="/" className="listing-btn-a">
              <input
                id="group-browse-btn"
                type="submit"
                value="Browse groups near you!"
                className="browse-btn"
              />
            </a>
            <a href="/" className="listing-btn-a">
              <input
                id="listing-browse-btn"
                type="submit"
                value="Browse Gear"
                className="browse-btn"
              />
            </a>
            <div className="login-copyright">
              @2022 Gear Swap™ All rights reserved
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;