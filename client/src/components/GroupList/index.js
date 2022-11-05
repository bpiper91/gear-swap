import React from "react";

const GroupList = () => {
  return (
    <div className="grouplist-main">
        <div className="list-wrapper">
          <div className="group-list-title">Groups</div>
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
