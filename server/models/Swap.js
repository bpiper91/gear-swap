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
            type: Number,
            default: 0
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
            type: Number,
            default: 0
        },
        swapMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        response: {
            type: String,
            default: 'unanswered'
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true
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