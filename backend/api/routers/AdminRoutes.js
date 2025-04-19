const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const TokenVerify = require("../middleware/TokenIssue");

router.get('/', adminController.getAllAdmins);
router.post('/create', TokenVerify.TokenVerify, adminController.createAdmin);
router.patch('/:id', TokenVerify.TokenVerify, adminController.updateAdmin);
router.delete('/:id', TokenVerify.TokenVerify, adminController.deleteAdmin);
router.post('/check', adminController.getAdminByEmail);


module.exports = router;
