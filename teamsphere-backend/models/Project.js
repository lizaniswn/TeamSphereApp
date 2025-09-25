const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: String,
  owner: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', ProjectSchema);
