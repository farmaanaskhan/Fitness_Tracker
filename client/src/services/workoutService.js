import API from './api';

export const createWorkout = (payload) => API.post('/workouts', payload);
export const getWorkoutsByDate = (date) => API.get('/workouts/by-date', { params: { date } });
export const getRecentWorkouts = () => API.get('/workouts/recent');
export const updateWorkout = (id, patch) => API.patch(`/workouts/${id}`, patch);
export const deleteWorkout = (id) => API.delete(`/workouts/${id}`);
