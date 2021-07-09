import { combineReducers } from "redux";
import system from "./system";

const rootReducer = combineReducers({
  system,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
