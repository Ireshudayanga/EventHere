const mongoose = require("mongoose");

const adminMessageSchema = new mongoose.Schema({
  name: String,
  email: String, // senderId (admin or user)
  receiverId: String, // 👈 NEW: store the recipient ID for better filtering
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminMessage", adminMessageSchema);
