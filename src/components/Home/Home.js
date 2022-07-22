import React,{useEffect, useState} from 'react'

const Home = () => {
  const [inputData,setinputData]=useState('');  
  const getInput=(e)=>{
    setinputData(e.target.value)
    }
    useEffect(()=>{
        console.log("Home mounted")
    
        return ()=>{
            console.log("Home destroyed")
        }
    },[])

  return (
    <>
    <div>Home From File</div>
    <input type='text' onChange={getInput} value={inputData} ></input>
    <h2>{inputData}</h2>
    </>
  )
}

export default Home