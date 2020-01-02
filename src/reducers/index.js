import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "../actions/types";

const user = (state = null, { type, user }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...user };
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({ user, post: null });
