import {
  GET_ERRORS,
  SUCCESS_FETCH,
  FAILED_FETCH,
  CLEAR_ERRORS
} from "../actions/action-types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH:
      return "success";
    case FAILED_FETCH:
      return "failed";
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return "cleared";

    default:
      return state;
  }
}
