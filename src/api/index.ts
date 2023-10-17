import axios from "axios";
import { RootState, store } from "../store";
import { setAccessToken } from "../store/Auth";
import { getRefreshToken } from "../store/Cookie";
import { clearUser } from "../store/User";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().token.accessToken;

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
      const refreshToken = getRefreshToken();
      const currentAccessToken = store.getState().token.accessToken;

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
        window.alert("다시 로그인 하세요.");
        store.dispatch(clearUser());
        window.localStorage.clear();
        const navigate = useNavigate();
        navigate("/");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
