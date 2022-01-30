const express = require("express");
const app = express();

const peopleRouter = require("./routes/people.js");
const loginRouter = require("./routes/auth.js");


// static assets
app.use(express.static("./methods-public"))
// parse form data
app.use(express.urlencoded({extended: false}));
// parse json
app.use(express.json())
// for peopleRouter
app.use("/api/people", peopleRouter);
// for login router
app.use("/login", loginRouter)



app.listen(5000, () => {
    console.log("Server is listening at port 5000...");
})