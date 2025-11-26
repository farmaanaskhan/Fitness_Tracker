const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const gc = require('../controllers/goalController');

router.use(protect);

router.post('/', gc.createGoal);
router.get('/', gc.getGoals);
router.delete('/:id', gc.deleteGoal);

module.exports = router;
