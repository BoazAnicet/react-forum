import { LOGIN, LOGOUT, IS_LOGGED_IN } from "./types";
import { getManyPosts, getPost } from "./postActions";
import { signUp } from "./userActions";
import axios from "axios";

export const login = (credentials, callback) => {
  return async dispatch => {
    // const user = await axios({
    //   url: "http://127.0.0.1:3001/api/v1/users/login/",
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true
    //   },
    //   data: { ...credentials },
    //   withCredentials: true
    // });

    const user = await axios.post(
      "http://127.0.0.1:3001/api/v1/users/login/",
      credentials,
      { withCredentials: true }
    );

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

export const isLoggedIn = (success, fail) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:3001/api/v1/users/is-logged-in",
        {
          withCredentials: true
        }
      );

      dispatch({
        type: IS_LOGGED_IN,
        user: res.data.currentUser
      });

      success();
    } catch (error) {
      // console.log(error);
      fail();
    }
  };
};

export { getManyPosts, getPost, signUp };
