import { GET_POST, GET_ALL_POSTS } from "./types";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001/api/v1/posts";

export const getPost = id => {
  return async dispatch => {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      withCredentials: true
    });

    return dispatch({
      type: GET_POST,
      post: res.data.data.post
    });
  };
};

export const getAllPosts = () => {
  return async dispatch => {
    const res = await axios({
      method: "GET",
      url: `${baseUrl}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      withCredentials: true
    });

    dispatch({
      type: GET_ALL_POSTS,
      posts: res.data.data.posts
    });
  };
};
