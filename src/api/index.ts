import axios from 'axios';
import { store } from '../store';
import { setAccessToken } from '../store/Auth';
import { getRefreshToken } from '../store/Cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().token.accessToken;

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

api.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 410 && !originalRequest._retry) {

    console.log("토큰 재발급");
    const refreshToken = getRefreshToken();
    const currentAccessToken = store.getState().token.accessToken;

    console.log(refreshToken, currentAccessToken);
    
    originalRequest._retry = true;
    try {
      const response = await api.post('/auth/refresh', {
        refreshToken
      }, {
        headers: {
          'Authorization': `${currentAccessToken}`
        }
      });
      
      const { accessToken } = response.data.data;
      const payload = { accessToken };
      store.dispatch(setAccessToken(payload));
      
      originalRequest.headers.Authorization = `${accessToken}`;
      return api(originalRequest);
    } catch (e) {
      console.error(e);
    }
  }
  return Promise.reject(error);
});

export default api;