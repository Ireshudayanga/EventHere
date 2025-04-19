// api/routers/AdminMessageRoutes.js
const express = require("express");
const router = express.Router();
const AdminMessage = require("../models/AdminMessage");

// Save admin message (POST)
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const savedMsg = await AdminMessage.create({ name, email, message });
    res.status(201).json({ message: "Message saved", data: savedMsg });
  } catch (error) {
    res.status(500).json({ message: "Error saving message", error: error.message });
  }
});

// Fetch all (for admin panel)
router.get("/", async (req, res) => {
  try {
    const messages = await AdminMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
