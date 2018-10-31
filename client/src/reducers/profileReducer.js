import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, TOGGLE_FAVORITE, ADD_THREE_FAVORITES } from '../actions/action-types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null
        }
      case TOGGLE_FAVORITE:
        return {
          ...state,
          profile: action.payload
        };
       case ADD_THREE_FAVORITES:
        return {
          ...state,
          lastThreeFavorites: action.payload
        };       
     default:
      return state;
  }
}
