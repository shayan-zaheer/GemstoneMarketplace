"use client";
import CartCard from "@/components/CartCard";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import CartTotal from "../../../components/CartTotal";
import { useSelector } from "react-redux";
import Link from "next/link";
import Unauthorized from "@/components/Unauthorized";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const loggedinUser = useSelector((store) => store.user.user);

  return (
    <>
      {loggedinUser.role === "admin" ? (
        <Unauthorized />
      ) : (
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
            {cartItems.length !== 0 ? (
              <div className="w-full min-h-96 flex flex-col gap-y-4  py-4">
                {cartItems?.map((item) => (
                  <CartCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="w-full h-96 flex flex-col justify-center gap-y-4  py-4 text-white text-center">
                <span className="sm:text-5xl font-bold italic w-11/12 mx-auto">
                  {" "}
                  There is no Items in the Cart
                </span>
                <Link
                  href="/products"
                  className="sm:text-3xl w-11/12 mx-auto text-blue-500 font-semibold flex items-center justify-center gap-x-2 hover:text-blue-600 transition-all duration-300 ease-linear hover:scale-105"
                >
                  <span>Go to Products Page</span>
                  <ArrowRight className="w-8 h-8" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
