import API from './api';
export const createGoal = (payload) => API.post('/goals', payload);
export const getGoals = () => API.get('/goals');
export const deleteGoal = (id) => API.delete(`/goals/${id}`);
