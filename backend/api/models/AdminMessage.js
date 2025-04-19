// models/AdminMessage.js
const mongoose = require("mongoose");

const adminMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminMessage", adminMessageSchema);
