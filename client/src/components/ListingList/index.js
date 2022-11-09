import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS_DISPLAY } from '../../utils/queries';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ListingList = () => {
  const { groupId } = useParams();

  let noListings = false;

  const { loading, data } = useQuery(QUERY_LISTINGS_DISPLAY, {
    variables: { groupId: groupId }
  });

  if (data && data.listingsDisplay.length === 0) {
    noListings = true;
  };

  // listings query returns title, description, value, creator (firstName, lastName, location, completedSwaps), and images array
  // we can use any combination of those properties
   
  return (
    <div className="list-main">
      <div className="listing-wrapper">
        <div className="list-title">Available Gear</div>
        <input type="search" id="gear-input" placeholder="Browse gear" className="group-input" />
        <ul className="list-list">
          {loading && <li><h2>Loading Listings</h2></li>}
          {noListings && <li><h2>No Listings Found.</h2></li>}
          {data && 
            data.listingsDisplay.map(listing => (
              <li key={listing._id}>
                <h2>
                  <Link to={`/g/${groupId}/l/${listing._id}`}>
                    {listing.title}
                  </Link>
                </h2>
                <p>Listed by {listing.creator.firstName} {listing.creator.lastName.charAt(0).toUpperCase()}.</p>
                {listing.images[0] && <img src={`${listing.images[0]}`} width="150" height="150" alt={listing.title} style="object-fit: scale-down;" />}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ListingList;