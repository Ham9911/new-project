import React,{useEffect} from 'react'

const Invoices = () => {
    useEffect(()=>{
        console.log("Invoices mounted")

        return ()=>{
            console.log("Invoices destroyed")
        }
    }, [])
  return (
    <div>Invoices From FIle</div>
  )
}

export default Invoices