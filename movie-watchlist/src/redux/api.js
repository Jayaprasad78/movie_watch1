import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movie-watch2.vercel.app', // JSON Server URL
});

export default api;
