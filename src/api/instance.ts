import axios from 'axios';
import { store } from '@/store';

export const API_URL = 'https://api.sumbisori.site/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const secureInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

secureInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const userId = state.user?.userId;
    if (userId) {
      config.headers['userId'] = userId;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { instance, secureInstance };
