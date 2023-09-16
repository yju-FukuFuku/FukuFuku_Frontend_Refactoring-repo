import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";
import { setUser } from "../store/User";

interface SetAccessTokenPayload {
  accessToken: string;
}

export async function login() {
  return await axios.get('/auth')
  .then((res) => {
    console.log(res);
  })
}

export function onLoginSuccess() {
  const data = {
    "id": 2,
    "email":"user1@example.com",
    "picture":"https://lh3.googleusercontent.com/a/AAcHTtfpGQDOXCwRj2W5vM44gbITs8mLO23tR3mtFEdBFupc=s96-c",
    "firstName":"김",
    "lastName":"지훈",
    "isAdmin":null,
    "refreshToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlkIjoyLCJpYXQiOjE2OTExNTAyMDYsImV4cCI6MTY5MTIzNjYwNn0.MgSMWMivXj8Y-0_lb25dAwMFmbSJw6AV6i16H1MvGDc",
    "nickName":null,
    "accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlkIjoyLCJpYXQiOjE2OTExNTAyMDYsImV4cCI6MTY5MTIzNjYwNn0.lhDiK2MmRLeP6WbvR0RR-n3zvIB5yOcXg2a-eFflR4s"
  }

  const { accessToken, refreshToken } = data;

  setRefreshToken(refreshToken);
  const payload: SetAccessTokenPayload = { accessToken };
  
  store.dispatch(setAccessToken(payload));

  store.dispatch(setUser(data));

}

export function onLogin() {
  // 로컬 스토리지에서 user 정보 가져오기
  const user = localStorage.getItem('user');

  if (user) {
    const data = JSON.parse(user);
    const { accessToken, refreshToken } = data;

    setRefreshToken(refreshToken);
    const payload: SetAccessTokenPayload = { accessToken };
    
    store.dispatch(setAccessToken(payload));
    store.dispatch(setUser(data));
  }
}