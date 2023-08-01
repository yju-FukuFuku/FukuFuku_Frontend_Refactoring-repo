import { store } from '../store';
import { refreshToken } from './TokenRefresh';

export const tokenAccess = async () => {

  const { accessToken, expireTime } = store.getState().token;
  console.log(accessToken);
  console.log(expireTime);
  console.log(new Date().getTime());
  
  if (!accessToken) {
    console.log("토큰이 없습니다.");
    
    refreshToken(accessToken);
  }
  else if (expireTime && expireTime > new Date().getTime()) {
    console.log("토큰이 만료되었습니다.");

    refreshToken(accessToken);
  } else {
    console.log("토큰이 유효합니다.");
  }

  return accessToken;
}