import {
    GET_BLOG, GET_POST,
  } from "../actions/types";
import Blog from "../entities/Blog";
  
  const initialState: Blog = { id: "", title: "", theme: null, posts: [] };
  
  const blog = function(state = initialState, action: any) {
    const { type } = action;
  
    switch (type) {
      case GET_BLOG:
        return action.blog;

      case GET_POST:
        return {
          ...state,
          theme: action.getPostResponse.optionalTheme
        };
        
      default:
        return state;
    }
  };
  
  export default blog