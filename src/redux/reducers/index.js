import { combineReducers } from "redux";
//import adoptionReducer from "./adoptionReducer";
import auth from "./auth";
import ref from "./referredUsers";
const rootReducer = combineReducers({
  auth,
  ref,
});

export default rootReducer;
