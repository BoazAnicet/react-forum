import { LOGIN, LOGOUT, IS_LOGGED_IN } from "./types";
import { fetchPosts, createPost } from "./postActions";
import { signUp, updateMe } from "./userActions";
import {
  createThread,
  fetchThreads,
  fetchThread,
  updateThread
} from "./threadActions";
import axios from "axios";
const baseURL = "http://127.0.0.1:3001/api/v1/users";

export const login = (credentials, callback) => async dispatch => {
  const user = await axios.post(`${baseURL}/login/`, credentials, {
    withCredentials: true
  });

  dispatch({
    type: LOGIN,
    user: user.data.data.user
  });

  callback();
};

export const logout = () => async dispatch => {
  await axios({
    url: `${baseURL}/logout`,
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

export const isLoggedIn = (success, fail) => async dispatch => {
  try {
    const res = await axios.get(`${baseURL}/is-logged-in`, {
      withCredentials: true
    });

    dispatch({
      type: IS_LOGGED_IN,
      user: res.data.currentUser
    });

    success();
  } catch (error) {
    fail();
  }
};

export {
  fetchPosts,
  createPost,
  signUp,
  createThread,
  fetchThreads,
  fetchThread,
  updateThread,
  updateMe
};
