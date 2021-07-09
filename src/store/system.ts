import { createSlice } from "@reduxjs/toolkit";

export type SystemState = {
  isDarkTheme: boolean;
  isLogin: boolean;
};

const initialState: SystemState = {
  isDarkTheme: false,
  isLogin: false,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkThemeAction(state, colorMode) {
      const isDarkTheme = colorMode.payload === "light" ? false : true;
      state.isDarkTheme = isDarkTheme;
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
