import { combineReducers } from "redux";
import Home from "../components/Home/Home";
const initialState=[]; 
const setTabs = (state = initialState, action) => {
  if (action.type === "SET_TABS") {
    return [...state,action.payload];
  }
  return state;
};
const rootReducer=combineReducers({setTabs});

export default rootReducer;