import React from "react";
// import { Link } from "react-router-dom";

const GroupList = (groups) => {
if (!groups.length) {
  return (
    <div>
      <h2>No Groups Yet</h2>
    </div>
  );
}
  return (
    <div className="grouplist-main">
        <div className="list-wrapper">
          <h2 className="group-list-title">Groups</h2>
          <input type="search" id="group-input" placeholder="Browse groups" className="group-input" />
          <ul className="grouplist-list">
            <li className="list-g"><a href="/">current placeholder</a></li>
            <li className="list-g"><a href="/">current placeholder</a></li>
            <li className="list-g"><a href="/">current placeholder</a></li>
            <li className="list-g"><a href="/">current placeholder</a></li>
            <li className="list-g"><a href="/">current placeholder</a></li>
            <li className="list-g"><a href="/">current placeholder</a></li>
          </ul>
        </div>
      </div>
  );
};

export default GroupList;
