import { combineReducers } from "redux";
//import adoptionReducer from "./adoptionReducer";
import auth from "./auth";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
