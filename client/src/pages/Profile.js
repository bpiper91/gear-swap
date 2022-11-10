import React from "react";
import { Navigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
    const { userId: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { userId: userParam }
      });

    if (loading) {
        return <div>Loading...</div>;
      };

    console.log(data)

    const user = data?.me || data?.user || {};

    console.log(user.groups)

  

    return (
        <main>
            {/* NEED: Pull in Name and Message to display on list */}
            <div className="profile">
                <img className="profile-pic" src="/assets/images/defaultprofile.png" alt="profile pic"></img>
                <div className="profile-info">
                    <ul>
                        <li>Name: {user.firstName} {user.lastName}</li>
                        <li>Location: {user.location ? `${user.location}` : `No location provided`} </li>
                        {/* <li>Groups: NumberGroups</li> */}
                        <li>Active Listings: {user.listings.length} listings  </li>
                        <li>Open Swaps: {user.activeSwaps.length} swaps </li>
                    </ul>
                    <button className="profile-btn">Create a New Listing</button>
                    <button className="profile-btn">Create a New Swap</button>
                </div>
                

            </div>
            <div  className="profile">
                {user.groups.length ? 
                  
                  <ul className="grouplist-list">
                  <h2>{user.firstName}'s Groups</h2>
                    {user.groups.length > 0  &&
                        user.groups.map(group => (
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
                    : `${user.firstName} has no groups` }
                </div>
        </main>

    )
};
export default Profile;
