require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middlewares
app.use(express.static('./public'));
app.use(express.json());


app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;


const start = async () => {
    try {
        // db connection
        app.listen(port, () => {
            console.log(`Server listening at port: ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();