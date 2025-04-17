const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventcontraller');
const TokenVerify = require("../middleware/TokenIssue");

router.get('/', eventController.getAllEvents);
router.post('/join-event', TokenVerify.TokenVerify, eventController.joinEvent);
router.post('/', TokenVerify.TokenVerify, eventController.createEvent);
router.patch('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;