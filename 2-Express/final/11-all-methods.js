const express = require("express");
const app = express();
let { people } = require("./data.js");


// static assets
app.use(express.static("./methods-public"))
// parse form data
app.use(express.urlencoded({extended: false}));
// parse json
app.use(express.json())

app.get("/api/people", (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.post("/api/people", (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, msg:"please proivde value"})
    }
    res.status(201).json({success:true, person:name})
})

app.post("/api/postman/people", (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, msg:"please provide value"})
    }
    res.status(201).json({success:true, data:[...people, name]})
})

app.post("/login", (req, res) => {
    console.log(req.body);
    const {name} = req.body;

    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send("Please provide credentials")
})

app.put("/api/people/:id", (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const person = people.find((eachPerson) => eachPerson.id === Number(id));

    if(!person){
        return res.status(404).json({success:false, msg:`no person with id : ${id}`})
    }

    const newPeople = people.map((eachPerson) => {
        if(eachPerson.id === Number(id)){
            eachPerson.name = name;
        }
        return eachPerson;
    })

    res.status(200).json({success:true, data: newPeople})
})

app.delete("/api/people/:id", (req, res) => {
    const {id} = req.params;
    const newPeople = people.filter((eachPerson) => eachPerson.id !== Number(id));

    const person = people.find((eachPerson) => eachPerson.id === Number(id));

    if(!person){
        return res.status(404).json({success:false, msg:`no person with id : ${id}`})
    }

    res.status(200).json({success:true, data: newPeople})
})

app.listen(5000, () => {
    console.log("Server is listening at port 5000...");
})