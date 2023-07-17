import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { getRefreshToken } from "../store/Cookie";

export const refreshToken = async (accessToken: string | null) => {

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return Promise.reject();
  }
  
  try {
    const response = await axios.post("/auth/refresh", {
      refreshToken,
    }, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    console.log(response);
  
    // store.dispatch(setAccessToken(accessToken));
    // return accessToken; 
  } catch (error) {
    console.log(error);
    return await Promise.reject();
  }
};