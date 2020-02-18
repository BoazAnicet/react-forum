import { CREATE_POST, FETCH_PAGED_POSTS } from "../actions/types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PAGED_POSTS:
      return payload;
    case CREATE_POST:
      return {
        ...state,
        totalData: [...state.totalData, payload],
        totalCount: state.totalCount + 1
      };
    default:
      return state;
  }
};
