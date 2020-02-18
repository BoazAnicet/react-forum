import { combineReducers } from "redux";

import user from "./user";
import posts from "./posts";
import thread from "./thread";
import threads from "./threads";
import profile from "./profile";

export default combineReducers({
  user,
  posts,
  threads,
  thread,
  profile
});
