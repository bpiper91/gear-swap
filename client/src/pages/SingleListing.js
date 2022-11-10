import React, { useState } from "react";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_LISTING, QUERY_ME } from '../utils/queries';
import { CREATE_SWAP } from '../utils/mutations';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';

const SingleListing = () => {
    const { groupId, listingId } = useParams();
    const [createSwap, { error }] = useMutation(CREATE_SWAP);
    const [swapOffered, setSwapOffered] = useState(false);
    // const [swapState, setSwapState] = useState({
    //     responder: '',
    //     groupId: '',
    //     proposerListings: [],
    //     proposerCash: '',
    //     responderListings: [],
    //     responderCash: ''
    // });
    // const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const { loading, data } = useQuery(QUERY_LISTING, {
        variables: { _id: listingId }
    });

    // initiate new swap
    const offerSwap = (event) => {
        event.preventDefault();

        setSwapOffered(true);
    };

    // // handle checkbox change in offerSwap form
    // const handleCheckbox = (event) => {
    //     event.preventDefault();

    //     if (event.target.type !== 'checkbox') {
    //         return false;
    //     };

    //     let listingsArr = swapState.proposerListings;

    //     if (event.target.checked && !listingsArr.includes(event.target.value)) {
    //         const newListingsArr = listingsArr.push(event.target.value);
    //         setSwapState({
    //             ...swapState, proposerListings: newListingsArr
    //         });
    //     } else if (!event.target.checked && listingsArr.includes(event.target.value)) {
    //         const newListingsArr = listingsArr.filter(id => id !== event.target.value);
    //         setSwapState({
    //             ...swapState, proposerListings: newListingsArr
    //         });
    //     };

    // };

    // // handle text input change in offerSwap form
    // const handleFormChange = (event) => {
    //     event.preventDefault();

    //     if (event.target.name === 'proposerCash') {
    //         setSwapState({
    //             ...swapState, proposerCash: parseInt(event.target.value, 10)
    //         });
    //     } else if (event.target.name === 'responderCash') {
    //         setSwapState({
    //             ...swapState, responderCash: parseInt(event.target.value, 10)
    //         });
    //     };
    // };

    // if waiting on query data, show loading message
    if (loading) {
        return (<main><h1>Loading Listing</h1></main>);
    };

    if (data) {
        const listing = data.listing;
        const { firstName, lastName, location } = listing.creator;

        // send swap offer
        const sendOffer = async (event) => {
            event.preventDefault();

            const swapResponse = await createSwap(
                { variables: {
                    responder: listing.creator._id,
                    responderListings: [listingId],
                    groupId: groupId,
                    proposerListings: [],
                    proposerCash: document.getElementById('proposer-cash').value,
                    responderCash: document.getElementById('responder-cash').value
                }});
            const swapId = swapResponse.createSwap._id;
            console.log('New Swap ID: ' + swapId);
        };

        let userListings = [
            {
                _id: '11111',
                title: 'Epiphone Les Paul Studio'
            },
            {
                _id: '11112',
                title: 'Orange Rockerverb amp'
            },
            {
                _id: '11113',
                title: 'Yamaha Acoustic Guitar with Case'
            }
        ];

        return (
            <main>
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
                { }
                {swapOffered === false && <button id="swap-button" onClick={offerSwap}>
                    OFFER A SWAP
                </button>}
                {swapOffered &&
                    <div>
                        <form onSubmit={sendOffer} id="swapForm">
                            <p>Offer Your Gear?</p>
                            {userListings.map((userListing, index) => (
                                <div key={index}>
                                    <input type="checkbox" id={userListing.title}
                                        name={userListing.title} value={userListing._id}
                                    //onChange={handleCheckbox}
                                    />
                                    <label for={userListing.title}>{userListing.title}</label><br />
                                </div>
                            ))}
                            <label for="proposer-cash">Add Cash to Swap Offer?</label>
                            <input id="proposer-cash" name="proposerCash"
                                placeholder="Enter a number in USD" //value={swapState.proposerCash}
                            //onChange={handleFormChange}
                            /><br />

                            <label for="responder-cash">Request Cash to Even Out Value?</label>
                            <input id="responder-cash" name="responderCash"
                                placeholder="Enter a number in USD" //value={swapState.responderCash}
                            //onChange={handleFormChange}
                            /><br />
                            <button type="submit">Submit Swap Offer to {firstName}</button>
                        </form>
                    </div>
                }
            </main>
        );
    };
};

export default SingleListing;