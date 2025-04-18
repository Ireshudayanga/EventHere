const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventcontraller');
const TokenVerify = require("../middleware/TokenIssue");

router.get('/', eventController.getAllEvents);
router.post('/join-event', TokenVerify.TokenVerify, eventController.joinEvent);
router.post('/joined', TokenVerify.TokenVerify, eventController.getJoinEventByEmail);
router.post('/', TokenVerify.TokenVerify, eventController.createEvent);
router.patch('/:id', TokenVerify.TokenVerify, eventController.updateEvent);
router.delete('/:id', TokenVerify.TokenVerify, eventController.deleteEvent);


module.exports = router;