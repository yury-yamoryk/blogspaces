import {
    GET_BLOG,
  } from "../actions/types";
import Blog from "../entities/Blog";
  
  const initialState: Blog = { id: "", title: "", theme: null, posts: [] };
  
  const blog = function(state = initialState, action: any) {
    const { type, blog } = action;
  
    switch (type) {
      case GET_BLOG:
        return blog;
        
      default:
        return state;
    }
  };
  
  export default blog