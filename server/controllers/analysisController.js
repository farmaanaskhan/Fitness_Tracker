const Workout = require('../models/Workout');
const mongoose = require('mongoose');

exports.summary = async (req, res, next) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user._id);

    // total minutes per day (last 30 days)
    const last30 = await Workout.aggregate([
      { $match: { user: userId, date: { $gte: new Date(Date.now() - 1000*60*60*24*30) } } },
      { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        totalMinutes: { $sum: "$durationMinutes" },
        totalCalories: { $sum: { $ifNull: ["$calories", 0] } },
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);

    // longest single workout ever
    const longest = await Workout.findOne({ user: userId }).sort({ durationMinutes: -1 }).limit(1);

    // most active day (by minutes)
    const mostActiveAgg = await Workout.aggregate([
      { $match: { user: userId } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, totalMinutes: { $sum: "$durationMinutes" } }},
      { $sort: { totalMinutes: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      last30,
      longest: longest || null,
      mostActiveDay: mostActiveAgg[0] || null
    });
  } catch (err) { next(err); }
};
