import { combineReducers } from "redux";
import {
  LOGIN,
  LOGOUT,
  IS_LOGGED_IN,
  GET_POST,
  GET_MANY_POSTS,
  SIGN_UP,
  CREATE_POST,
  DELETE_COMMENT,
  FETCH_COMMENTS,
  POST_COMMENT,
  CREATE_THREAD,
  GET_THREAD
} from "../actions/types";

const user = (state = null, { type, user }) => {
  switch (type) {
    case LOGIN:
    case IS_LOGGED_IN:
    case SIGN_UP:
      return { ...state, ...user };
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

const post = (state = null, { type, post }) => {
  switch (type) {
    case GET_POST:
      return post;
    // case CREATE_POST:
    //   return post;
    default:
      return state;
  }
};

const posts = (state = [], { type, payload }) => {
  switch (type) {
    case GET_MANY_POSTS:
      return [...payload];
    case CREATE_POST:
      return [...state, payload];
    default:
      return state;
  }
};

const comments = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_COMMENTS:
      return [...payload];
    case DELETE_COMMENT:
    case POST_COMMENT:
      return [...state, payload];
    default:
      return state;
  }
};

const thread = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_THREAD:
      return payload;
    case GET_THREAD:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({ user, post, posts, comments, thread });
