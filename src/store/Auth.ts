import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 300 * 1000;

interface AuthState {
  accessToken: string | null;
  expireTime: number;
}

export const authSlice = createSlice({
  name: "authToken",
  initialState: {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODkzMTEyOTQsImV4cCI6MTY4OTMxMTU5NH0.6zR8E_5lbu9-yhrCOwj1dN3sxlTZz-r4mv0xzkpaGzY",
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