import { SIGN_UP } from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/users";

// export const getOneUser = id => {
//   return async dispatch => {
//     const user = await axios.get(`${baseUrl}/${id}`, { withCredentials: true });
//   };
// };

export const signUp = (body, success, fail) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${baseUrl}/signup`, body, {
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
};
