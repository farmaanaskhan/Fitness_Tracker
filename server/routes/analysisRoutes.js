const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const ac = require('../controllers/analysisController');

router.use(protect);

router.get('/summary', ac.summary);

module.exports = router;
