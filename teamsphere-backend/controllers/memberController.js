const Member = require("../models/Member");

// Create Member
exports.createMember = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const member = await Member.create({ name, email, role });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Member
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Member
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    res.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};