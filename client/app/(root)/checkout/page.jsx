import CheckoutForm from "@/components/Form/CheckoutForm";
import React from "react";

const Checkout = () => {
  return (
    <div className="w-full  bg-[#1a1c1ff8] py-20">
      <div className="w-full h-44 bg-[#1a1c1ff8] flex items-center justify-center border-t-2 border-b-2 border-[#f9f9f915]">
        <h1 className="text-5xl text-white font-semibold">Checkout</h1>
      </div>
      <div className="w-full h-12 my-4 px-[5%] flex items-center text-center justify-center">
        <h1 className="text-3xl text-white font-semibold ">Billing Details</h1>
      </div>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
