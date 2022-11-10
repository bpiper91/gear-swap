import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS_PUBLIC } from '../../utils/queries';
import { Link } from "react-router-dom";

const GroupList = () => {
  const { loading: groupsDataLoading, data: groupsPublicData } = useQuery(QUERY_GROUPS_PUBLIC);

  console.log(groupsPublicData)

  let noGroups = false;

  if (groupsPublicData && groupsPublicData.groupsPublic.length == 0) {
    noGroups = true;
  };

  return (
    <div className="grouplist-main">
      <div className="list-wrapper">
        <h2 className="group-list-title">Groups</h2>
        <input type="search" id="group-input" placeholder="Browse groups" className="group-input" />
        <ul className="grouplist-list">
          {groupsDataLoading && <li><h2>Loading Groups</h2></li>}
          {groupsPublicData &&
            groupsPublicData.groupsPublic.map(group => (
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