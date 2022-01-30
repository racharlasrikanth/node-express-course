let { people } = require("./../data.js");

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}

const createPerson = (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, msg:"please proivde value"})
    }
    res.status(201).json({success:true, person:name})
}

const createPersonPostman = (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, msg:"please provide value"})
    }
    res.status(201).json({success:true, data:[...people, name]})
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
    const {id} = req.params;
    const newPeople = people.filter((eachPerson) => eachPerson.id !== Number(id));

    const person = people.find((eachPerson) => eachPerson.id === Number(id));

    if(!person){
        return res.status(404).json({success:false, msg:`no person with id : ${id}`})
    }

    res.status(200).json({success:true, data: newPeople})
}

module.exports = {getPeople, createPerson, createPersonPostman, updatePerson, deletePerson}