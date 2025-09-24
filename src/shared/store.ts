import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/userInfoSlice"; // Adjust the path as needed

export const store = configureStore({
  reducer: { userInfoSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
