import axios from 'axios';
import { GET_COMMENTS, GET_ERRORS } from '../actions/action-types';

export const getCommentsByRecipeId = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/posts/',
    /* other custom settings */
  });

  axiosInstance
    .get(`${id}/comments`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMMENTS,
        payload: null
      })
    );
};

export const createComment = (commentData, history) => dispatch => {

  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/recipes/',
    /* other custom settings */
  });

  axiosInstance
    .post(`/${commentData.recipeId}/${commentData.userId}/comment/create/`, commentData)
    .then(window.location.reload())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
