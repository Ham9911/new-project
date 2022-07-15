import React, { useEffect } from 'react'

const Order = () => {
    useEffect(()=>{
        console.log("Order mounted")

        return ()=>{
            console.log("Order destroyed")
        }
    })
  return (
    <div>Order From File</div>
  )
}

export default Order