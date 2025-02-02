const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();

// gets all tasks
router.get("/tasks", taskController.getTasks);
// adds new task
router.post("/tasks", taskController.createTask);
// removes a task
router.delete("/tasks/:id", taskController.deleteTask);
// updates a task
router.put("/tasks/:id", taskController.updateTask);

module.exports=router;