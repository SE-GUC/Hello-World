import { GET_APPLICATION } from "../actions/types";

const initialState = {
  application: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATION:
      return {
        ...state,
        application: action.payload
      };
    default:
      return state;
  }
}
