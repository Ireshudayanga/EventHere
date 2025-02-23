
const SpecialCategory = require("../models/SpecialCategory");
const Event = require('../models/EventModel');

// 🔹 Admin: Set Special Category
const setSpecialCategory = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.body;

        const previousSpecialCategory = await SpecialCategory.findOne();

        if (previousSpecialCategory) {
            console.log("Previous Special Category:", previousSpecialCategory.category);

            await Event.deleteMany({ category: previousSpecialCategory.category });
        }

        await SpecialCategory.deleteMany({});

        // Create new special category
        const newCategory = new SpecialCategory({ category, startDate, endDate });
        await newCategory.save();

        res.json({ success: true, message: "Special category set successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const getActiveSpecialCategory = async (req, res) => {
    try {
        const today = new Date();

        // Find an active special category within the date range
        const specialCategory = await SpecialCategory.findOne({
            startDate: { $lte: today },
            endDate: { $gte: today }
        });

        if (!specialCategory) {
            return res.json({ success: false, category: null });
        }

        res.json({ success: true, category: specialCategory.category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { setSpecialCategory, getActiveSpecialCategory };