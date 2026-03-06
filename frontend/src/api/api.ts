import axios from 'axios';

const TOKEN_KEY = 'access_token';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  async register(username: string, password: string) {
    const res = await api.post('/auth/register', { username, password });
    localStorage.setItem(TOKEN_KEY, res.data.access_token as string);
    return res.data;
  },
  async login(username: string, password: string) {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem(TOKEN_KEY, res.data.access_token as string);
    return res.data;
  },
  async me() {
    const res = await api.get('/me');
    return res.data;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default api;
