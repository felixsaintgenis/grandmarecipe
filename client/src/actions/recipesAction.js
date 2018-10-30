import axios from 'axios';
import { GET_RECIPES, GET_RECIPE, GET_ERRORS, RECIPE_LOADING, ADD_LIKE } from '../actions/action-types';

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
        payload: []
      })
    );
};

export const getRecipeById = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/recipes/',
    /* other custom settings */
  });
  dispatch(setRecipeLoading());
  axiosInstance
    .get(id)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
};

export const getMyRecipes = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/recipes/',
    /* other custom settings */
  });

  axiosInstance
    .get(id)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

export const createRecipe = (recipeData,history) => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/recipes/',
    /* other custom settings */
  });

  axiosInstance
    .post('/add',recipeData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data    
      })
    );
}

export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  }
}

export const addLike = ( userId, recipeId ) => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/recipes/',
    /* other custom settings */
  });

  axiosInstance
    .post(`/${recipeId}/${userId}/like/`)
    .then(res =>
      dispatch({
        type: ADD_LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

// export const addLike = postData => dispatch => {
//   axios
//     .post('/api/posts', postData)
//     .then(res =>
//       dispatch({
//         type: ADD_POST,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
// export function fetchPosts() {
//   const request = axios.get(`${ROOT_URL}/posts`);
//  return {
//   type: FETCH_POSTS,
//   payload: request
//   };
//  }
//  export function fetchPostsSuccess(posts) {
//   return {
//   type: FETCH_POSTS_SUCCESS,
//   payload: posts
//   };
//  }