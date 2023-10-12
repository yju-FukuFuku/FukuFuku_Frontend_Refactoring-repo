import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/Auth";
import { setRefreshToken } from "../store/Cookie";
import { setUser } from "../store/User";

interface SetAccessTokenPayload {
  accessToken: string;
}

interface User {
  id: number;
  email: string;
  picture: string;
  firstName: string;
  lastName: string;
  isAdmin: null;
  refreshToken: string;
  nickName: null;
  accessToken: string;
}

export async function login(credential: string | undefined) {
  await axios
    .post("/auth", {
      credential,
    })
    .then(({ data }) => onLoginSuccess(data))
    .catch(({ response }) => {
      alert(response.data.message);
    });
}

function onLoginSuccess(data: User) {
  const { accessToken, refreshToken } = data;

  setRefreshToken(refreshToken);
  const payload: SetAccessTokenPayload = { accessToken };

  store.dispatch(setAccessToken(payload));

  store.dispatch(setUser(data));
}

export function onLogin() {
  // 로컬 스토리지에서 user 정보 가져오기
  const user = localStorage.getItem("user");

  if (user) {
    const data = JSON.parse(user);
    const { accessToken, refreshToken } = data;

    setRefreshToken(refreshToken);
    const payload: SetAccessTokenPayload = { accessToken };

    store.dispatch(setAccessToken(payload));
    store.dispatch(setUser(data));
  }
}
