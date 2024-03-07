import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import refetchReducer from "./refetchSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    refetch: refetchReducer,
  },
});
