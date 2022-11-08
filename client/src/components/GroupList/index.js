import React from "react";
import { Link } from "react-router-dom";

const GroupList = (groups) => {
// if (!groups.length) {
//   return (
//     <div>
//       <h2>No Groups Yet</h2>
//     </div>
//   );
// }
  return (
    <div>
        <div className="lists">
          <h2>Groups</h2>
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

export default GroupList;
