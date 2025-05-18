"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { checkoutFormSchema } from "../Schemas/checkoutFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import CartTotal from "../CartTotal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { cartActions } from "../../Store/cartSlice";

const CheckoutForm = ({ makePayment }) => {
  const checkoutItem = useSelector((store) => store.checkout.checkoutItem);
  const loggedinUser = useSelector((store) => store.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
    console.log("PLACING");
    await makePayment();
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/checkout`;

      const gemId = checkoutItem.id;
      const sellerId = checkoutItem.owner.userId;
      console.log(loggedinUser);
      const buyerId = loggedinUser.userId || loggedinUser.id;
      const res = await axios.post(
        url,
        {
          gemId,
          sellerId,
          buyerId,
        },
        {
          withCredentials: true,
        }
      );

      console.log(checkoutItem.price);

      let amt = +checkoutItem.price;
      dispatch(cartActions.removeFromCart(checkoutItem));
      makePayment(amt, res.data.order.orderId);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mx-auto  border rounded-lg text-white max-sm:w-11/12 sm:w-11/12  lg:w-2/5"
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
        <div className="w-full h-fit bg-card p-4 rounded-lg shadow-2xl ring-1 ring-slate-300 text-black">
          <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
          <div className="w-full min-h-20  flex flex-col gap-y-3  mb-3 ">
            <div className="w-full flex justify-between px-2 text-xl font-medium border-b border-primary">
              <span>Product</span>
              <span>Price</span>
            </div>
            <div className="w-full flex justify-between px-2 border-b border-primary ">
              <span className="font-semibold text-lg">
                {checkoutItem.name} {"  "}
              </span>
              <span>{checkoutItem.price} PKR</span>
            </div>
            {/* {products.map((product, index) => (
            ))} */}
            <div className="w-full flex justify-between px-2 font-medium border-b border-primary">
              <span>Subtotal</span>
              <span>{subtotal} PKR</span>
            </div>
            <div className="w-full flex justify-between px-2 font-medium border-b border-primary">
              <span>GST(15%)</span>
              <span>{GST} PKR</span>
            </div>
            <div className="w-full flex justify-between px-2 font-medium border-b border-primary">
              <span>Total</span>
              <span>{total} PKR</span>
            </div>
          </div>

          {/* <RadioGroup
            defaultValue={form.watch("paymentMethod")}
            onValueChange={(value) => form.setValue("paymentMethod", value)}
            className="font-medium my-2 "
          >
            <label className="flex items-center space-x-3">
              <RadioGroupItem value="paypro" className="h-5 w-5  bg-blue-400" />
              <span>SafePay</span>
            </label>
          </RadioGroup> */}
          {
            <button
              disabled={isLoading}
              onClick={() => handleCheckout()}
              className="relative px-6 py-2 font-semibold text-white border border-primary hover:border-transparent  overflow-hidden group rounded-sm mt-2 mx-auto w-full group"
            >
              <span className="absolute inset-0 btn-primary transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
              <div className="flex items-center justify-center gap-x-2">
                <span className="relative z-10 text-black group-hover:text-white text-lg">
                  {isLoading ? "Processing...." : "Place Order"}
                </span>
              </div>
            </button>
          }
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
