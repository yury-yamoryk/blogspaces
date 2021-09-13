import {
  ADD_COMMENT,
    GET_POST,
  } from "../actions/types";
import Post from "../entities/Post";
  
  const initialState: Post = { id: "", title: "", description: "", comments: [] };
  
  const post = function(state = initialState, action: any) {
    const { type } = action;
  
    switch (type) {
      case GET_POST:
        return action.getPostResponse.optionalPost;

      case ADD_COMMENT:
        return {
          ...state,
          comments: [ ...(state.comments ? state.comments : []), action.newComment ],
        }
        
      default:
        return state;
    }
  };
  
  export default post