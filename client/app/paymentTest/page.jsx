'use client'
import React from 'react'

import { Safepay } from '@sfpy/node-sdk'
function page() {
const checkout = async()=>{   
  const safepay = new Safepay({
      environment: 'sandbox',
      apiKey: 'sec_53835f34-4c24-43ba-8ac8-f0bd25437e2f',
      v1Secret: 'bar',
      webhookSecret: 'foo'
  })
  
  const { token } = await safepay.payments.create({
      currency: "PKR",
      amount: 1000  
  })
  // Pass 'token' to create checkout link
  
  const url = safepay.checkout.create({
      token,
      orderId: 'a917c35e-e763-436e-9de2-c9004c952652',
      cancelUrl: 'http://localhost:3000/products',
      redirectUrl: 'http://localhost:3000/',
      source: 'custom',
      webhooks: true
  })

  console.log(url,"PAY HERE")
 }       
  return (
    <div>
        Test Payment Gateway

        <button onClick={checkout}>PAY</button>
    </div>
  )
}

export default page