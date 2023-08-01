import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  const today = new Date();
  const expires = today.setDate(today.getDate() + 30);

  return cookies.set("refreshToken", refreshToken, {
    path: "/",
    expires: new Date(expires),
  });
}

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
}

export const removeRefreshToken = () => {
  cookies.remove("refreshToken");
}

