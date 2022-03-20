require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// rest of the packages
const morgan = require('morgan');

// database
const connectDB = require('./db/connect');

// middleware
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(morgan('tiny'));
// access json data from req.body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('e-commerce api')
})

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED');
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();