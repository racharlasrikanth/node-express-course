const express = require("express");
const app = express();
const { courseList } = require("./data.js");

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1><a href='/api/courses'>courses</a>")
})

app.get("/api/courses", (req, res) => {
    const newCourses = courseList.map((eachCourse) => {
        const {id, courseName, thumbnail} = eachCourse;
        return {id, courseName, thumbnail}
    })
    res.json(newCourses)
})

app.get("/api/courses/:courseID", (req, res) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.params.courseID);
    const singleCourse = courseList.find((eachCourse) => {
        return eachCourse.id === JSON.parse(req.params.courseID);
    })
    if(!singleCourse){
        return res.status(404).send({message: "course not found"})
    }
    res.json(singleCourse)
})

app.get("/api/courses/:courseID/reviews/:reviewID", (req, res) => {
    console.log(req.params);
    res.send("hello world")
})

app.get("/api/v1/query", (req, res) => {
    // console.log(req.query);
    const {search, limit} = req.query;
    let sortedCourses = [...courseList];

    if(search){
        sortedCourses = sortedCourses.filter((eachCourse) => {
            // return eachCourse.courseName.startsWith(search);
            return eachCourse.courseName.includes(search);
        })
    }
    if(limit){
        sortedCourses = sortedCourses.slice(0, Number(limit))
    }

    if(sortedCourses.length < 1){
        // res.status(200).json({message: "no results"})
        return res.status(200).json({success: true, data: []})
    }

    res.status(200).json(sortedCourses);
})

app.listen(5000, () => {
    console.log("server listening on port 5000.....");
})