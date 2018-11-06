import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://ah-backend-targaryen-staging.herokuapp.com',
  baseURL: 'http://127.0.0.1:8000',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
