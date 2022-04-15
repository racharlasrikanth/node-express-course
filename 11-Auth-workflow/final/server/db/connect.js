const mongoose = require('mongoose');

const connectDB = (url) => {
    console.log("Connecting to DB...");
    return mongoose.connect(url);
}

module.exports = connectDB;