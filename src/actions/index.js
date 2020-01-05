import { LOGIN, LOGOUT, IS_LOGGED_IN } from "./types";
import { getAllPosts, getPost } from "./postActions";
import axios from "axios";

export const login = (credentials, callback) => {
  return async dispatch => {
    const user = await axios({
      url: "http://127.0.0.1:3001/api/v1/users/login/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      data: { ...credentials },
      withCredentials: true
    });

    dispatch({
      type: LOGIN,
      user: user.data.data.user
    });

    callback();
  };
};

export const logout = () => {
  return async dispatch => {
    await axios({
      url: "http://127.0.0.1:3001/api/v1/users/logout",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      withCredentials: true
    });

    dispatch({
      type: LOGOUT,
      res: "logged out"
    });
  };
};

export const isLoggedIn = () => {
  return async dispatch => {
    const user = await axios({
      url: "http://127.0.0.1:3001/api/v1/users/is-logged-in",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      withCredentials: true
    });

    dispatch({
      type: IS_LOGGED_IN,
      user: user.data.currentUser
    });
  };
};

export { getAllPosts, getPost };
