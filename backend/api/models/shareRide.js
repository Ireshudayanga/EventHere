const mongoose = require("mongoose");

const ShareRideSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  rideType: { type: String, required: true },

  pickupLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },

  eventLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },

  createdAt: { type: Date, default: Date.now }, // 👈 Timestamp
});

// 🌍 Index for Geo queries
ShareRideSchema.index({ pickupLocation: "2dsphere" });

// ⏳ TTL Index to auto-delete after 1 day
ShareRideSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours


const ShareRide = mongoose.model("ShareRide", ShareRideSchema);

module.exports = ShareRide;
