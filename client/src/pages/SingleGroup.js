import React from "react";
import { gql, useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP } from '../utils/queries';
import { UPDATE_USER_GROUPS } from '../utils/mutations';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import ListingList from "../components/ListingList";

const SingleGroup = () => {
    const { groupId } = useParams();

    const { loading: loadingGroup, data: group } = useQuery(QUERY_GROUP);
    //const { loading: loadingListings, data: listingsData } = useQuery(QUERY_LISTINGS_DISPLAY);
    const [updateUserGroup] = useMutation(UPDATE_USER_GROUPS);

    let showJoinButton = true;
    let notInGroup = true;
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (group) {
        if (!token) {
            // if the user isn't logged in, don't show the join button
            showJoinButton = false;
        } else {
            // check to see if current user is a member of the group
            console.log(Auth.getProfile());
            const userData = Auth.getProfile();
            const userMatch = group.users.map(user => user === userData._id);
            userMatch.length > 0 ? notInGroup = false : notInGroup = true;
        };
    };


    // add user to group
    const joinGroup = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateUserGroup({
                variables: {
                    groups: groupId
                }
            });
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <main>
            {loadingGroup &&
                <div className="group-info">
                    <h1>Loading Group</h1>
                </div>}
            {group &&
                <div>
                    <h1>{group.groupName}</h1>
                    <p>{group.location}</p>
                    <p>{group.description}</p>
                    {showJoinButton && notInGroup &&
                        <button onClick={joinGroup} id='join-group'>Join Group</button>}
                    {showJoinButton == false && <p>Create an account or log in to join this group.</p>}
                    {showJoinButton && notInGroup == false && <p>You are a member of this group.</p>}
                </div>}
            <ListingList groupId={groupId} />
        </main>
    )
};
export default SingleGroup;
