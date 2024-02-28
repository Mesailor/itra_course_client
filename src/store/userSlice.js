import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
