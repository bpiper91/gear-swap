const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        commenter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentText: {
            type: String,
            required: true,
            trim: true
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

const Comment = model('Comment', commentSchema);

module.exports = Comment;