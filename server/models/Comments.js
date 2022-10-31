const { Schema, model } = require('mongoose');

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
        }
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;