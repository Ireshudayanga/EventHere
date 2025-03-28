const mongoose = require("mongoose");

const RideRequestSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },

  pickupLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },

  eventLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },

  createdAt: { type: Date, default: Date.now },
  matched: { type: Boolean, default: false },
});

RideRequestSchema.index({ pickupLocation: "2dsphere" });

module.exports = mongoose.model("RideRequest", RideRequestSchema);
