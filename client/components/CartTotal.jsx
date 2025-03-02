import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartTotal = () => {
  return (
    <div className=" w-96 h-72 bg-[#2A2D33] mt-8 right-10 rounded-lg shadow-2xl shadow-black flex flex-col gap-y-1 items-center  text-white px-4 py-4  mb-4 mx-auto max-lg:w-[95%] ">
      <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-11/12  gap-x-2 mt-2">
        <div className="flex-grow border-t-4 border-gray-300"></div>
        <span className="font-bold max-sm:text-3xl sm:text-3xl lg:text-2xl text-white">
          Cart Totals
        </span>
        <div className="flex-grow border-t-4 border-gray-300"></div>
      </div>
      <div className="w-full h-52 flex flex-col justify-center items-center gap-y-2 lg:text-lg max-sm:text-xl sm:text-xl">
        <div className="w-full  flex justify-between mt-4 border-b-2 border-gray-300 px-2">
          <span>Subtotal</span>
          <span>Rs. 50000</span>
        </div>
        <div className="w-full  flex justify-between mt-4 border-b-2 border-gray-300 px-2">
          <span>GST (15%)</span>
          <span>Rs. 5000</span>
        </div>
        <div className="w-full  flex justify-between mt-4 border-b-2 border-gray-300 px-2">
          <span>Total</span>
          <span>Rs. 55000</span>
        </div>
        <div>
          <Link href="/checkout">
            <button className="relative px-6 py-2 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm mt-2">
              <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <div className="flex items-center justify-center gap-x-2">
                <span className="relative z-10 text-white">Checkout</span>

                <ArrowRight className="relative z-10" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
