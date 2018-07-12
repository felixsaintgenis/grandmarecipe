import { combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  errors: errorReducer

});
