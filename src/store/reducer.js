import { combineReducers } from "redux";
const initialState = [{abc:"abc"}];
const setTabs = (state = initialState, action) => {
  if (action.type === "SET_TABS") {
    console.log(...state);
    return [...state,action.payload];
  }
  return state;
};
const rootReducer=combineReducers({setTabs});

export default rootReducer;