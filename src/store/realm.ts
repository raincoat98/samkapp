import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const APP_ID = "samkapp-dzval";

export type SystemState = {
  appId: string;
  app: RealmWeb.App;
  user: RealmWeb.User | null;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: SystemState = {
  appId: "samkapp-dzval",
  app: new RealmWeb.App({ id: APP_ID }),
  user: null,
  readonlySchemaKeyList: ["create_by", "create_dttm", "save_by", "save_dttm"],
  disabledSchemaKeyList: ["_id", "owner_id"],
};

const userSlice = createSlice({
  name: "realm",
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
