

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
      case CONSULTANT_RESPOND:
      return {
        ...state,
        task: action.payload
      };
      case PARTNER_RESPOND:
      return {
        ...state,
        task: action.payload
      };

    default:
      return state;
  }
}
