const ShareRide = require("../models/shareRide");

const matchRides = async (pickupLocation, eventLocation, distance = 4000) => {
  return await ShareRide.find({
    rideType: "offer",
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // last 24 hrs
    eventLocation: {
      type: "Point",
      coordinates: eventLocation.coordinates,
    },
    pickupLocation: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: pickupLocation.coordinates },
        $maxDistance: distance,
      },
    },
  });
};

module.exports = matchRides;
