import { createSlice } from "@reduxjs/toolkit";
import logo from "../images/logo.png";

export type SystemState = {
  isLogin: boolean;
  logo: string;
};

const initialState: SystemState = {
  isLogin: false,
  logo: logo,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    loginAction(state) {
      state.isLogin = true;
    },
    logoutAction(state) {
      state.isLogin = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
