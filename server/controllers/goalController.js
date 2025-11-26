const Joi = require('joi');
const Goal = require('../models/Goal');

const schema = Joi.object({
  type: Joi.string().valid('weight','minutes','calories').required(),
  targetValue: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
});

exports.createGoal = async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const goal = new Goal({ user: req.user._id, ...value });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) { next(err); }
};

exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) { next(err); }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const id = req.params.id;
    const g = await Goal.findOneAndDelete({ _id: id, user: req.user._id });
    if (!g) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
