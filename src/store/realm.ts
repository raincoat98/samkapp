import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SystemState = {
  appId: string;
  app: RealmWeb.App | null;
  user: RealmWeb.User | null;
  mongodb: Realm.Services.MongoDB | null;
  database: Realm.Services.MongoDBDatabase | null;
};

const initialState: SystemState = {
  appId: "samkapp-dzval",
  app: null,
  user: null,
  mongodb: null,
  database: null,
};

const userSlice = createSlice({
  name: "realm",
  initialState,
  reducers: {
    init(
      state,
      action: PayloadAction<{
        app: RealmWeb.App;
        mongodb: Realm.Services.MongoDB;
        database: Realm.Services.MongoDBDatabase;
      }>
    ) {
      state.app = action.payload.app;
      state.mongodb = action.payload.mongodb;
      state.database = action.payload.database;
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
