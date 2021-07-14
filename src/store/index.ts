import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import router from "./router";
import system from "./system";
import work from "./work";
import workOrder from "./work-order";

const rootReducer = combineReducers({
  router,
  system,
  work,
  workOrder,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["system", "work", "workOrder"],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
