import * as RealmWeb from "realm-web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

const APP_ID = "samkapp-dzval";

export type SystemState = {
  app: RealmWeb.App | null;
  user: RealmWeb.User | null;
  credentials: RealmWeb.Credentials<Realm.Credentials.EmailPasswordPayload> | null;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: SystemState = {
  app: null,
  credentials: null,
  user: null,
  readonlySchemaKeyList: ["create_by", "create_dttm", "save_by", "save_dttm"],
  disabledSchemaKeyList: ["_id", "owner_id"],
};

/* 액션 타입 */
const GET_REALM_LOGIN = "GET_REALM_LOGIN";

function* getRealmLoginSaga(
  action: PayloadAction<{ email: string; password: string }>
) {
  const { email, password } = action.payload;

  const app = new RealmWeb.App({ id: APP_ID });
  const credentials = RealmWeb.Credentials.emailPassword(email, password);

  try {
    yield app.logIn(credentials);

    yield put({
      type: "realm/init",
      payload: {
        app,
        credentials,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function* realmSaga() {
  yield takeEvery(GET_REALM_LOGIN, getRealmLoginSaga);
}

const userSlice = createSlice({
  name: "realm",
  initialState,
  reducers: {
    init(
      state,
      action: PayloadAction<{
        app: RealmWeb.App;
        credentials: RealmWeb.Credentials<Realm.Credentials.EmailPasswordPayload>;
      }>
    ) {
      const { app, credentials } = action.payload;

      state.app = app;
      state.credentials = credentials;
      state.user = app.currentUser;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

const { reducer, actions } = userSlice;
export const { init, logOut } = actions;
export default reducer;
