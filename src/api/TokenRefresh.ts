import axios from "axios";
import { getRefreshToken } from "../store/Cookie";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";

interface SetAccessTokenPayload {
  accessToken: string;
}

const getNewAccessToken = async (nowAccessToken: string | null) => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post('/auth/refresh', {
      refreshToken
    }, {
      headers: {
        'Authorization': `${nowAccessToken}`
      }
    });

    console.log(response);

    const accessToken = response.data.data.accessToken;
    const payload: SetAccessTokenPayload = { accessToken };
    store.dispatch(setAccessToken(payload));
    return accessToken;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

export default getNewAccessToken;