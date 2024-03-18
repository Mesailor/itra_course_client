import { createSlice } from "@reduxjs/toolkit";

const recentCollIdsSlice = createSlice({
  name: "recentCollIds",
  initialState: [],
  reducers: {
    insertRecentId: (state, action) => {
      state.splice(5);
      if (state[0] === action.payload) return;
      if (state.includes(action.payload)) {
        const index = state.findIndex((value) => value === action.payload);
        state.splice(index, 1);
        state.unshift(action.payload);
      } else {
        state.unshift(action.payload);
      }
    },
  },
});

export const { insertRecentId } = recentCollIdsSlice.actions;

export default recentCollIdsSlice.reducer;
