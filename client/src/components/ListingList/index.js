import React from "react";

// this page is using 'grouplist.css' due to same "classnames"

const ListingList = () => {
    return (
        <main className="list-main">
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
        </main>
    );
};

export default ListingList;
