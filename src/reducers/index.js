import { combineReducers } from "redux";
import {
  LOGIN,
  LOGOUT,
  IS_LOGGED_IN,
  GET_POST,
  GET_ALL_POSTS
} from "../actions/types";

const user = (state = null, { type, user }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...user };
    case LOGOUT:
      return null;
    case IS_LOGGED_IN:
      return { ...state, ...user };
    default:
      return state;
  }
};

const post = (state = null, { type, post }) => {
  switch (type) {
    case GET_POST:
      return post;
    default:
      return state;
  }
};

const posts = (state = [], { type, posts }) => {
  switch (type) {
    case GET_ALL_POSTS:
      return [...state, ...posts];
    default:
      return state;
  }
};

export default combineReducers({ user, post, posts });
