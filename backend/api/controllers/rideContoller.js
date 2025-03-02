const ShareRide = require("../models/shareRide");

const setRide = async (req, res) => {
    try {
        const { userId, rideType, pickupLocation, eventLocation } = req.body;

        const newRide = new ShareRide({ userId, rideType, pickupLocation, eventLocation });
        await newRide.save();

        res.json({ success: true, message: "Ride added successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { setRide };