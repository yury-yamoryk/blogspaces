import {
    GET_POST,
  } from "../actions/types";
import Post from "../entities/Post";
  
  const initialState: Post = { id: "", title: "", description: "", comments: [] };
  
  const post = function(state = initialState, action: any) {
    const { type } = action;
  
    switch (type) {
      case GET_POST:
        return action.getPostResponse.optionalPost;
        
      default:
        return state;
    }
  };
  
  export default post