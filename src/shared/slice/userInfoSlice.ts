import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interface";

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
});

export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// // {value: 1}
// store.dispatch(incremented());
// // {value: 2}
// store.dispatch(decremented());
// // {value: 1}
