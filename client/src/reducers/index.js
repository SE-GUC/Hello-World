import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import masterReducer from "./masterclassReducer";
export default combineReducers({
  member: memberReducer,
  master: masterReducer
});
