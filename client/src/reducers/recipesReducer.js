import { GET_RECIPES, GET_RECIPE } from '../actions/action-types';

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
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload
        }
    default:
      return state
  }
}
