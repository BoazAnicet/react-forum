import {
  LOGIN,
  LOGOUT,
  IS_LOGGED_IN,
  SIGN_UP,
  UPDATE_ME,
  DELETE_ME,
  UPDATE_PASSWORD
} from "../actions/types";

export default (state = null, { type, user }) => {
  switch (type) {
    case LOGIN:
    case IS_LOGGED_IN:
    case SIGN_UP:
      return user;
    case DELETE_ME:
    case LOGOUT:
      return null;
    case UPDATE_PASSWORD:
    case UPDATE_ME:
      return { ...state, ...user };
    default:
      return state;
  }
};
