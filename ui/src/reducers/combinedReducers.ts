import { combineReducers } from "redux";
import authentication from "./authentication";
import message from "./message";
import blogs from "./blogs";
import blog from "./blog";
import post from "./post";
import theme from "./theme";

export default combineReducers({
  authentication,
  message,
  blogs,
  blog,
  post,
  theme,
});
