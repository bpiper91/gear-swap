const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        location: {
            type: String
        },
        listings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ],
        activeSwaps: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Swap'
            }
        ],
        completedSwaps: {
            type: Number
        },
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

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// get number of active listings
userSchema.virtual('listingCount').get(function () {
    return this.listings.length;
});

// get number of active swap proposals
userSchema.virtual('activeSwapsCount').get(function () {
    return this.activeSwaps.length;
});

const User = model('User', userSchema);

module.exports = User;