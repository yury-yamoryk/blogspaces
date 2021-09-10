import { combineReducers } from "redux";
import authentication from "./authentication";
import message from "./message";
import blogs from "./blogs";

export default combineReducers({
  authentication,
  message,
  blogs,
});
