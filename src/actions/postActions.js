import { FETCH_POSTS, CREATE_POST } from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/posts";

export const fetchPosts = (data, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(
      baseUrl,
      { params: { ...data } },
      { withCredentials: true }
    );

    dispatch({
      type: FETCH_POSTS,
      payload: res.data.data.posts
    });

    success();
  } catch (error) {
    fail(error);
  }
};

export const createPost = (data, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.post(
      `${baseUrl}`,
      { ...data },
      { withCredentials: true }
    );

    dispatch({
      type: CREATE_POST,
      payload: res.data.data.post
    });

    success();
  } catch (error) {
    fail();
  }
};
