import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipesReducer from "./recipesReducer";
import profileReducer from "./profileReducer";
import usersListReducer from "./usersListReducer";
import commentsReducer from "./commentsReducer";
import flashReducer from "./flashReducer";

export default combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  errors: errorReducer,
  currentUser: profileReducer,
  usersList: usersListReducer,
  comments: commentsReducer,
  flashMessage: flashReducer
});
