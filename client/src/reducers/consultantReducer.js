import { GET_CONSULTANT } from "../actions/types";

const initialState = {
  profile: null,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONSULTANT:
      return {
        ...state,
        profile: action.payload
      };
    case GET_CONSULTANT:
      return {
        ...state,
        profiles: action.payload
      };
    default:
      return state;
  }
}
