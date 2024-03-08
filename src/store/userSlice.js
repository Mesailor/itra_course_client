import { createSlice } from "@reduxjs/toolkit";

const sessionUser = JSON.parse(window.sessionStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: sessionUser?.id || "",
    name: sessionUser?.name || "",
    isAdmin: sessionUser?.isAdmin || false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
