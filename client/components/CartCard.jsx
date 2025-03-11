"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Store/index.js";
import { useRouter } from "next/navigation";
import { checkoutActions } from "@/Store/checkoutSlice.js";
import { cartActions } from "@/Store/cartSlice.js";

gsap.registerPlugin(ScrollTrigger);

const CartCard = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(innerRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
      },
    });
  }, []);

  const handleRemove = () => {
    console.log("Removing from cart", item.id);
    dispatch(cartActions.removeFromCart(item));
  };

  const handleBuyNow = () => {
    dispatch(checkoutActions.setCheckoutItem(item));
    router.push("/checkout");
  };

  return (
    <div
      ref={cardRef}
      className="w-[95%] min-h-96 bg-[#2A2D33]  mt-4 flex flex-col items-center gap-y-4 py-4 rounded-md shadow-2xl shadow-black mx-auto"
    >
      <div className="w-11/12 mx-auto pt-4 flex items-center px-4 text-white gap-x-1 border-b-2 max-sm:text-3xl sm:text-3xl font-semibold lg:justify-center pb-2 lg:text-4xl">
        <span>{item.name} | </span>
        <span>{item.weight} CT.</span>
      </div>
      <div
        ref={innerRef}
        className="w-11/12 mx-auto flex items-center gap-x-2 max-lg:flex-col gap-3 lg:mb-3"
      >
        <div className="w-full">
          <Image
            src={item.image}
            alt="GemStone Pic"
            width={300}
            height={150}
            className="mx-auto"
          />
        </div>
        <div className="w-[95%] min-h-60 px-2">
          <table className="border border-gray-300 w-full text-white sm:text-lg">
            <tbody>
              <tr>
                <th className="detail-label">Owner: </th>
                <td className="detail-value">{item.owner?.name}</td>
              </tr>
              <tr>
                <th className="detail-label">Price: </th>
                <td className="detail-value">{item.price} Rs</td>
              </tr>
              <tr>
                <th className="detail-label">Purity: </th>
                <td className="detail-value">{item.purity}</td>
              </tr>
              <tr>
                <th className="detail-label">Color: </th>
                <td className="detail-value">{item.color}</td>
              </tr>
              <tr>
                <th className="detail-label">Shape: </th>
                <td className="detail-value">{item.shape}</td>
              </tr>
              <tr>
                <th className="detail-label">Dimensions: </th>
                <td className="detail-value">{item.dimensions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex items-center justify-center gap-x-4">
        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm"
        >
          <span className="absolute inset-0 bg-red-700 transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <span className="relative z-10 text-white">Remove from Cart</span>
        </button>

        {/* Buy Now Button */}
        <button
          className="relative px-6 py-3 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm"
          onClick={handleBuyNow}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <span className="relative z-10 text-white">Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default CartCard;
