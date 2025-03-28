const ShareRide = require("../models/shareRide");
const RideRequest = require("../models/rideRequest");
const matchRides = require("../services/matchRides");


const setRide = async (req, res) => {
    try {
        const { userId, email,  rideType, pickupLocation, eventLocation } = req.body;

        

        if (rideType === "offer") {
          const pendingRequests = await RideRequest.find({
            matched: false,
            eventLocation: {
              type: "Point",
              coordinates: eventLocation.coordinates,
            },
            pickupLocation: {
              $nearSphere: {
                $geometry: {
                  type: "Point",
                  coordinates: pickupLocation.coordinates,
                },
                $maxDistance: 4000,
              },
            },
          });
        
          // Optional: mark them as matched
          if (pendingRequests.length > 0) {
            await RideRequest.updateMany(
              { _id: { $in: pendingRequests.map(r => r._id) } },
              { $set: { matched: true } }
            );
            return res.json({ success: true, rides: pendingRequests });
          }
        
          console.log("Matched pending requests:", pendingRequests.length);
        }

        const newRide = new ShareRide({ userId, email, rideType, pickupLocation, eventLocation });
        await newRide.save();
        

        res.json({ success: true, message: "Ride added successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const findMatchingRides = async (req, res) => {
  try {
    const { userId, email, pickupLocation, eventLocation } = req.body;

    const matches = await matchRides(pickupLocation, eventLocation);

    if (matches.length > 0) {
      return res.json({ success: true, rides: matches });
    }

    // Store unmatched ride request
    const pending = new RideRequest({
      userId,
      email,
      pickupLocation,
      eventLocation,
    });
    await pending.save();

    return res.json({ success: true, rides: [] }); // no matches now
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

  

module.exports = { setRide, findMatchingRides };