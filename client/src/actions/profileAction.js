import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_FAVORITES,
  TOGGLE_FAVORITE,
  CLEAR_ERRORS,
  ADD_THREE_FAVORITES
} from "./action-types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/"
  /* other custom settings */
});

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axiosInstance
    .get("/api/profile/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//get current profiles
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axiosInstance
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axiosInstance
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
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

export const getFavorites = id => dispatch => {
  axiosInstance
    .get(`${id}/favorites`)
    .then(res =>
      dispatch({
        type: GET_FAVORITES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FAVORITES,
        payload: null
      })
    );
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axiosInstance.get(id).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

export const addToFavorites = (userId, recipeId) => dispatch => {
  axiosInstance
    .post(`/api/profile/${userId}/${recipeId}/favorite/add`)
    .then(res =>
      dispatch({
        type: TOGGLE_FAVORITE,
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

//profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear current profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const getThreeLastFavorites = userId => dispatch => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/profile/"
    /* other custom settings */
  });

  axiosInstance
    .get(`/${userId}/myfavorites/`)
    .then(res =>
      dispatch({
        type: ADD_THREE_FAVORITES,
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
