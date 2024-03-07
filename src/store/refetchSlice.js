import { createSlice } from "@reduxjs/toolkit";

const refetchSlice = createSlice({
  name: "refetch",
  initialState: {
    trigger: 0,
  },
  reducers: {
    triggerRefetch: (state, action) => {
      state.trigger++;
    },
  },
});

export const { triggerRefetch } = refetchSlice.actions;

export default refetchSlice.reducer;
