const express = require("express");
const app = express();
const logger = require("./logger.js");
const authorize = require("./authorize.js");

// req => middleware => res

// 1. use vs route
// 2. options - our own / express / third party(morgan)

// all middleware functions should be use on top
// app.use path is optional, if you provide path it will execute when it satisy that path
app.use([logger, authorize]);

app.get("/", (req, res) => {
    console.log(req.user);
    res.send("HOME")
})

app.get("/about", (req, res) => {
    res.send("/ABOUT")
})

app.get("/api/courses", (req, res) => {
    res.send("COURSES")
})

app.get("/api/items", (req, res) => {
    res.send("/ITEMS")
})

app.listen(5000, () => {
    console.log("Server is listening at port 5000...");
})