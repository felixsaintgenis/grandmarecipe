import { GET_RECIPES, GET_RECIPE, RECIPE_LOADING } from '../actions/action-types';

const initialState = {
  recipes: [],
  recipe: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
        }
    default:
      return state
  }
}
