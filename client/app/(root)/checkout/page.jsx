"use client";
import CheckoutForm from "@/components/Form/CheckoutForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Safepay } from "@sfpy/node-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Checkout = () => {
    const router = useRouter();

    const makePayment = async (amount, orderId) => {
        console.log(amount, orderId);
        // 8b121a0de795e4a68fb182ebb761f7f9c2a83f08c3446dcbb61198fd53231346
        // 55158de7c3ff916318ee271bcd1a919e2c0a8566dfadb1c4b872213346e0ffab
        try {
            const safepay = new Safepay({
                environment: "sandbox",
                apiKey: process.env.NEXT_PUBLIC_SAFEPAY_API_KEY,
                v1Secret: "bar",
                webhookSecret: process.env.NEXT_PUBLIC_SAFEPAY_WEBHOOK_SECRET,
            });


            const dt  = await safepay.payments.create({
                currency: "PKR",
                amount: amount,
            });
            console.log(dt)
            const { token }  = dt

            const url = safepay.checkout.create({
                token,
                orderId: orderId,
                cancelUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000" }/checkout`,
                redirectUrl:  `${process.env.NEXT_PUBLIC_FRONTEND_URL ||  "http://localhost:3000" }/myOrders`,
                source: "custom",
                webhooks: true,
            });

            console.log(url, "PAY HERE");
            router.push(url);
        } catch (e) {
            toast.error(e.message)
            console.log(e);
        }
    };

    const checkoutItem = useSelector((store) => store.checkout.checkoutItem);
    const isEmpty = !checkoutItem || Object.keys(checkoutItem).length === 0;
    return (
        <div className={"w-full  bg-[#1a1c1ff8] py-20"}>
            {!isEmpty ? (
                <>
                    <div className="w-full h-44 bg-[#1a1c1ff8] flex items-center justify-center border-t-2 border-b-2 border-[#f9f9f915]">
                        <h1 className="text-5xl text-white font-semibold">
                            Checkout
                        </h1>
                    </div>
                    <div className="w-full h-12 my-4 px-[5%] flex items-center text-center justify-center">
                        <h1 className="text-3xl text-white font-semibold ">
                            Billing Details
                        </h1>
                    </div>
                    <CheckoutForm makePayment={makePayment} />
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
