const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        messageText: {
            type: String,
            required: true,
            trim: true
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        relevantListing: {
            type: Schema.Types.ObjectId
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// get number of comments
messageSchema.virtual('commentsCount').get(function () {
    return this.comments.length;
});

const Message = model('Message', messageSchema);

module.exports = Message;