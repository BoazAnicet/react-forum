import { combineReducers } from "redux";
import {
  LOGIN,
  LOGOUT,
  IS_LOGGED_IN,
  FETCH_POSTS,
  SIGN_UP,
  CREATE_POST,
  CREATE_THREAD,
  FETCH_THREADS,
  FETCH_THREAD,
  UPDATE_ME,
  UPDATE_THREAD,
  FETCH_PAGED_THREADS,
  FETCH_PROFILE,
  DELETE_ME,
  UPDATE_PASSWORD
} from "../actions/types";

const user = (state = null, { type, user }) => {
  switch (type) {
    // case UPDATE_ME:
    //   return { ...state, ...user };
    case LOGIN:
    case IS_LOGGED_IN:
    case SIGN_UP:
      return user;
    case DELETE_ME:
    case LOGOUT:
      return null;
    case UPDATE_PASSWORD:
    case UPDATE_ME:
    default:
      return state;
  }
};

const posts = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return [...payload];
    case CREATE_POST:
      return [...state, payload];
    default:
      return state;
  }
};

const thread = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_THREAD:
      return payload;
    case FETCH_THREAD:
      return payload;
    case UPDATE_THREAD:
      return state;
    default:
      return state;
  }
};

const threads = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_THREAD:
      return [...state, payload];
    case FETCH_THREADS:
      return payload;
    case FETCH_PAGED_THREADS:
      return payload;
    default:
      return state;
  }
};

const profile = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  posts,
  threads,
  thread,
  profile
});
