"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { signupFormSchema } from "../Schemas/signupFormSchema";
import FormInput from "./FormInput";
import FormButton from "../FormButton";

const SignupForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      residenceAddress: "",
      contact: "",
      profileImage: "",
      cnic: "",
      walletAddress: "",
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
          name="name"
          label="Name"
          placeholder="Enter Your Name"
        />
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
        <FormInput
          control={form.control}
          name="residenceAddress"
          label="Residence Address"
          placeholder="Enter Your Residence Address"
        />
        <FormInput
          control={form.control}
          name="contact"
          label="Contact"
          placeholder="Enter Your Contact Number"
        />
        <FormInput
          control={form.control}
          name="cnic"
          label="CNIC"
          placeholder="Enter Your CNIC"
        />
        <FormInput
          control={form.control}
          name="walletAddress"
          label="Wallet Address"
          placeholder="Enter Your Wallet Address"
        />
        <div className="relative w-full border border-gray-500 rounded-lg p-2 cursor-pointer bg-gray-800 text-white text-center space-y-2">
          <label htmlFor="file">Upload Image</label>
          <Input
            type="file"
            id="file"
            {...form.register("profileImage")}
            className="cursor-pointer"
          />
        </div>
        <FormButton text="Signup" type="submit" />
      </form>
    </Form>
  );
};

export default SignupForm;
