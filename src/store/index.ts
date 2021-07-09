import { combineReducers } from "redux";
import system from "./system";
import workOrder from "./work-order";

const rootReducer = combineReducers({
  system,
  workOrder,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
