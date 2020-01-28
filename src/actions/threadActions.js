import { CREATE_THREAD, GET_THREAD } from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/threads";

export const createThread = (data, success, fail) => {
  return async dispatch => {
    try {
      const res = await axios.post(baseUrl, data, { withCredentials: true });

      dispatch({
        type: CREATE_THREAD,
        payload: res.data.thread
      });

      success(res.data.thread._id);
    } catch (error) {
      fail(error);
    }
  };
};

export const getThread = (id, success, fail) => {
  return async dispatch => {
    try {
      const res = await axios.get(`${baseUrl}/${id}`, {
        withCredentials: true
      });

      dispatch({
        type: GET_THREAD,
        payload: res.data.thread
      });

      success();
    } catch (error) {
      fail(error);
    }
  };
};
