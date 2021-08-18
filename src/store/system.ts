import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logo from "images/logo.png";

type colorType = { light: string; dark: string };

export type SystemState = {
  appName: string;
  user: RealmWeb.User | null;
  logo: string;
  color: {
    background: colorType;
    backgroundSelected: colorType;
  };
};

const initialState: SystemState = {
  appName: "SamKapp",
  user: null,
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
    logIn(state, action: PayloadAction<RealmWeb.User>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

const { reducer, actions } = userSlice;
export const { logIn, logOut } = actions;
export default reducer;
