import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/action-types";
import setAuthToken from "../helpers/setAuthToken";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/"
  /* other custom settings */
});

//registerUser

export const registerUser = (userData, history) => dispatch => {
  axiosInstance
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//loginUser

export const loginUser = (userData, history) => dispatch => {
  axiosInstance
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //save token to localstorage
      localStorage.setItem("jwtToken", token);
      //put the token in the header
      setAuthToken(token);
      //decode token to access user data
      const UserInfoDecoded = jwtDecode(token);
      //set the current user
      dispatch(setCurrentUser(UserInfoDecoded));
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = UserInfoDecoded => {
  return {
    type: SET_CURRENT_USER,
    payload: UserInfoDecoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
