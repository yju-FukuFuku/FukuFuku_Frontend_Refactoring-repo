import axios from 'axios';
import { store } from '../store';
import { setAccessToken } from '../store/Auth';
import { getRefreshToken } from '../store/Cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().token.accessToken;
  console.log('token', token);

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    
    originalRequest._retry = true;
    try {
      const response = await api.post('/auth/refresh', {
        refreshToken: getRefreshToken()
      }, {
        headers: {
          'Authorization': `${store.getState().token.accessToken}`
        }
      });
      const { accessToken } = response.data.data;
      store.dispatch(setAccessToken(accessToken));
      originalRequest.headers.Authorization = `${accessToken}`;
      return api(originalRequest);
    } catch (e) {
      console.error(e);
    }
  }
  return Promise.reject(error);
});

export default api;