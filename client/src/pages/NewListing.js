import React, { useState, useEffect } from 'react';
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import { gql, useMutation } from '@apollo/client';
import { CREATE_LISTING } from '../utils/mutations';
import { useNewListingContext } from './utils/GlobalState';
import { UPDATE_NEW_LISTING_IMAGES } from './utils/actions';

const NewListing = (groupId) => {
    // use CREATE_LISTING mutation as createListing
    const [createListing, { data }] = useMutation(CREATE_LISTING);
    
    // use global state for listing upload image URLs
    const [state, dispatch] = useNewListingContext();
    const { newListingImages } = state;

    // use local state for listing title, description, and value
    const [listingTitle, setListingTitle] = useState('');
    const [listingDescription, setListingDescription] = useState('');
    const [listingValue, setListingValue] = useState('');

    // when an image is clicked, delete it from the newListingImages array in global state
    const deleteUploadedImage = (imageURL) => {
        const updatedListingImages = newListingImages.filter(image => image !== imageURL);
        dispatch({
            type: UPDATE_NEW_LISTING_IMAGES,
            newListingImages: updatedListingImages
        });
    };

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

        if (!context.user) {
            console.error('Must be logged in to do that');
            return false;
        } else if (listingTitle === '') {
            console.error('A listing title is required');
            return false;
        };

        let variables = {
            title: listingTitle,
            groupId: groupId
        };

        if (listingDescription !== '') {
            variables = {...variables, description: listingDescription};
        };

        if (listingValue !== '') {
            variables = {...variables, value: listingValue};
        };

        if (newListingImages.length > 0) {
            variables = {...variables, images: newListingImages};
        };

        try {
            await createListing({ variables });

            // reset form fields and images
            setListingTitle('');
            setListingDescription('');
            setListingValue('');
            dispatch({
                type: UPDATE_NEW_LISTING_IMAGES,
                newListingImages: []
            });

        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div className='new-listing'>
            <form id='new-listing-form' onSubmit={handleFormSubmit}>
                <label for='listing-title'>Title: </label>
                <input 
                    name='listing-title'
                    id='listing-title'
                    placeholder='Listing title...'
                    value={listingTitle}
                    onChange={handleFormChange}
                ></input>
                <label for='listing-value'>Est. Value: </label>
                <input
                    name='listing-value'
                    id='listing-value'
                    placeholder='Est. value (USD)'
                    value={listingValue}
                    onChange={handleFormChange}
                ></input>
                <label for='listing-description'>Description: </label>
                <textarea
                    name='listing-description'
                    id='listing-description'
                    placeholder='Describe your gear here...'
                    value={listingDescription}
                    onChange={handleFormChange}
                ></textarea>
                <p>Image Upload:</p>
                <CloudinaryUploadWidget />
                <p>Image Upload Preview: </p>
                <div className='upload-images' style="width: 90%; margin-right: auto; margin-left: auto;">
                    {newListingImages && 
                    newListingImages.map(image => (
                        <figure key={i} className='upload-image-preview' style="width: 30%;">
                            <img src={image} style="max-height: 200px; object-fit: scale-down;"
                                onClick={deleteUploadedImage(image)} />
                        </figure>
                    ))}
                    <p style='clear: both;'>Listings can include a maximum of 3 images. Click on an image thumbnail to delete it.</p>
                </div>
                <button type='submit' id='new-listing-btn' value='create-listing'>Create New Listing</button>
            </form>
        </div>
    );
};

export default NewListing;