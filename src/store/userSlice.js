import { createSlice } from "@reduxjs/toolkit";

const sessionUser = JSON.parse(window.sessionStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: sessionUser?.id || "",
    name: sessionUser?.name || "",
    isAdmin: sessionUser?.isAdmin || false,
    jwt: sessionUser?.jwt || "",
  },
  reducers: {
    setUser: (state, action) => {
      window.sessionStorage.setItem("user", JSON.stringify(action.payload));
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
      state.jwt = action.payload.jwt;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
