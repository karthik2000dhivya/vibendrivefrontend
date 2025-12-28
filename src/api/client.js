import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.viben-drive.com',
});

// Add a request interceptor to include the token in every call
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;