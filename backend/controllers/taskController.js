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
