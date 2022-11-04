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
        owners: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }   
        ],
        admins: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
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

// check to see if the user has owner permissions for the group
userSchema.methods.isOwner = async function (userId) {
    const match = this.owners.filter(user => user === userId);
    if (match.length) {
        return true;
    } else {
        return false;
    };
};

// check to see if the user has admin permissions for the group
userSchema.methods.isAdmin = async function (userId) {
    const match = this.admins.filter(user => user === userId);
    if (match.length) {
        return true;
    } else {
        return false;
    };
};

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