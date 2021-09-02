import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SystemState = {
  appId: string;
  app: RealmWeb.App | null;
  user: RealmWeb.User | null;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: SystemState = {
  appId: "samkapp-dzval",
  app: null,
  user: null,
  readonlySchemaKeyList: [],
  disabledSchemaKeyList: ["_id", "owner_id"],
};

const userSlice = createSlice({
  name: "realm",
  initialState,
  reducers: {
    init(state, action: PayloadAction<RealmWeb.App>) {
      state.app = action.payload;
    },
    logIn(state, action: PayloadAction<RealmWeb.User>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

const { reducer, actions } = userSlice;
export const { init, logIn, logOut } = actions;
export default reducer;
