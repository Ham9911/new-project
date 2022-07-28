import React,{useEffect} from 'react'

const Contacts = () => {
  useEffect(()=>{
        console.log("Contacts mounted")

        return ()=>{
            console.log("Contacts destroyed")
        }
    },[])
  return (
    <div>Contacts From File</div>
  )
}

export default Contacts