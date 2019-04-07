import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import partnerReducer from "./partnerReducer";
export default combineReducers({
  member: memberReducer,
  partner: partnerReducer
});
