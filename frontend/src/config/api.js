import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3020',
});

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response)
  ,
);

export default api;
