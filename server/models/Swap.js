const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            type: Number
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
            type: Number
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
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Swap = model('Swap', swapSchema);

module.exports = Swap;