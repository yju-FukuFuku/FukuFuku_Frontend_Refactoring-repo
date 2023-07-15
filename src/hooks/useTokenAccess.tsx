import { store } from '../store';
import { refreshToken } from './useTokenRefresh';

export const tokenAccess = () => {
  const { accessToken } = store.getState().token;

  const getAccessToken = async () => {
    if (!accessToken) {
      try {
        await refreshToken();
        return accessToken;
      } catch (error) {
        console.log(error);
        return await Promise.reject();
      }
    }
  };

  return accessToken;
}