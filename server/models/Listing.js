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
            trim: true
        },
        value: {
            type: Number
        },
        creator: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        images: {
            type: [String],
            default: []
        }
    }
);

const Listing = model('Listing', listingSchema);

module.exports = Listing;