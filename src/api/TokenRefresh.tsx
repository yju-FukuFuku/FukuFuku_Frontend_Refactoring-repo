import axios from "axios";
import { getRefreshToken } from "../store/Cookie";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";

export const refreshToken = async (accessToken: string | null) => {

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return Promise.reject();
  }
  
  try {
    const response = await axios.post("/auth/refresh", {
      accessToken,
    }, {
      headers: {
        Authorization: `${refreshToken}`,
      }
    });

    console.log(response);
    
    const newAccessToken = response.data
  
    store.dispatch(setAccessToken(newAccessToken));
    return accessToken; 
  } catch (error) {
    console.log(error);
    return await Promise.reject();
  }
};