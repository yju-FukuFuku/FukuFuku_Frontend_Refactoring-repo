import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  email: string | null;
  picture: string | null;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean | null;
  nickName: string | null;
  introduction?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    picture: null,
    firstName: null,
    lastName: null,
    isAdmin: null,
    nickName: null,
    isLogin: false,
  } as UserState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, picture, firstName, lastName, isAdmin, nickName, introduction } = action.payload;
      state.id = id;
      state.email = email;
      state.picture = picture;
      state.firstName = firstName;
      state.lastName = lastName;
      state.isAdmin = isAdmin;
      state.nickName = nickName;
      state.introduction = introduction;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.picture = null;
      state.firstName = null;
      state.lastName = null;
      state.isAdmin = null;
      state.nickName = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

