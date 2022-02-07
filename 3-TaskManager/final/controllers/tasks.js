const Task = require("./../models/Task");
const asyncWrapper = require("./../middleware/async");


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks, status: true });
})

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task, status: true, message: "task created"})
    } catch (error) {
        res.status(500).json({ status: false, message: error})
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });

        if(!task){
            return res.status(404).json({ message: `No Task found with id: ${taskID}`, status: true })
        }

        res.status(200).json({ task, status: true });
    } catch (error) {
        res.status(500).json({ status: false, message: error})
    }
}


const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });

        if(!task){
            return res.status(404).json({ message: `No Task found with id: ${taskID}`, status: true })
        }

        res.status(200).json({ task, status: true, message: "task deleted" });

    } catch (error) {
        res.status(500).json({ status: false, message: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;

        const task = await Task.findOneAndUpdate({ _id:taskID }, req.body);

        if(!task){
            return res.status(404).json({ message: `No Task found with id: ${taskID}`, status: true })
        }
        
        res.status(200).json({id:taskID}, req.body, {
            new:true, runValidators:true
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}