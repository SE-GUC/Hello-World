import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import applicationReducer from "./applicationReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  member: memberReducer,
  application: applicationReducer,
  task: taskReducer
});
