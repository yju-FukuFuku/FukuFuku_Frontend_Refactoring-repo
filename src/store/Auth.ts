import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 10 * 1000; // 10초 

interface AuthState {
  accessToken: string | null;
  expireTime: number;
  isLogin: boolean;
}

type SetAccessTokenPayload = {
  accessToken: string;
};

export const authSlice = createSlice({
  name: "authToken",
  initialState: {
    accessToken: null,
    expireTime: 0,
    isLogin: false,
  } as AuthState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<SetAccessTokenPayload>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isLogin = true;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    deleteAccessToken: (state) => {
      state.accessToken = null;
      state.isLogin = false;
      state.expireTime = 0;
    }
  }
});

export const { setAccessToken, deleteAccessToken } = authSlice.actions;

export default authSlice.reducer;