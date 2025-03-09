"use client";
import CartCard from "@/components/CartCard";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import CartTotal from "../../../components/CartTotal";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);

  return (
    <div className="mt-20 min-h-96 bg-[#1a1c1ff8] p-4">
      <div className="flex justify-center items-center h-24 w-full flex-col ">
        <ShoppingCart className="text-white w-12 h-12 lg:w-20 lg:h-20" />
        <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12  gap-x-2 mt-2">
          <div className="flex-grow border-t-4 border-gray-300"></div>
          <span className="font-bold max-sm:text-3xl sm:text-3xl text-white">
            Cart
          </span>
          <div className="flex-grow border-t-4 border-gray-300"></div>
        </div>
      </div>
      <div className="flex w-auto h-auto max-lg:flex-col px-[2%]">
        <div className="w-full min-h-96 flex flex-col gap-y-4  py-4">
          {cartItems?.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
