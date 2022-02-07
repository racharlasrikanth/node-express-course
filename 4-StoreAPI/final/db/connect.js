const mongoose = require('mongoose');

// if we use V-6 mongoose
const connectDB = (url) => {
    console.log('Connecting to DB...');
    return mongoose.connect(url)
}

// if we use V-5 Mongoose, then use below function
// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParse: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
// }

module.exports = connectDB;