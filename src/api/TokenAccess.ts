import { store } from '../store';
import getNewAccessToken from './TokenRefresh';

const getAccessToken = () => {
  const { accessToken, expireTime } = store.getState().token;
  console.log(accessToken);
  
  const now = new Date().getTime();

  console.log(now > expireTime ? '만료' : '유효');
  
  if (!accessToken || now > expireTime) {
    console.log('getNewAccessToken');
      
    const newAcccessToken = getNewAccessToken(accessToken);

    if (!newAcccessToken) {
      return null;
    }

    return newAcccessToken;
  }

  return accessToken;

}

export default getAccessToken;