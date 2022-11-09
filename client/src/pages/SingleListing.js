import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';
import { CREATE_SWAP } from '../utils/mutations';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';

const SingleListing = () => {
    const { groupId, listingId } = useParams();

    const { loading, data } = useQuery(QUERY_LISTING, {
        variables: { _id: listingId }
    });

    // initiate new swap
    const offerSwap = async (event) => {
        event.preventDefault();
    };

    if (loading) {
        return (<div><h1>Loading Listing</h1></div>);
    };

    if (data) {
        const listing = data.listing;
        const { firstName, lastName, location } = listing.creator;

        return (
            <div>
                <h1>{listing.title}</h1>
                <h2>Description</h2>
                {listing.images && listing.images.map((imageURL, index) => (
                    <img key={index} src={listing.images[index]}
                        alt={`${index}: ${listing.title}`}
                    />
                ))}
                <p>
                    {listing.description}
                </p>
                <p>
                    {listing.value && <span>Approximate Value: ${listing.value}</span>}
                    {location && listing.value && <span> | </span>}
                    {location && <span>Location: {location}</span>}
                </p>
                <h3>
                    Swapper Info
                </h3>
                <p>
                    Listed by {firstName} {lastName.charAt(0).toUpperCase()}.
                </p>
                <p>
                    Message {firstName}
                </p>
                <p>
                    See all of {firstName}'s listings
                </p>
                <button id="swap-button" onClick={offerSwap}>
                    OFFER A SWAP
                </button>
            </div>
        );

    };
};

export default SingleListing;