const Joi = require('joi');
const Workout = require('../models/Workout');

const workoutSchema = Joi.object({
  date: Joi.date().required(),
  exerciseName: Joi.string().required(),
  durationMinutes: Joi.number().integer().min(1).required(),
  calories: Joi.number().optional()
});

exports.createWorkout = async (req, res, next) => {
  try {
    const { error, value } = workoutSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const w = new Workout({
      user: req.user._id,
      date: value.date,
      exerciseName: value.exerciseName,
      durationMinutes: value.durationMinutes,
      calories: value.calories
    });
    await w.save();
    res.status(201).json(w);
  } catch (err) { next(err); }
};

exports.getWorkoutsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'date query parameter required (ISO date)' });

    const start = new Date(date);
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const items = await Workout.find({
      user: req.user._id,
      date: { $gte: start, $lt: end }
    }).sort({ createdAt: 1 });

    res.json(items);
  } catch (err) { next(err); }
};

exports.getRecentWorkouts = async (req, res, next) => {
  try {
    const items = await Workout.find({ user: req.user._id }).sort({ date: -1 }).limit(100);
    res.json(items);
  } catch (err) { next(err); }
};

exports.updateWorkout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const allowed = ['exerciseName','durationMinutes','calories','date'];
    const patch = {};
    for (const k of allowed) if (k in updates) patch[k] = updates[k];
    const w = await Workout.findOneAndUpdate({ _id: id, user: req.user._id }, patch, { new: true });
    if (!w) return res.status(404).json({ message: 'Workout not found' });
    res.json(w);
  } catch (err) { next(err); }
};

exports.deleteWorkout = async (req, res, next) => {
  try {
    const id = req.params.id;
    const w = await Workout.findOneAndDelete({ _id: id, user: req.user._id });
    if (!w) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
