require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handlers
const notFoundErrorMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.json());

// extra packages

// routes
app.use("/", (req, res) => {
    res.send('jobs api');
})

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 7000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server Listening at port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();