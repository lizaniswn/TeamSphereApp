// Invite Member to Project
exports.inviteMemberToProject = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: memberId } },
      { new: true }
    ).populate({ path: 'members', select: 'name' });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Project
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
     .populate({ path: 'members', select: 'name' })
     .populate({ 
       path: 'tasks', 
       select: 'title description status dueDate createdAt updatedAt'
     });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: "Project not found" });
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Move Task Between Projects
exports.moveTaskToProject = async (req, res) => {
  const { taskId, fromProjectId } = req.body;
  const { toProjectId } = req.params;
  try {
    // Remove task from source project
    await Project.findByIdAndUpdate(fromProjectId, {
      $pull: { tasks: taskId }
    });
    // Add task to target project
    await Project.findByIdAndUpdate(toProjectId, {
      $addToSet: { tasks: taskId }
    });
    res.json({ success: true, message: "Task moved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};