const { Schema, model } = require('mongoose');

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
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// get number of comments
userSchema.virtual('commentsCount').get(function () {
    return this.comments.length;
});

const Message = model('Message', messageSchema);

module.exports = Message;