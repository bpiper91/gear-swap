import React from 'react';
import GroupList from '../components/GroupList';
// import ListingList from '../components/ListingList';
import { useQuery } from "@apollo/client";
import { QUERY_GROUPS_PUBLIC, QUERY_LISTINGS_DISPLAY } from "../utils/queries";

const Home = () => {
  // use useQuery hook to make query request
  // const { data: groupData } = useQuery(QUERY_GROUPS_PUBLIC);
  // const { listingsData } = useQuery(QUERY_LISTINGS_DISPLAY)
  // const groupList = groupData?.groupsPublic || []
  // const listings = listingsData?.listingsDisplay || []
  return (
    <>
      <main>
        <div className='container text-center'>
          <div className="row justify-content-center">
            <div className='col-5'>
              <GroupList />
            </div>
            {/* <div className='col-5'>
              <ListingList listings={listings}/>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;