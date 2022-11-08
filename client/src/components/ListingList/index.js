import React from "react";
import { Link } from "react-router-dom";

const ListingList = (listings) => {
    // if (!listings.length) {
    //   return (
    //     <div>
    //       <h2>No Listings Yet</h2>
    //     </div>
    //   );
    // }
    return (
        <div>
            <div className="lists">
                <h2>Listings</h2>
                <ul>
                    <li><Link to="/">current placeholder</Link></li>
                    <li><Link to="/">current placeholder</Link></li>
                    <li><Link to="/">current placeholder</Link></li>
                    <li><Link to="/">current placeholder</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default ListingList;
