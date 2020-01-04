import { combineReducers } from "redux";
import { LOGIN, LOGOUT, IS_LOGGED_IN } from "../actions/types";

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

export default combineReducers({ user, post: null });
