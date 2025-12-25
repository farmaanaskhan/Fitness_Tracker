import API, { attachToken } from './api';

export async function login(email, password) {
  const res = await API.post('/auth/login', { email, password });
  if (res.data?.token) attachToken(res.data.token);
  return res.data;
}

export async function register(name, email, password) {
  const res = await API.post('/auth/register', { name, email, password });
  if (res.data?.token) attachToken(res.data.token);
  return res.data;
}
