import { store } from '../store';
import { refreshToken } from './useTokenRefresh';

export const tokenAccess = async () => {
  const { accessToken, expireTime } = store.getState().token;

  if (!accessToken) {
    try {
      console.log("액세스 토큰 없음");

      const newAccesToken = await refreshToken(accessToken);
      return newAccesToken;
    } catch (error) {
      console.log(error);
      return await Promise.reject();
    }
  } else if (expireTime < Date.now()) {
    try {
      console.log("액세스 토큰 만료");
      
      const newAccesToken = await refreshToken(accessToken);
      
      return newAccesToken;
    } catch (error) {
      console.log(error);
      return await Promise.reject();
    }
  }

  return accessToken;
}