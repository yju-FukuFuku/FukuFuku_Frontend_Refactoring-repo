import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { getRefreshToken } from "../store/Cookie";

export const refreshToken = async () => {

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return Promise.reject();
  }

  try {
    const response = await axios.post("/auth/refresh");
    const { accessToken } = response.data;
    store.dispatch(setAccessToken(accessToken));
    return await Promise.resolve();
  } catch (error) {
    console.log(error);
    return await Promise.reject();
  }
};