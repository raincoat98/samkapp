import { createSlice } from "@reduxjs/toolkit";

export type SystemState = {
  isLoaded: boolean;
  isLogin: boolean;
};

const initialState: SystemState = {
  isLoaded: false,
  isLogin: false,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
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
export const { loadAction, unloadAction, loginAction, logoutAction } = actions;
export default reducer;
