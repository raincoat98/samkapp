import { createSlice } from "@reduxjs/toolkit";
import logoNormal from "../images/logo.png";
import logoWhite from "../images/logo-white.png";

export type SystemState = {
  isDarkTheme: boolean;
  isLogin: boolean;
  logo: string;
};

const initialState: SystemState = {
  isDarkTheme: false,
  isLogin: false,
  logo: logoNormal,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkThemeAction(state, colorMode) {
      const isDarkTheme = colorMode.payload === "light" ? false : true;
      state.isDarkTheme = isDarkTheme;
      if (!isDarkTheme) {
        state.logo = logoNormal;
      } else {
        state.logo = logoWhite;
      }
    },
    loginAction(state) {
      state.isLogin = true;
    },
    logoutAction(state) {
      state.isLogin = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const { toggleDarkThemeAction, loginAction, logoutAction } = actions;
export default reducer;
