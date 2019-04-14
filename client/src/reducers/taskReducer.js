import { GET_TASK } from "../actions/types";
import { GET_REVIEWED_TASK } from "../actions/types";
import { POST_TASK } from "../actions/types";

const initialState = {
  task: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        task: action.payload
      };
    case GET_REVIEWED_TASK:
      return {
        ...state,
        task: action.payload
      };
    case POST_TASK:
      return {
        ...state,
        task: action.payload
      };

    default:
      return state;
  }
}
