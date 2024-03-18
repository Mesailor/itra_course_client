import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import refetchReducer from "./refetchSlice";
import recentCollIdsReducer from "./recentCollIdsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    refetch: refetchReducer,
    recentCollIds: recentCollIdsReducer,
  },
});
