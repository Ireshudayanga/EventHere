const mongoose = require("mongoose");

const SpecialCategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model("SpecialCategory", SpecialCategorySchema);
