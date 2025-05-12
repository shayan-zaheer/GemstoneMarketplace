"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { checkoutFormSchema } from "../Schemas/checkoutFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import CartTotal from "../CartTotal";
import { useSelector } from "react-redux";
import axios from "axios";


const CheckoutForm = ({ makePayment }) => {
  const checkoutItem = useSelector((store) => store.checkout.checkoutItem);
  const loggedinUser = useSelector((store) => store.user.user);
  console.log(checkoutItem);
  const subtotal = +checkoutItem.price;
  const GST = subtotal * 0.15;
  const total = subtotal + GST;
  const products = [
    {
      name: "Product 1",
      price: 100,
      quantity: 1,
    },
    {
      name: "Product 2",
      price: 200,
      quantity: 1,
    },
  ];
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      country: "",
      postCode: "",
      paymentMethod: "cod",
    },
  });
  const onSubmit = async (data) => {
    console.log("PLACING")
    await makePayment()
  };


  const handleCheckout = async () => {

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/checkout`

      const gemId = checkoutItem.id;
      const sellerId = checkoutItem.owner.userId;
      const buyerId = loggedinUser.userId
console.log(buyerId)
      const res = await axios.post(url, {
        gemId, sellerId,buyerId
      }, {
        withCredentials: true
      })

      console.log(checkoutItem.price)

      let amt = +checkoutItem.price

      makePayment(amt,res.data.order.orderId)

    }
    catch (e) {
      console.log(e)
    }


  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mx-auto p-4 border rounded-lg text-white max-sm:w-11/12 sm:w-11/12 flex flex-col gap-y-4 md:flex-row gap-x-4 lg:w-9/12"
      >
        {/* <div className="w-full h-auto p-2 flex flex-col gap-y-2">
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter Your Name"
          />
          <FormInput
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Enter Your Phone Number"
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter Your Email"
          />
          <FormInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter Your Address"
          />
          <FormInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter Your City"
          />
          <FormInput
            control={form.control}
            name="country"
            label="Country"
            placeholder="Enter Your Country"
          />
          <FormInput
            control={form.control}
            name="postCode"
            label="Postal Code"
            placeholder="Enter Your Postal Code"
          />
        </div> */}
        <div className="w-full h-fit bg-[#2a2c2f9f] p-4 rounded-lg  md:w-8/12">
          <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
          <div className="w-full min-h-20  flex flex-col gap-y-3  mb-3 ">
            <div className="w-full flex justify-between px-2 text-xl font-medium border-b">
              <span>Product</span>
              <span>Price</span>
            </div>
            <div className="w-full flex justify-between px-2 border-b ">
              <span className="font-semibold text-lg">
                {checkoutItem.name} {"  "}
              </span>
              <span>{checkoutItem.price}</span>
            </div>
            {/* {products.map((product, index) => (
            ))} */}
            <div className="w-full flex justify-between px-2 font-medium border-b">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="w-full flex justify-between px-2 font-medium border-b">
              <span>GST(15%)</span>
              <span>{GST}</span>
            </div>
            <div className="w-full flex justify-between px-2 font-medium border-b">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>

          <RadioGroup
            defaultValue={form.watch("paymentMethod")}
            onValueChange={(value) => form.setValue("paymentMethod", value)}
            className="font-medium my-2 "
          >
            <label className="flex items-center space-x-3">
              <RadioGroupItem value="cod" className="  h-5 w-5 bg-blue-400" />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center space-x-3">
              <RadioGroupItem value="paypro" className="h-5 w-5  bg-blue-400" />
              <span>PayPro</span>
            </label>
          </RadioGroup>
          <button
            onClick={() => handleCheckout()}
            className="relative px-6 py-2 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm mt-2 mx-auto w-full"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
            <div className="flex items-center justify-center gap-x-2">
              <span className="relative z-10 text-white">Place Order</span>
            </div>
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
