// don't use this seeds file yet

const groupSeed = require('./groupSeed.json');
const userSeeds = require('./userSeed.json');

const db = require('../config/connection');
const { Group, User, Listing, Swap, Message, Comment } = require('../models');

db.once('open', async () => {
    try {
        // delete existing data
        await Comment.deleteMany({});
        await Message.deleteMany({});
        await Swap.deleteMany({});
        await Listing.deleteMany({});
        await Group.deleteMany({});
        await User.deleteMany({});

        // re-seed Group and Users
        await User.create(userSeeds);
        await Group.create(groupSeed);

    } catch (err) {
        console.error(err);
        process.exit(1);
    };

    console.log('Done seeding database');
    process.exit(0);
});