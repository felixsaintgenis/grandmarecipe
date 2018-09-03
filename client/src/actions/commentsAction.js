import axios from 'axios';
import { GET_COMMENTS } from '../actions/action-types';

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
