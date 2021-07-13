import { combineReducers } from "redux";
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

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
