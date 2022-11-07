import userReducer from "./userReducer";
import customerReducer from "./customerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  customerReducer,
});

export default rootReducer;
