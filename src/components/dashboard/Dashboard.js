import React,{useEffect} from 'react'

const Dashboard = () => {
    useEffect(()=>{
        console.log("Dashboard mounted")

        return ()=>{
            console.log("Dashboard destroyed")
        }
    }, [])
  return (
    <div>Dashboard from File</div>
  )
}

export default Dashboard