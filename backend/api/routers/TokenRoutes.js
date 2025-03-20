const express = require('express');
const router = express.Router();
const TokenIssue = require('../middleware/TokenIssue');

router.post('/', TokenIssue.TokenIssue )

module.exports = router;