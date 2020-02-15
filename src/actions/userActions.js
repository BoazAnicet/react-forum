import { SIGN_UP, UPDATE_ME } from "./types";
import axios from "axios";
import { baseURL as BASE_URL } from "./index";

// export const getOneUser = id => {
//   return async dispatch => {
//     const user = await axios.get(`${BASE_URL}/users/${id}`, { withCredentials: true });
//   };
// };

export const signUp = (body, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const user = await axios.post(`${BASE_URL}/users/signup`, body, {
      withCredentials: true
    });

    dispatch({
      type: SIGN_UP,
      user: user.data.data.user
    });

    success();
  } catch (error) {
    fail();
  }
};

export const updateMe = (body, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.patch(`${BASE_URL}/users/update-me`, body, {
      withCredentials: true
    });

    dispatch({
      type: UPDATE_ME,
      user: res.data.user
    });

    success();
  } catch (error) {
    fail();
  }
};

export const deleteMe = () => {};
