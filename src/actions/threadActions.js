import {
  CREATE_THREAD,
  FETCH_THREADS,
  FETCH_THREAD,
  UPDATE_THREAD
} from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/threads";

export const createThread = (data, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

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

export const fetchThread = (id, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true
    });

    dispatch({
      type: FETCH_THREAD,
      payload: res.data.thread
    });

    success();
  } catch (error) {
    fail(error);
  }
};

export const fetchThreads = (data, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(
      `${baseUrl}`,
      { params: { ...data } },
      {
        withCredentials: true
      }
    );

    dispatch({
      type: FETCH_THREADS,
      payload: res.data.threads
    });

    success();
  } catch (error) {
    fail(error);
  }
};

export const updateThread = (thread, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.patch(
      `${baseUrl}/${thread.id}`,
      { ...thread.body },
      {
        withCredentials: true
      }
    );

    dispatch({
      type: UPDATE_THREAD,
      thread: res.data.thread
    });

    success();
  } catch (error) {
    fail();
  }
};
