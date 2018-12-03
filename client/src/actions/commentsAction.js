import axios from "axios";
import {
  GET_COMMENTS,
  GET_ERRORS,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../actions/action-types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/"
  /* other custom settings */
});

export const getCommentsByRecipeId = id => dispatch => {
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

export const createComment = commentData => dispatch => {
  axiosInstance
    .post(
      `/${commentData.recipeId}/${commentData.userId}/comment/create/`,
      commentData
    )
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      err.response && err.response.data
        ? dispatch({
            type: GET_ERRORS,
            payload: err
          })
        : null
    );
};

export const deleteComment = id => dispatch => {
  if (window.confirm("Are you sure you want delete your message?")) {
    axiosInstance
      .delete(`/delete/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_COMMENT,
          payload: id
        })
      )
      .catch(err =>
        err.response && err.response.data
          ? dispatch({
              type: GET_ERRORS,
              payload: err
            })
          : null
      );
  }
};

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
