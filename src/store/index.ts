import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import database from "./database";
import realm from "./realm";
import icon from "./icon";
import router from "./router";
import system from "./system";

const rootReducer = combineReducers({
  database,
  realm,
  icon,
  router,
  system,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
