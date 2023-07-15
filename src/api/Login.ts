import axios, { AxiosResponse } from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";

export function onLogin() {
  console.log("onLogin");
  
  axios.get('/auth/google')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
}

export function onLoginSuccess(response : AxiosResponse) {
  const { accessToken, refreshToken } = response.data;

  setRefreshToken(refreshToken);
  store.dispatch(setAccessToken(accessToken));
}