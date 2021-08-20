import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logo from "images/logo.png";

type colorType = { light: string; dark: string };

export type SystemState = {
  isProgress: boolean;
  credentials: RealmWeb.Credentials | null;
  appName: string;
  logo: string;
  color: {
    background: colorType;
    backgroundSelected: colorType;
  };
};

const initialState: SystemState = {
  isProgress: false,
  credentials: null,
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
    setCredentials(state, action: PayloadAction<RealmWeb.Credentials>) {
      state.credentials = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setCredentials } = actions;
export default reducer;
