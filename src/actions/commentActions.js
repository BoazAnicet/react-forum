import { FETCH_COMMENTS, POST_COMMENT } from "./types";
import axios from "axios";
const baseURL = "http://127.0.0.1:3001/api/v1/comments";

export const fetchComments = (params, success, fail) => async dispatch => {
  try {
    const res = await axios.get(
      baseURL,
      { params: { ...params } },
      { withCredentials: true }
    );

    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data.comments
    });

    // console.log(res);

    success();
  } catch (error) {
    fail();
  }
};

export const deleteComment = () => {};
export const postComment = body => async dispatch => {
  try {
    const res = await axios.post(baseURL, body, { withCredentials: true });

    dispatch({
      type: POST_COMMENT,
      payload: res.data.comment
    });

    console.log(res.data.comment);
  } catch (error) {
    console.log(error.message);
  }
};
