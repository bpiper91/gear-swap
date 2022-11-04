const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
    {
        groupName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        isPublic: {
            type: Boolean,
            required: true,
            default: true
        },
        listings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ],
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        owners: 
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
    
            },
        
        admins:
            {
                type: String,
        
            },
        
        activeSwaps: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Swap'
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// get number of users
groupSchema.virtual('usersCount').get(function () {
    return this.users.length;
});

// get number of listings
groupSchema.virtual('listingsCount').get(function () {
    return this.listings.length;
});

const Group = model('Group', groupSchema);

module.exports = Group;