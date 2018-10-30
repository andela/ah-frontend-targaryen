import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ah-backend-targaryen-staging.herokuapp.com',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
