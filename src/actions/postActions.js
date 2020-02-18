import { FETCH_POSTS, CREATE_POST, FETCH_PAGED_POSTS } from "./types";
import axios from "axios";
import { baseURL as BASE_URL } from "./index";

export const fetchPosts = (data, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(
      ` ${BASE_URL}/posts`,
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
      `${BASE_URL}/posts`,
      { ...data },
      { withCredentials: true }
    );

    dispatch({
      type: CREATE_POST,
      payload: res.data.data.post
    });

    success();
  } catch (error) {
    fail(error.message);
  }
};

export const fetchPagedPosts = (body, success, fail) => async dispatch => {
  success = typeof success !== "undefined" ? success : () => {};
  fail = typeof fail !== "undefined" ? fail : () => {};

  try {
    const res = await axios.get(
      `${BASE_URL}/posts/paged-posts?thread=${body.thread}&page=${body.page}`,
      {
        withCredentials: true
      }
    );

    let i = res.data.posts[0];

    dispatch({
      type: FETCH_PAGED_POSTS,
      payload: {
        totalData: i.totalData,
        totalCount: i.totalCount[0].count
      }
    });

    success();
  } catch (error) {
    fail();
  }
};
