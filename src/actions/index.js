import { LOGIN, LOGOUT, IS_LOGGED_IN, FETCH_PROFILE } from "./types";
import { fetchPosts, createPost, fetchPagedPosts } from "./postActions";
import { signUp, updateMe } from "./userActions";
import { updatePassword } from "./authActions";
import {
  createThread,
  fetchThreads,
  fetchThread,
  updateThread
} from "./threadActions";
import axios from "axios";

// export const baseURL = "http://127.0.0.1:3001/api/v1";
export const baseURL = "https://arcane-gorge-24995.herokuapp.com/api/v1";

export const login = (credentials, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const user = await axios.post(`${baseURL}/users/login/`, credentials, {
      withCredentials: true
    });

    dispatch({
      type: LOGIN,
      user: user.data.data.user
    });
  } catch (error) {
    fail();
  }
};

export const logout = () => async dispatch => {
  await axios({
    url: `${baseURL}/users/logout`,
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
    const res = await axios.get(`${baseURL}/users/is-logged-in`, {
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

export const fetchProfile = (id, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(`${baseURL}/users/profile/${id}`, {
      withCredentials: true
    });

    dispatch({
      type: FETCH_PROFILE,
      payload: res.data.data.user
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
  updateMe,
  updatePassword,
  fetchPagedPosts
};
