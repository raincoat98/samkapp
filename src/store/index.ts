import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import theme from "./theme";
import realm from "./realm";
import system from "./system";

const rootReducer = combineReducers({
  theme,
  realm,
  system,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme", "realm", "system"],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
