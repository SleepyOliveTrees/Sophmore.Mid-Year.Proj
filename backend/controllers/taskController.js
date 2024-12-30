const taskModel = require("../models/taskModel");

exports.getTasks = async (req, res) => {
    try {
        console.log("Received GET /api/tasks request");
        console.log("Query parameters:", req.query);

        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ error: "Start and end dates are required" });
        }

        console.log("Start date:", start);
        console.log("End date:", end);

        const tasks = await taskModel.getTasks(start, end);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

exports.createTask = async (req, res) => {
    try {
        const newTask = await taskModel.createTask(req.body);
        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskModel.updateTask(req.params.id, req.body);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update task" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const success = await taskModel.deleteTask(req.params.id);
        if (success) {
            res.json({message: "Task deleted successfully"});
        } else {
            res.status(404).json({error: "Task not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete task" });
    }
};
