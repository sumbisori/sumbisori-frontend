import axios from 'axios';

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

export { instance };
