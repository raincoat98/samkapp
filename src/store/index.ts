import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { all } from "redux-saga/effects";

import realm, { realmSaga } from "./realm";
import icon from "./icon";
import router from "./router";
import system from "./system";

const rootReducer = combineReducers({
  realm,
  icon,
  router,
  system,
});

export function* rootSaga() {
  yield all([realmSaga()]);
}

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
