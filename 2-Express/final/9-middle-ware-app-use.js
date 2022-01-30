const express = require("express");
const app = express();
const logger = require("./logger.js")

// req => middleware => res

// all middleware functions should be use on top
// app.use path is optional, if you provide path it will execute when it satisy that path
app.use("/api", logger)

app.get("/", (req, res) => {
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