import {
  CREATE_THREAD,
  FETCH_THREADS,
  FETCH_PAGED_THREADS
} from "../actions/types";

export default (state = [], { type, payload }) => {
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
