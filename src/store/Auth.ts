import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 300 * 1000;

interface AuthState {
  accessToken: string | null;
  expireTime: number;
}

export const authSlice = createSlice({
  name: "authToken",
  initialState: {
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODk0MDEyNTIsImV4cCI6MTY4OTQwMTU1Mn0.h_CmulTQcCaGX_RyrizcfYA1ZWvncFQ4Dmox74FqJ30",
    expireTime: 0,
  } as AuthState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    }
  }
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;