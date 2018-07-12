import axios from 'axios';
import { GET_RECIPES, GET_ERRORS } from '../actions/action-types';

export const getAllRecipes = () => dispatch => {
    axios
    .get('http://localhost:5000/api/recipes')
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: {}
      })
    );
};
