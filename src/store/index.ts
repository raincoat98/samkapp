import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import realm from "./realm";
import router from "./router";
import system from "./system";

const rootReducer = combineReducers({
  realm,
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
