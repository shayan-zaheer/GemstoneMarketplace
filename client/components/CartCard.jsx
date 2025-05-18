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
      className="w-[95%] min-h-96 bg-surface  mt-4 flex flex-col items-center gap-y-4 py-4 rounded-md shadow-xl shadow-black mx-auto"
    >
      <div className="w-11/12 mx-auto pt-4 flex items-center px-4 text-black gap-x-1 border-b-2 border-primary max-sm:text-3xl sm:text-3xl font-semibold lg:justify-center pb-2 lg:text-4xl">
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
        <div className="w-[95%] min-h-60 px-2 border-2 border-black ">
          <table className="w-full text-black sm:text-lg ">
            <tbody>
              <tr className="border-b-2 border-black ">
                <th className="detail-label border  px-2 py-1">Owner:</th>
                <td className="detail-value border  px-2 py-1">
                  {item.owner?.name}
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <th className="detail-label border  px-2 py-1">Price:</th>
                <td className="detail-value border  px-2 py-1">
                  {item.price} Rs
                </td>
              </tr>
              <tr className="border-b-2 border-black ">
                <th className="detail-label border  px-2 py-1">Weight:</th>
                <td
                  className={`detail-value border  px-2 py-1 ${
                    item.weight ? "" : "opacity-75"
                  }`}
                >
                  {item.weight
                    ? `${item.weight} Carat`
                    : "Seller does not provide weight info"}
                </td>
              </tr>
              <tr className="border-b-2 border-black ">
                <th className="detail-label border  px-2 py-1">Purity:</th>
                <td
                  className={`detail-value border  px-2 py-1 ${
                    item.purity ? "" : "opacity-75"
                  }`}
                >
                  {item.purity || "Seller does not provide purity info"}
                </td>
              </tr>
              <tr className="border-b-2 border-black ">
                <th className="detail-label border  px-2 py-1">Shape:</th>
                <td
                  className={`detail-value border  px-2 py-1 ${
                    item.shape ? "" : "opacity-75"
                  }`}
                >
                  {item.shape || "Seller does not provide shape info"}
                </td>
              </tr>
              <tr className="border ">
                <th className="detail-label border  px-2 py-1">Dimensions:</th>
                <td
                  className={`detail-value border  px-2 py-1 ${
                    item.dimensions ? "" : "opacity-75"
                  }`}
                >
                  {item.dimensions || "Seller does not provide dimensions info"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex items-center justify-center gap-x-4">
        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="relative px-6 py-3 font-semibold text-white border border-gray-700  overflow-hidden group rounded-sm"
        >
          <span className="absolute inset-0 bg-red-700 transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <span className="relative z-10 text-black group-hover:text-white">
            Remove from Cart
          </span>
        </button>

        {/* Buy Now Button */}
        <button
          className="relative px-6 py-3 font-semibold text-white border border-gray-700  overflow-hidden group rounded-sm"
          onClick={handleBuyNow}
        >
          <span className="absolute inset-0 bg-primary transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
          <span className="relative z-10 text-black group-hover:text-white">
            Buy Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartCard;
