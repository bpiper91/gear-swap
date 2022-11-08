import React from 'react';
import GroupList from '../components/GroupList';
import ListingList from '../components/ListingList';
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS, QUERY_LISTINGS_DISPLAY } from "../utils/queries";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  // use useQuery hook to make query request
  const { groupData } = useQuery(QUERY_GROUPS);
  const { listingsData } = useQuery(QUERY_LISTINGS_DISPLAY)
  const groups = groupData?.groups || []
  const listings = listingsData?.listingsDisplay || []
  const loggedIn = Auth.loggedIn();
  return (
      <main className="home-main-class">
        {/*<GroupList*/}
        {/*  groups={groups}*/}
        {/*/>*/}
        {/*<ListingList*/}
        {/*  listings={listings}*/}
        {/*/>*/}

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
            {/*<Link to="/" className="listing-btn-a">*/}
            {/*  <input*/}
            {/*    id="group-browse-btn"*/}
            {/*    type="submit"*/}
            {/*    value="Browse groups near you!"*/}
            {/*    className="browse-btn"*/}
            {/*  />*/}
            {/*</Link>*/}
            {/*<Link to="/" className="listing-btn-a">*/}
            {/*  <input*/}
            {/*    id="listing-browse-btn"*/}
            {/*    type="submit"*/}
            {/*    value="Browse Gear"*/}
            {/*    className="browse-btn"*/}
            {/*  />*/}
            {/*</Link>*/}
              <div className="group-browse-container w-25 d-flex flex-column">
                  <div className="group-search text-center ">Find a group</div>
                  <div className="group-listings-container h-100">
                    <ul>
                        <li className="group-item" id="group-item/:id"><a href="../components/GroupList">group 1</a></li>
                        <li className="group-item" id="group-item/:id"><a href="../components/GroupList">group 2</a></li>
                        <li className="group-item" id="group-item/:id"><a href="../components/GroupList">group 3</a></li>
                        <li className="group-item" id="group-item/:id"><a href="../components/GroupList">group 4</a></li>
                        <li className="group-item" id="group-item/:id"><a href="../components/GroupList">group 5</a></li>
                    </ul>
                  </div>
              </div>

          </div>
      </main>
  );
}
export default Home;