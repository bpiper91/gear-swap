require('dotenv').config();
import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
    componentDidMount() {
        const cloudName = process.env.CLOUD_NAME;
        const uploadPreset = process.env.CLOUD_PRESET;

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
                    console.log("Done! Here is the image info: ", result.info);
                    document
                        .getElementById("uploadedimage")
                        .setAttribute("src", result.info.secure_url); 
                        // pass this variable to the updateListing mutation
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
            <button id="upload-widget-btn" className="cloudinary-button">
                Upload
            </button>
        );
    };
};

export default CloudinaryUploadWidget;