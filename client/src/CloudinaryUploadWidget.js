//require('dotenv').config();
import React, { Component } from "react";
// import { useNewListingContext } from './utils/GlobalState';
// import { UPDATE_NEW_LISTING_IMAGES } from './utils/actions';
import noImg from './utils/no-image.png';
// import cloudinary from 'https://upload-widget.cloudinary.com/global/all.js'

class CloudinaryUploadWidget extends Component {

    componentDidMount() {
        const cloudName = 'dfgcg6jjq';
        const uploadPreset = 'gear-swap';
        // const cloudName = process.env.CLOUD_NAME;
        // const uploadPreset = process.env.CLOUD_PRESET;

        let newListingImages = []

        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                cropping: true, // adds a cropping step before upload
                sources: ["local", "url", "camera", "dropbox", "google_drive", "instagram", "facebook"],
                multiple: true,  // user can upload multiple files
                showUploadMoreButton: true,
                maxFiles: 3, // max of 3 uploads
                resourceType: "image",
                clientAllowedFormats: ["image"], // only applies to local uploads
                maxImageFileSize: 2000000,  // restricts file size to 2MB
                maxImageWidth: 2000, // scales image down to 2k pixels wide before upload
                theme: "default", // other options are white and purple
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const newImageURL = result.info.secure_url;
                    if (newListingImages.length < 3) {
                        // dispatchEvent({
                        //     type: UPDATE_NEW_LISTING_IMAGES,
                        //     newLisingImages: [...newListingImages, newImageURL]
                        // });

                        newListingImages.push(newImageURL);
                    } else {
                        console.log('You cannot upload more than 3 images!');
                    };

                    // document
                    //     .getElementById("uploadedimage")
                    //     .setAttribute("src", result.info.secure_url);
                    // // pass this variable to the updateListing mutation

                    if (newListingImages[0]) {
                        document.getElementById('upload-img-1').setAttribute(newListingImages[0]);
                    };

                    if (newListingImages[1]) {
                        document.getElementById('upload-img-2').setAttribute(newListingImages[1]);
                    };

                    if (newListingImages[2]) {
                        document.getElementById('upload-img-3').setAttribute(newListingImages[2]);
                    }
                }
            }
        );
        document.getElementById("upload-widget-btn").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    };

    render() {
        return (
            <div>
                <button id="upload-widget-btn" className="cloudinary-button">
                    Upload Images
                </button>
                <div>
                    <p>Image Upload Preview: </p>
                    <div className='upload-images'>
                        <img id="upload-img-1" src={noImg} alt="first uploaded image" />
                        <img id="upload-img-2" src={noImg} alt="first uploaded image" />
                        <img id="upload-img-3" src={noImg} alt="first uploaded image" />
                        <p>Listings can include a maximum of 3 images. Click on an image thumbnail to delete it.</p>
                    </div>
                </div>
                <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">
                </script>
            </div>
        );
    };
};

export default CloudinaryUploadWidget;