import { combineReducers } from "redux";
import authentication from "./authentication";
import message from "./message";
import blogs from "./blogs";
import blog from "./blog";

export default combineReducers({
  authentication,
  message,
  blogs,
  blog,
});
