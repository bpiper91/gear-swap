const mongoose = require('mongoose');

// connect to database
mongoose.connect(
    // use local machine if no production environment found
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gear-swap',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;