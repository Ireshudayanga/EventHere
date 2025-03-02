const mongoose = require("mongoose");

const ShareRideSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    rideType: { type: String, required: true },

    pickupLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
    },

    eventLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
    },
});


ShareRideSchema.index({ pickupLocation: "2dsphere" });

const ShareRide = mongoose.model("ShareRide", ShareRideSchema);
module.exports = ShareRide;
