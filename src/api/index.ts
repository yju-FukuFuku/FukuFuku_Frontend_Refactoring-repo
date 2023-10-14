import axios from "axios";
import { store } from "../store";
import { deleteAccessToken, setAccessToken } from "../store/Auth";
import { getRefreshToken, removeRefreshToken } from "../store/Cookie";
import { clearUser } from "../store/User";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().token.accessToken;

  console.log(token);

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 410 && !originalRequest._retry) {
      console.log("토큰 재발급");
      const refreshToken = getRefreshToken();
      const currentAccessToken = store.getState().token.accessToken;

      console.log(refreshToken, currentAccessToken);

      originalRequest._retry = true;
      try {
        const response = await api.post(
          "/auth/refresh",
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `${currentAccessToken}`,
            },
          }
        );

        const { accessToken } = response.data.data;
        const payload = { accessToken };
        store.dispatch(setAccessToken(payload));

        originalRequest.headers.Authorization = `${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        window.alert("세션이 만료되었습니다. 다시 로그인 하세요.");
        logOut();
      }
      return Promise.reject(error);
    }
  }
);

export const logOut = () => {
  store.dispatch(clearUser());
  store.dispatch(deleteAccessToken());
  removeRefreshToken();
  window.localStorage.clear();
  window.location.href = "http://localhost:5173";
};

export const verifyUser = () => {
  api.get("auth");
};

export default api;
