import React from "react";
import { gql, useQuery } from '@apollo/client';
import { QUERY_GROUPS_PUBLIC } from '../../utils/queries';
import { Link } from "react-router-dom";

const GroupList = () => {
  const { loading, data } = useQuery(QUERY_GROUPS_PUBLIC);

  console.log(data)

  let noGroups = false;

  if (data && data.groupsPublic.length == 0) {
    noGroups = true;
  };

  return (
    <div className="grouplist-main">
      <div className="list-wrapper">
        <h2 className="group-list-title">Groups</h2>
        <input type="search" id="group-input" placeholder="Browse groups" className="group-input" />
        <ul className="grouplist-list">
          {loading && <li><h2>Loading Groups</h2></li>}
          {data &&
            data.groupsPublic.map(group => (
              <li key={group._id}>
                <h2>
                  <Link to={`/g/${group._id}`}>
                    {group.groupName}
                  </Link>
                </h2>
                <p>
                  {group.description}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupList;