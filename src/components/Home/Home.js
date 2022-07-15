import React,{useEffect} from 'react'

const Home = () => {
    
    useEffect(()=>{
        console.log("Home mounted")

        return ()=>{
            console.log("Home destroyed")
        }
    })

  return (
    <div>Home From File</div>
  )
}

export default Home