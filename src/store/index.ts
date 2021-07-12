import { combineReducers } from "redux";
import system from "./system";
import work from "./work";
import workOrder from "./work-order";

const rootReducer = combineReducers({
  system,
  work,
  workOrder,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
