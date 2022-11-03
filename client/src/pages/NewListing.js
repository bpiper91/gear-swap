import React, { useState, useEffect } from 'react';
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import Auth from '../utils/auth';
import { gql, useMutation } from '@apollo/client';
import { CREATE_LISTING } from '../utils/mutations';
import { useNewListingContext } from './utils/GlobalState';
import { UPDATE_NEW_LISTING_IMAGES } from './utils/actions';

const NewListing = (groupName) => {
    const [createListing, { data }] = useMutation(CREATE_LISTING);
    
    const [state, dispatch] = useNewListingContext();
    const { newListingImages } = state;

    const deleteUploadedImage = (imageURL) => {
        const updatedListingImages = newListingImages.filter(image => image !== imageURL);
        dispatch({
            type: UPDATE_NEW_LISTING_IMAGES,
            newListingImages: updatedListingImages
        });
    };

    return (
        <div className='new-listing'>

            <CloudinaryUploadWidget />
            <div className='upload-images' style="width: 90%; margin-right: auto; margin-left: auto;">
            {newListingImages && 
                newListingImages.map(image => (
                    <figure key={i} className='upload-image-preview' style="width: 30%;">
                        <img src={image} style="max-height: 200px; object-fit: scale-down;"
                            onClick={deleteUploadedImage(image)} />
                    </figure>
                ))}    
            </div>
        </div>
    );
};

export default NewListing;