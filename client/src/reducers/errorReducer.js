import {
  GET_ERRORS,
  SUCCESS_FETCH,
  CLEAR_ERRORS
} from "../actions/action-types";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH:
      return {
        errors: "success"
      };
    case GET_ERRORS:
      return {
        errors: "error"
      };
    case CLEAR_ERRORS:
      return {
        errors: "cleared"
      };
    default:
      return state;
  }
}
