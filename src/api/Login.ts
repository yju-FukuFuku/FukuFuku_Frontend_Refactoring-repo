import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";
import { setUser } from "../store/User";

interface SetAccessTokenPayload {
  accessToken: string;
}

export async function login() {
  return await axios.get('auth')
}

export function onLoginSuccess() {
  const data = {
    "id":1,
    "email":"user1@example.com",
    "picture":"https://lh3.googleusercontent.com/a/AAcHTtfpGQDOXCwRj2W5vM44gbITs8mLO23tR3mtFEdBFupc=s96-c",
    "firstName":"김",
    "lastName":"지훈",
    "isAdmin":null,
    "refreshToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY5MDg4OTgxMCwiZXhwIjoxNjkwOTc2MjEwfQ.ODaD4MN5AdDOpnhCmJFSO4cOh1AhG5PV_fxx9fgEiJQ",
    "nickName":null,
    "accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY5MDg4OTgxMCwiZXhwIjoxNjkwOTc2MjEwfQ.WI-Ta8buodk_5zqlgC2ieZ5vMPM8tNUFfmFMfcjhZVs"
  }

  const { accessToken, refreshToken } = data;

  setRefreshToken(refreshToken);
  const payload: SetAccessTokenPayload = { accessToken };
  
  store.dispatch(setAccessToken(payload));

  store.dispatch(setUser(data));
  
  console.log("onLoginSuccess");
  
}