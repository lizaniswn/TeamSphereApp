const express = require("express");
const router = express.Router();
const {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember
} = require("../controllers/memberController");

router.post("/", createMember);      // Create
router.get("/", getMembers);         // Read All
router.get("/:id", getMember);       // Read One
router.put("/:id", updateMember);    // Update
router.delete("/:id", deleteMember); // Delete

module.exports = router;


