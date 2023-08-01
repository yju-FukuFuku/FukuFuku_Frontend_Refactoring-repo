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
    "refreshToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY5MDg0OTg4NiwiZXhwIjoxNjkwOTM2Mjg2fQ.eufm-YCu-KHg3c7Oq2f5EUmeJYPFGZUn-p3l9GUk6Pg",
    "nickName":null,
    "accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY5MDg0OTg4NiwiZXhwIjoxNjkwOTM2Mjg2fQ._GSzle3LlcpbHiG844PMnOboqt_km9wAcZc9dX1esGQ"
  }

  const { accessToken, refreshToken } = data;

  setRefreshToken(refreshToken);
  const payload: SetAccessTokenPayload = { accessToken };
  console.log(payload);
  
  store.dispatch(setAccessToken(payload));

  store.dispatch(setUser(data));

  console.log(store.getState().user);
  
  console.log("onLoginSuccess");
  
}