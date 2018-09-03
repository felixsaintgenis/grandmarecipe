import { GET_COMMENTS } from '../actions/action-types';

const initialState = {
  comments: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
     default:
      return state;
  }
}
