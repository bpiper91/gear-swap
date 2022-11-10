import React, { useState } from 'react';
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import { useMutation } from '@apollo/client';
import { CREATE_LISTING } from '../utils/mutations';
// import { ListingProvider, useNewListingContext } from '../utils/GlobalState';
// import { UPDATE_NEW_LISTING_IMAGES } from '../utils/actions';
import { useParams, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const NewListing = () => {
    const { groupId } = useParams();

    let navigate = useNavigate();

    // use CREATE_LISTING mutation as createListing
    const [createListing, { data: createListingData }] = useMutation(CREATE_LISTING);

    // // use state for upload image URLs
    // const [listingImages, setListingImages] = useState([]);
    // const widgetToNewListing = () => {

    // };

    // use local state for listing title, description, and value
    const [listingTitle, setListingTitle] = useState('');
    const [listingDescription, setListingDescription] = useState('');
    const [listingValue, setListingValue] = useState('');

    // // when an image is clicked, delete it from the newListingImages array in global state
    // const deleteUploadedImage = (imageURL) => {
    //     const updatedListingImages = newListingImages.filter(image => image !== imageURL);
    //     // dispatch({
    //     //     type: UPDATE_NEW_LISTING_IMAGES,
    //     //     newListingImages: updatedListingImages
    //     // });

    //     setListingImages(updatedListingImages);
    // };

    // when the form changes, update state
    const handleFormChange = (event) => {
        if (event.target.name === 'listing-title') {
            setListingTitle(event.target.value);
        } else if (event.target.name === 'listing-value') {
            setListingValue(event.target.value);
        } else if (event.target.name === 'listing-description') {
            setListingDescription(event.target.value);
        };
    };

    // when the form is submitted, add a new listing to the database
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.getProfile();
        console.log('token: ')
        console.log(token)

        if (!token) {
            console.error('Must be logged in to do that');
            return false;
        } else if (listingTitle === '') {
            console.error('A listing title is required');
            return false;
        };

        let listingVariables = {
            title: listingTitle,
            group: groupId,
            creator: token.data._id,
            description: listingDescription,
            value: parseInt(listingValue)
        };

        // if (listingDescription !== '') {
        //     listingVariables = {...listingVariables, description: listingDescription};
        // };

        // if (listingValue !== '') {
        //     listingVariables = {...listingVariables, value: parseInt(listingValue)};
        // };

        console.log('listingVariables')
        console.log(listingVariables)

        // if (newListingImages.length > 0) {
        //     variables = {...variables, images: state.listingImages};
        // };

        // if (document.getElementById('upload-img-1').src !== )

        try {
            const createListingData = await createListing({ 
                variables: listingVariables
            });

            console.log('created listing: ')
            console.log(createListingData)
            // reset form fields and images
            // setListingTitle('');
            // setListingDescription('');
            // setListingValue('');
            // dispatch({
            //     type: UPDATE_NEW_LISTING_IMAGES,
            //     newListingImages: []
            // });

            // load group page
            navigate(`/g/${groupId}`);

        } catch (err) {
            console.error(err);
        };
    };

    return (
        <main>
        <div className='new-listing'>
            <h2>Create a New Listing</h2>
            <form id='new-listing-form' onSubmit={handleFormSubmit}>
                <p>Title:</p>
                <input 
                    name='listing-title'
                    id='listing-title'
                    placeholder='Listing title...'
                    value={listingTitle}
                    onChange={handleFormChange}
                ></input>
                <p>Est. Value: </p>
                <input
                    name='listing-value'
                    id='listing-value'
                    placeholder='Est. value (USD)'
                    value={listingValue}
                    onChange={handleFormChange}
                ></input>
                <p>Description: </p>
                <textarea
                    name='listing-description'
                    id='listing-description'
                    placeholder='Describe your gear here...'
                    value={listingDescription}
                    onChange={handleFormChange}
                ></textarea><br />
                {/* <p>Image Upload:</p>
                <CloudinaryUploadWidget /> */}
                <button type='submit' id='new-listing-btn' value='create-listing'>Create New Listing</button>
            </form>
        </div>
        </main>
    );
};

export default NewListing;