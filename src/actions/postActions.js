import { GET_POST, GET_MANY_POSTS, CREATE_POST } from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/posts";

export const getPost = (id, success, fail) => {
  return async dispatch => {
    try {
      const res = await axios.get(baseUrl + "/" + id, {
        withCredentials: true
      });

      // ({
      //   method: "GET",
      //   url: `${baseUrl}/${id}`,
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true
      //   },
      //   withCredentials: true
      // });

      dispatch({
        type: GET_POST,
        post: res.data.data.post
      });
      success();
    } catch (error) {
      fail();
    }
  };
};

export const getManyPosts = (data, success, fail) => async dispatch => {
  try {
    const res = await axios.get(
      baseUrl,
      { params: { ...data } },
      { withCredentials: true }
    );

    dispatch({
      type: GET_MANY_POSTS,
      posts: res.data.data.posts
    });
    success();
  } catch (error) {
    fail();
  }
};

export const createPost = (data, success, fail) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${baseUrl}`,
        { ...data },
        { withCredentials: true }
      );

      dispatch({
        type: CREATE_POST,
        post: res.data.data.post
      });
      success();
    } catch (error) {
      fail();
    }
  };
};
