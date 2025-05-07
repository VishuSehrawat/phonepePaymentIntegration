/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SuccessPage = () => {

    const [searchParams] = useSearchParams()
    
    const [status, setStatus] = useState(null)
    
    const merchantOrderId = searchParams.get("merchantOrderId")

   
    useEffect(() => {
      const checkOrderStatus = async () => {
        
        if (merchantOrderId) {
            const response = await axios.post("http://localhost:5000/api/payment/checkOrderStatus", {merchantOrderId})
            if (response.data.success) {
                console.log(response)
                setStatus(response.data.responseFound.state)
            } else {
                console.log("an error occured")
            }
        }
    } 
    checkOrderStatus()
     
    }, [merchantOrderId])
    

  return (
      <div>{status ?"Payment Successful" :"Fetching payment status"}</div>
  )
}

export default SuccessPage