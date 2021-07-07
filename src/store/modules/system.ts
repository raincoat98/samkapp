import { createSlice } from "@reduxjs/toolkit";
  
export type SystemState = {
  isDarkTheme: boolean;
  isLoaded: boolean;
  isLogin: boolean;
};

const initialState: SystemState = {
  isDarkTheme: false,
  isLoaded: false,
  isLogin: false,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkThemeAction(state, colorMode) {
      const isDarkTheme = colorMode.payload === "light" ? true : false
      state.isDarkTheme = isDarkTheme
    },
    loadAction(state) {
      state.isLoaded = true;
    },
    unloadAction(state) {
      state.isLoaded = false;
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
export const { toggleDarkThemeAction, loadAction, unloadAction, loginAction, logoutAction } = actions;
export default reducer;