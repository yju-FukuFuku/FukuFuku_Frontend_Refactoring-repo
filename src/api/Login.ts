import { AxiosResponse } from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";


export function onLoginSuccess(response : AxiosResponse) {
  const { accessToken, refreshToken } = response.data;

  setRefreshToken(refreshToken);
  store.dispatch(setAccessToken(accessToken));
}