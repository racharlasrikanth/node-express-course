const mongoose = require('mongoose');

const connectDb = (url) => {
    console.log('Connecting to DB...');
    return mongoose.connect(url);
}

module.exports = connectDb;