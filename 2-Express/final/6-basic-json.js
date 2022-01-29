const express = require("express");
const app = express();
const { courseList } = require("./data.js");


app.get("/", (req, res) => {
    res.json(courseList);
})


app.listen(5000, () => {
    console.log("server is listeninng on port 5000...");
})