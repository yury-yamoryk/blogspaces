import {
    GET_ALL_BLOGS,
  } from "../actions/types";
import Blogs from "../entities/Blogs";
  
  const initialState: Blogs = { userBlogs: [], otherBlogs: []};
  
  const blogs = function(state = initialState, action: any) {
    const { type, allBlogs } = action;
  
    switch (type) {
      case GET_ALL_BLOGS:
        return allBlogs;
        
      default:
        return state;
    }
  };
  
  export default blogs