
const Event = require('../models/EventModel');

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
        console.log("🚀 Incoming Event Data:", req.body);

        // Ensure required fields exist
        if (!req.body.title || !req.body.date || !req.body.location || !req.body.organizer) {
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
    const { id: _id } = req.params;
    const event = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No event with that id');

    const updatedEvent = await Event.findByIdAndUpdate(_id, { ...event, _id }, { new: true });
    res.json(updatedEvent);
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No event with that id');

    await Event.findByIdAndRemove(id);
    res.json({ message: 'Event deleted successfully' });
}

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };

