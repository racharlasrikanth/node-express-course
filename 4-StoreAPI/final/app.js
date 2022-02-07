require('dotenv').config();
// async errors
require("express-async-errors");


const express = require('express');
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">navigate to products</a>')
})

app.use('/api/v1/products', productsRouter);


// products route


app.use(errorMiddleware);
app.use(notFoundMiddleware);


const port = process.env.PORT || 7000;

const start = async () => {
    try {
        // connect db
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED to DB...');
        app.listen(port, () => {
            console.log(`Server Listining at port: ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();