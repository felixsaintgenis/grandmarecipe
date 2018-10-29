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
    .then(dispatch(getCommentsByRecipeId(commentData.recipeId)))
    // .then(res =>
    // dispatch({
    //   type:GET_CREATED_COMMENT,
    //   payload: commentData
    // }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
// export function APIDispatch(data)
// {
//     return{
//         type:'API_DATA_RECD',
//         data:data
//     }
// }
//
// export function callAPI(){
//     return function(dispatch){
//          axios({
//             method: 'post',
//             url: 'php/register.php',
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             data: userData
//           }).then(function(response) {
//             state.error = response.data.errors;
//             state.success = response.data.success;
//             dispatch(APIDispatch(state))
//         });
//
//     }
// }
