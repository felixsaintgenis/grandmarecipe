import axios from "axios";
import {
  GET_RECIPES,
  GET_RECIPE,
  GET_ERRORS,
  SUCCESS_FETCH,
  RECIPE_LOADING,
  ADD_LIKE,
  GET_LAST_RECIPES,
  CLEAR_ERRORS
} from "../actions/action-types";

export const getAllRecipes = () => dispatch => {
  axios
    .get("http://localhost:5000/api/recipes")
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
    baseURL: "http://localhost:5000/api/recipes/"
    /* other custom settings */
  });
  dispatch(setRecipeLoading());
  axiosInstance.get(id).then(res =>
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    })
  );
};

export const getMyRecipes = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/recipes/"
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

export const getLastThreeRecipes = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/recipes/"
    /* other custom settings */
  });

  axiosInstance
    .get("lastThreeRecipes")
    .then(res =>
      dispatch({
        type: GET_LAST_RECIPES,
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

export const createRecipe = (recipeData, history) => dispatch => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/recipes/"
    /* other custom settings */
  });

  axiosInstance
    .post("/add", recipeData)
    .then(res =>
      dispatch({
        type: SUCCESS_FETCH,
        payload: null
      })
    )
    .then(err => (err ? history.push("/dashboard") : null))
    .then(
      setTimeout(() => {
        dispatch({ type: CLEAR_ERRORS });
      }, 5000)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};

export const addLike = (userId, recipeId) => dispatch => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/recipes/"
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
