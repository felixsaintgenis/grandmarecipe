import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../actions/action-types";

const initialState = {
  comments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        )
      };
    default:
      return state;
  }
}
