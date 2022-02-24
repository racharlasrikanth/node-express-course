require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// database
const connectDB = require("./db/connect");

// product routers
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FIle upload");
})

app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("CONNECTED..");

        app.listen(PORT, () => {
            console.log(`Server is listening on PORT: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();