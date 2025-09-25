const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Member name is required"],
  },
  email: {
    type: String,
    required: [true, "Member email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  }
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);