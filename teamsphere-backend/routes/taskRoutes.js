const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", createTask);      // Create
router.get("/", getTasks);         // Read All
router.get("/:id", getTask);       // Read One
router.put("/:id", updateTask);    // Update
router.delete("/:id", deleteTask); // Delete

module.exports = router;
