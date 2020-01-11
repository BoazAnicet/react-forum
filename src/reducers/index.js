import { combineReducers } from "redux";
import {
  LOGIN,
  LOGOUT,
  IS_LOGGED_IN,
  GET_POST,
  GET_MANY_POSTS,
  SIGN_UP,
  CREATE_POST
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
    case CREATE_POST:
      return post;
    default:
      return state;
  }
};

const posts = (state = [], { type, posts }) => {
  switch (type) {
    case GET_MANY_POSTS:
      return [...posts];
    default:
      return state;
  }
};

export default combineReducers({ user, post, posts });
