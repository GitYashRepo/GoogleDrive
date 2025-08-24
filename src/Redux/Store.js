import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./Slices/fileSlice";
import authReducer from "./Slices/adminSlice";

export const store = configureStore({
  reducer: {
    file: filesReducer,
    auth: authReducer,
  },
});

export default store;
