import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interface";
import { PURGE } from "redux-persist";

type UserState = {
  userInfo: UserInfo;
};

const initialState: UserState = {
  userInfo: {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
