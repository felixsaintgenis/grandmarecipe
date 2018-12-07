import { GET_PROFILES } from "../actions/action-types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return [...action.payload];
    default:
      return state;
  }
}
