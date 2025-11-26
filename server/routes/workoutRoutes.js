const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const wc = require('../controllers/workoutController');

router.use(protect);

router.post('/', wc.createWorkout);
router.get('/by-date', wc.getWorkoutsByDate);
router.get('/recent', wc.getRecentWorkouts);
router.patch('/:id', wc.updateWorkout);
router.delete('/:id', wc.deleteWorkout);

module.exports = router;
