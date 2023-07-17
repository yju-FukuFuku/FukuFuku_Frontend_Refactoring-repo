import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  const expires = new Date(Date.now() + 3600 * 1000);

  cookies.set("refreshToken", refreshToken, {
    expires,
  });
}

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
}

export const removeRefreshToken = () => {
  cookies.remove("refreshToken");
}

