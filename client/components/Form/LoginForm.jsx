"use client";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../Schemas/loginFormSchema";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cartActions } from "@/Store/cartSlice";
import { useDispatch } from "react-redux";
import { userActions } from "@/Store/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      if (result.data.status == "success") {
        dispatch(userActions.setUser(result?.data?.user));
        dispatch(cartActions.setUser(result?.data?.user?.userId));
        toast.success("You're logged in!");
        console.log(result.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Login Error:", error);
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
        <FormButton text="Login" type="submit" />
      </form>
    </Form>
  );
};

export default LoginForm;