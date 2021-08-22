import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logo from "images/logo.png";

type colorType = { light: string; dark: string };

export type SystemState = {
  isProgress: boolean;
  appName: string;
  logo: string;
  color: {
    background: colorType;
    backgroundSelected: colorType;
  };
};

const initialState: SystemState = {
  isProgress: false,
  appName: "SamKapp",
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
    openProgress(state, action: PayloadAction<boolean>) {
      state.isProgress = true;
    },
    closeProgress(state, action: PayloadAction<boolean>) {
      state.isProgress = false;
    },
  },
});

const { reducer, actions } = userSlice;
export const { openProgress, closeProgress } = actions;
export default reducer;
