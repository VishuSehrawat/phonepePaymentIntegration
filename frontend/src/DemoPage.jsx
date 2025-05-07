/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SuccessPage from "./SuccessPage";

const DemoPage = () => {
    const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [demo,setDemo]=useState(false)

  const handlePayment = async () => {
    const payload = {
      merchantOrderId: "newtxn1234567890",
      amount: 100,
      redirectUrl: "http://localhost:5174/success",
    };
    const response = await axios.post(
      "http://localhost:5000/api/payment/initiateOrder",payload
      );
      console.log(response.data)
      
      if (response.data.success) {
          window.location.href = response.data.redirectUrl
          
      }
    };


   

  return (
    <div className="demoWrapper">
      <img src="../src/assets/demoImage.png" alt="demo image" />
      <h2>Truck</h2>
      <p>₹ 1</p>
      <button onClick={() => handlePayment()}>Pay Now</button>
    </div>
  );
};

export default DemoPage;
