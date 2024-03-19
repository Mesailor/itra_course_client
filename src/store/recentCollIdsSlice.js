import { createSlice } from "@reduxjs/toolkit";

const recentSessionIds = JSON.parse(window.sessionStorage.getItem("recentIds"));

const recentCollIdsSlice = createSlice({
  name: "recentCollIds",
  initialState: recentSessionIds || [],
  reducers: {
    insertRecentId: (state, action) => {
      if (state[0] === action.payload) return;
      if (state.includes(action.payload)) {
        const index = state.findIndex((value) => value === action.payload);
        state.splice(index, 1);
        state.unshift(action.payload);
      } else {
        state.unshift(action.payload);
      }
      state.splice(5);
      const stateCopy = { ...state };
      window.sessionStorage.setItem(
        "recentIds",
        JSON.stringify(Object.values(stateCopy))
      );
    },
    resetRecentIds: (state) => {
      state.splice(0);
      window.sessionStorage.setItem("recentIds", JSON.stringify([]));
    },
  },
});

export const { insertRecentId, resetRecentIds } = recentCollIdsSlice.actions;

export default recentCollIdsSlice.reducer;
