import React from "react";

const ListingList = (listings) => {
    if (!listings.length) {
      return (
        <div>
          <h2>No Listings Yet</h2>
        </div>
      );
    }
    return (
        <div className="list-main">
            <div className="listing-wrapper">
                <div className="list-title">Gear</div>
                <input type="search" id="gear-input" placeholder="Browse gear" className="group-input" />
                <ul className="list-list">
                    <li className="list-l"><a href="/">current placeholder</a></li>
                    <li className="list-l"><a href="/">current placeholder</a></li>
                    <li className="list-l"><a href="/">current placeholder</a></li>
                    <li className="list-l"><a href="/">current placeholder</a></li>
                </ul>
            </div>
        </div>
    );
};

export default ListingList;
