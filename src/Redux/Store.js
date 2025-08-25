import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./Slices/FileSlice";
import authReducer from "./Slices/AuthSlice";

export const store = configureStore({
  reducer: {
    file: filesReducer,
    auth: authReducer,
  },
});

export default store;
