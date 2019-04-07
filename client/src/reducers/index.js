import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import masterReducer from "./masterclassReducer";
import applicationReducer from "./applicationReducer";
import taskReducer from "./taskReducer";
import partnerReducer from "./partnerReducer";
import consultantReducer from "./consultantReducer";

export default combineReducers({
  
  member: memberReducer,
  master: masterReducer,
  application: applicationReducer,
  task: taskReducer,
  partner: partnerReducer,
  consultant: consultantReducer

});
