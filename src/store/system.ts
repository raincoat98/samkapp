import { createSlice } from "@reduxjs/toolkit";
import logo from "../images/logo.png";

type colorType = { light: string; dark: string };

export type SystemState = {
  isLogin: boolean;
  logo: string;
  color: {
    background: colorType;
    backgroundSelected: colorType;
  };
};

const initialState: SystemState = {
  isLogin: false,
  logo: logo,
  color: {
    background: { light: "white", dark: "gray.800" },
    backgroundSelected: { light: "gray.100", dark: "gray.700" },
  },
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
