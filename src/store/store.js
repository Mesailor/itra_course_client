import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import itemsSchemaReducer from "./itemsSchemaSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    itemsSchema: itemsSchemaReducer,
  },
});
