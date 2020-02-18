import { FETCH_THREAD, CREATE_THREAD, UPDATE_THREAD } from "../actions/types";

export default (state = {}, { type, payload }) => {
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
