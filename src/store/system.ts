import { createSlice } from "@reduxjs/toolkit";
import logo from "images/logo.png";

export type SystemState = {
  isSidebarOpen: boolean;
  appName: string;
  logo: string;
};

const initialState: SystemState = {
  isSidebarOpen: true,
  appName: "SamKapp",
  logo: logo,
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

const { reducer, actions } = userSlice;
export const { toggleSidebar } = actions;
export default reducer;
