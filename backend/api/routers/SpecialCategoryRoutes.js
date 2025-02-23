const express = require('express');
const router = express.Router();
const userController = require('../controllers/specialCategoryContoller')

router.post('/set', userController.setSpecialCategory);
router.get('/active', userController.getActiveSpecialCategory);

module.exports = router;