import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logo from "images/logo.png";

type colorType = { light: string; dark: string };

export type SystemState = {
  credentials: RealmWeb.Credentials | null;
  appName: string;
  logo: string;
  color: {
    background: colorType;
    backgroundSelected: colorType;
  };
};

const initialState: SystemState = {
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
    setCredentials(state, action: PayloadAction<RealmWeb.Credentials>) {
      state.credentials = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setCredentials } = actions;
export default reducer;
