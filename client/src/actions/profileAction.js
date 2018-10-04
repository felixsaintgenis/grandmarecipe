import axios from 'axios'
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_FAVORITES
} from './action-types'

//get current profiles
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getFavorites = id => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/',
    /* other custom settings */
  });

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

export const addToFavorites = ( userId, recipeId ) => dispatch => {
  let axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/profile/',
    /* other custom settings */
  });

  axiosInstance
    .post(`/${userId}/${recipeId}/favorite/add`, '')
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ).then(window.location.reload())
    ;

}

//profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//clear current profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
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
