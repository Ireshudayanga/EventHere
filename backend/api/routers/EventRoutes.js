const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventcontraller');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.patch('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;