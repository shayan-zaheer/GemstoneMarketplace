"use client";
import CheckoutForm from "@/components/Form/CheckoutForm";
import { Arrow } from "@radix-ui/react-tooltip";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Safepay } from '@sfpy/node-sdk'
import { useRouter } from "next/navigation";


const Checkout = () => {

  const router = useRouter()

const makePayment = async(amount,orderId)=>{   
console.log(amount,orderId)
  try{

    const safepay = new Safepay({
      environment: 'sandbox',
      apiKey: 'sec_53835f34-4c24-43ba-8ac8-f0bd25437e2f',
      v1Secret: 'bar',
      webhookSecret: '9c6f91a0823036691448fd7a0f280136e8ad26009c72653753ea6e80366e0500'
  })
  
  const { token } = await safepay.payments.create({
      currency: "PKR",
      amount:amount  
  })
  // Pass 'token' to create checkout link
  
  const url = safepay.checkout.create({
      token,
      orderId:orderId,
      cancelUrl: 'https://9772-125-62-89-94.ngrok-free.app/pay/cancelPayment',
      redirectUrl: 'https://9772-125-62-89-94.ngrok-free.app/pay/approvePayment',
      source: 'custom',
      webhooks: true
  })

  console.log(url,"PAY HERE")
  router.push(url)
}
catch(e){
  console.log(e)
}
 }  

  const checkoutItem = useSelector((store) => store.checkout.checkoutItem);
  const isEmpty = !checkoutItem || Object.keys(checkoutItem).length === 0;
  return (
    <div className={"w-full  bg-[#1a1c1ff8] py-20"}>
      {!isEmpty ? (
        <>
          <div className="w-full h-44 bg-[#1a1c1ff8] flex items-center justify-center border-t-2 border-b-2 border-[#f9f9f915]">
            <h1 className="text-5xl text-white font-semibold">Checkout</h1>
          </div>
          <div className="w-full h-12 my-4 px-[5%] flex items-center text-center justify-center">
            <h1 className="text-3xl text-white font-semibold ">
              Billing Details
            </h1>
          </div>
          <CheckoutForm makePayment={makePayment}/>
        </>
      ) : (
        <div className="w-full h-[65vh]  flex items-center justify-center flex-col mt-10">
          <h1 className="text-5xl text-white font-semibold italic w-10/12 text-center">
            Please Select an Item for Checkout
          </h1>

          <Link
            href="/products"
            className="text-blue-500 text-3xl flex gap-x-3 items-center justify-center mt-4 w-10/12"
          >
            <span>Go to Products Page</span>
            <ArrowRight className="w-12 h-12 text-blue-500" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
