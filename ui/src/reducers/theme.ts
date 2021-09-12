import {
    GET_THEMES,
  } from "../actions/types";
import Theme from "../entities/Theme";
  
  const initialState: Theme[] = [];
  
  const theme = function(state = initialState, action: any) {
    const { type } = action;
  
    switch (type) {
      case GET_THEMES:
        return action.getThemesResponse.themes;
        
      default:
        return state;
    }
  };
  
  export default theme