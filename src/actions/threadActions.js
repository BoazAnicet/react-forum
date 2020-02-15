import {
  CREATE_THREAD,
  FETCH_THREADS,
  FETCH_THREAD,
  UPDATE_THREAD,
  FETCH_PAGED_THREADS
} from "./types";
import axios from "axios";
import { baseURL as BASE_URL } from "./index";

export const createThread = (body, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.post(`${BASE_URL}/threads`, body, {
      withCredentials: true
    });

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
    const res = await axios.get(`${BASE_URL}/threads/${id}`, {
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
      `${BASE_URL}/threads`,
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
      `${BASE_URL}/threads/${thread.id}`,
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

export const fetchPagedThreads = (req, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(`${BASE_URL}/threads/paged-threads`, {
      params: { ...req },
      withCredentials: true
    });

    dispatch({
      type: FETCH_PAGED_THREADS,
      payload: res.data.threads[0]
    });

    success();
  } catch (error) {
    fail();
  }
};
