import { UPDATE_PASSWORD } from "./types";
import axios from "axios";
import { baseURL as BASE_URL } from "./index";

export const updatePassword = (body, success, fail) => async dispatch => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/users/update-my-password`,
      body,
      {
        withCredentials: true
      }
    );

    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data.data.user
    });

    success();
  } catch (error) {
    fail(error.message);
  }
};
