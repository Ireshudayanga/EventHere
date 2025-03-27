const express = require("express");
const router = express.Router();
const { setRide, findMatchingRides } = require("../controllers/shareRideController");

router.post("/set-ride", setRide);
router.post("/find-matches", findMatchingRides);

module.exports = router;
