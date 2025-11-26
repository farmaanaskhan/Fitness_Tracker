const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }, // date of workout (use midnight UTC/local)
  exerciseName: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number }, // optional
  createdAt: { type: Date, default: Date.now }
});

WorkoutSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('Workout', WorkoutSchema);
