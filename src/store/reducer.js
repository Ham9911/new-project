import { combineReducers } from "redux";
const initialState=[]; 
const setTabs = (state = initialState, action) => {
  if (action.type === "SET_TABS") {
    return [...state,action.payload];
  }
  if (action.type === "SET_DELTABS") {
    return action.payload;
  }
  return state;
};
const rootReducer=combineReducers({setTabs});

export default rootReducer;