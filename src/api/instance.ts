import axios from 'axios';
import { store } from '../store';

const LOCAL = 'https://k1ec344612739a.user-app.krampoline.com/api';
const Prod = '/api';
const API_URL = import.meta.env.MODE === 'development' ? LOCAL : Prod;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

const secureInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
