import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";
import { setUser } from "../store/User";

interface SetAccessTokenPayload {
  accessToken: string;
}

export function onLoginSuccess() {
  const data = {
    "id":1,
    "email":"hetame@g.yju.ac.kr",
    "picture":"https://lh3.googleusercontent.com/a/AAcHTtfpGQDOXCwRj2W5vM44gbITs8mLO23tR3mtFEdBFupc=s96-c",
    "firstName":"김",
    "lastName":"지훈",
    "isAdmin":null,
    "refreshToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY4OTU3NjkyMCwiZXhwIjoxNjg5NjYzMzIwfQ.1jtoXBWwQS1zBUw843qI5e337MFsRymR7iUbIJqNGJ0",
    "nickName":null,
    "accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhldGFtZUBnLnlqdS5hYy5rciIsImlhdCI6MTY4OTU3NjkyMCwiZXhwIjoxNjg5NTc3MjIwfQ.fJ6sCcOE8FmRGbe8AgofExU7JTfFSvgz62e1cMpIaPk"
  }

  const { accessToken, refreshToken } = data;

  setRefreshToken(refreshToken);
  const payload: SetAccessTokenPayload = { accessToken };
  store.dispatch(setAccessToken(payload));

  store.dispatch(setUser(data));

  console.log(store.getState().user);
  
  console.log("onLoginSuccess");
  
}