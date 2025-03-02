const express = require('express');
const router = express.Router();
const shareRideController = require('../controllers/rideContoller')

router.post('/set-ride',shareRideController.setRide );

module.exports = router;