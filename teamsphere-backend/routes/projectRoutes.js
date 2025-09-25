const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  inviteMemberToProject,
  moveTaskToProject
} = require("../controllers/projectController");

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Projects API is running", timestamp: new Date().toISOString() });
});

router.post("/", createProject);      // Create
router.get("/", getProjects);         // Read All
router.get("/:id", getProject);       // Read One
router.put("/:id", updateProject);    // Update
router.delete("/:id", deleteProject); // Delete

// Invite member to project
router.post("/:projectId/invite", inviteMemberToProject);

// Move task between projects
router.post('/:toProjectId/tasks', moveTaskToProject);

module.exports = router;