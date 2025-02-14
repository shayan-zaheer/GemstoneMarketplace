import CartCard from "@/components/CartCard";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Ruby",
      image: "/ruby.png",
      owner: "Joe Burgh",
      price: "150000",
      carat: "5.5",
      purity: "D",
      color: "Dark",
      shape: "Triangular",
      length: "8.31",
      width: "5.9",
      height: "4.86",
      itemNumber: "2023-1315",
    },
    {
      id: 2,
      name: "Sapphire",
      image: "/sapphire.jpg",
      owner: "Emma Stone",
      price: "200000",
      carat: "6.2",
      purity: "VVS1",
      color: "Royal Blue",
      shape: "Oval",
      length: "9.10",
      width: "6.5",
      height: "5.0",
      itemNumber: "2023-2547",
    },
    {
      id: 3,
      name: "Opal",
      image: "/opal.png",
      owner: "Michael Carter",
      price: "180000",
      carat: "4.8",
      purity: "VS2",
      color: "Multicolor",
      shape: "Round",
      length: "7.50",
      width: "7.50",
      height: "4.2",
      itemNumber: "2023-3789",
    },
  ];

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
      <div className="w-full min-h-96 flex flex-col gap-y-4  py-4">
        {cartItems.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
