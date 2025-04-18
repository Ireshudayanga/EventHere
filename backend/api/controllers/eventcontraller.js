const mongoose = require('mongoose');
const Event = require('../models/EventModel');
const JointEvent = require('../models/joinEvents');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createEvent = async (req, res) => {
    try {
        //console.log("🚀 Incoming Event Data:", req.body);

        // Ensure required fields exist
        if (!req.body.title || !req.body.date || !req.body.location) {
            console.log("🚨 Missing required fields!");
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newEvent = new Event(req.body);
        console.log("📝 Attempting to Save Event to MongoDB...");

        const savedEvent = await newEvent.save();
        console.log("✅ Event Successfully Saved to DB:", savedEvent);

        res.status(201).json({ message: "Event created successfully", data: savedEvent });
    } catch (error) {
        console.error("🚨 MongoDB Save Error:", error);
        res.status(500).json({ message: "Event creation failed", error: error.message });
    }
};


const updateEvent = async (req, res) => {
    //console.log("🚀 Incoming Update Data:", req.body);
    const { id: _id } = req.params;
    const event = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No event with that id');

    const updatedEvent = await Event.findByIdAndUpdate(_id, { ...event, _id }, { new: true });
    res.json(updatedEvent);
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No event with that id");
    }
  
    try {
      await Event.findByIdAndDelete(id); // ✅ correct method
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Server error while deleting event" });
    }
  };
  

const joinEvent = async (req, res) => {
    try {
        console.log("🚀 Incoming Join Data:", req.body);
        const { email, eventid } = req.body;

        // Check if this user has already joined this event
        const alreadyJoined = await JointEvent.findOne({ email, eventid });

        if (alreadyJoined) {
            return res.status(400).json({
                message: "You have already joined this event.",
            });
        }

        // If not, save the new join record
        const newJoin = new JointEvent(req.body);
        const savedJoin = await newJoin.save();

        return res.status(201).json({
            message: "Successfully joined the event!",
            data: savedJoin,
        });
    } catch (error) {
        console.error("❌ Join Event Error:", error.message);
        return res.status(500).json({
            message: "Server error while joining event",
            error: error.message,
        });
    }
};


module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent, joinEvent };

