import { FETCH_PROFILE } from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE:
      return payload;
    default:
      return state;
  }
};
