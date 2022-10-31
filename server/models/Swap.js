const { Schema, model } = require('mongoose');

const swapSchema = new Schema(
    {
        proposer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        proposerListings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ],
        proposerCash: {
            type: Int
        },
        responder: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        responderListings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ],
        responderCash: {
            type: Int
        },
        swapMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        },
        isActive: {
            type: Boolean
        },
        isCompleted: {
            type: Boolean
        }
    }
);

const Swap = model('Swap', swapSchema);

module.exports = Swap;