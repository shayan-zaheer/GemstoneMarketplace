"use client";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../Schemas/loginFormSchema";
import FormInput from "./FormInput";
import FormButton from "../FormButton";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log("Form data", data);
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
