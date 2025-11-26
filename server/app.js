const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const goalRoutes = require('./routes/goalRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/analysis', analysisRoutes);

// health check
app.get('/', (req, res) => res.json({ status: 'ok', time: new Date() }));

// error handler (last)
app.use(errorHandler);

module.exports = app;
