const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: Int
        },
        creator: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        // image: ??? | need to figure out how to handle image uploads
    }
);

const Listing = model('Listing', listingSchema);

module.exports = Listing;