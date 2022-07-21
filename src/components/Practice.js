import React,{useReducer} from 'react'
import {useSelector,useDispatch} from "react-redux";
import { renderTabs } from '../store/action';
const Practice = () => { 
  const alpha={a:"a",b:"b",c:"c",d:"d",e:"e",f:"f"}
  const myState=useSelector((state)=>state.setTabs);
  const dispatch=useDispatch();
  console.log(myState);
  

  return (  
    <>
  <button onClick={()=>dispatch(renderTabs(alpha))}>Click Me</button> 
  </>
);
}

export default Practice