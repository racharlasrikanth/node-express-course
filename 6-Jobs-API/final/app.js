require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');
const authenticateUser = require('./middlewares/authentication');


// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handlers
const notFoundErrorMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.json());

// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 7000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED TO DB...');
        app.listen(PORT, () => {
            console.log(`Server Listening at port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();