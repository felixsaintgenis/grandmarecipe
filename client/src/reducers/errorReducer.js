import { GET_ERRORS, SUCCESS_FETCH } from "../actions/action-types";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH:
      return {
        errors: null
      };
    case GET_ERRORS:
      return {
        errors: action.payload
      };
    default:
      return state;
  }
}
