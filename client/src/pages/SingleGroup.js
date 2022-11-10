import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP } from '../utils/queries';
import { UPDATE_USER_GROUPS } from '../utils/mutations';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import ListingList from "../components/ListingList";
import { Link } from "react-router-dom";

const SingleGroup = () => {
    const { groupId } = useParams();

    const { loading: singleGroupLoading, data: singleGroupData } = useQuery(QUERY_GROUP, {
        variables: { _id: groupId }
    });
    //const { loading: loadingListings, data: listingsData } = useQuery(QUERY_LISTINGS_DISPLAY);
    const [updateUserGroup] = useMutation(UPDATE_USER_GROUPS);

    // let showJoinButton = true;
    // let notInGroup = true;
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (singleGroupData) {
    //     if (!token) {
    //         // if the user isn't logged in, don't show the join button
    //         showJoinButton = false;
    //     } else {
    //         // check to see if current user is a member of the group
    //         // const userData = Auth.getProfile();
    //         // const userMatch = singleGroupData.group.users.map(user => user === userData._id);
    //         // userMatch.length > 0 ? notInGroup = false : notInGroup = true;
    //     };
    // };

    const userData = Auth.getProfile();
    console.log(userData)

    // add user to group
    const joinGroup = async (event) => {
        event.preventDefault();

        try {
            const userUpdate = await updateUserGroup({
                variables: {
                    groups: groupId,
                    userId: userData.data._id
                }
            });

            console.log(userUpdate)

            document.getElementById('join-group').setAttribute('value', 'Joined Group');

        } catch (err) {
            console.error(err);
        };
    };

    return (
        <main>
           { singleGroupLoading &&
                <div className="list-main">
                <div className="group-info">
                    <h1>Loading Group</h1>
                </div>
                </div>}
            { singleGroupData &&
                <div className="list-main">
                <div>
                    <h1>{singleGroupData.group.groupName}</h1>
                    <p>{singleGroupData.group.location}</p>
                    <p>{singleGroupData.group.description}</p>
                    <button onClick={joinGroup} id='join-group' className="profile-btn">Join Group</button>
                    <Link to={`/nl/${groupId}`} className="profile-btn-link">
                        Create a New Listing in this Group
                    </Link>
                </div>
                </div>}
            <ListingList  />
        </main>
    )
};
export default SingleGroup;
