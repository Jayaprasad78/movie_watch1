import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // JSON Server URL
});

export default api;
