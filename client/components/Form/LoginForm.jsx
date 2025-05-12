"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../Schemas/loginFormSchema";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import axios from "axios";
import toast from "react-hot-toast";
import { cartActions } from "@/Store/cartSlice";
import { useDispatch } from "react-redux";
import { userActions } from "@/Store/userSlice";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      if (result.data.status === "success") {
        dispatch(userActions.setUser(result?.data?.user));
        dispatch(cartActions.setUser(result?.data?.user?.userId));
        setIsLoading(false);
        return toast.success("You're logged in!");
      } else {
        return toast.error("Unexpected response from server.");
        setIsLoading(false)
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";

        setIsLoading(false)
      return toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative z-10 text-white flex flex-col gap-y-4 "
      >
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter Your Email"
          type="email"
        />
        <FormInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter Your Password"
          type="password"
        />
        {isLoading ? (
          <button className="border border-slate-900 h-10 rounded-sm bg-slate-900" disabled>Processing...</button>
        ) : (
          <FormButton text="Login" type="submit" />
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
