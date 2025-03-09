"use client";
import React, { useEffect, useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "../Schemas/signupFormSchema.js";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import { useAccount } from "wagmi";
import CustomTooltip from "../Tooltip";
import axios from "axios";
import toast from "react-hot-toast";

const SignupForm = () => {
  const { address } = useAccount();
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      residenceAddress: "",
      contact: "",
      cnic: "",
      walletAddress: "",
    },
  });

  useEffect(() => {
    if (address) {
      form.setValue("walletAddress", address);
    }
  }, [address, form]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        if (selectedFile) {
          formData.append("profileImage", selectedFile);
        }

      console.log(formData);
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(result.data.status == "success"){
        toast.success("Your account has been created!");
      }
      
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative z-10 text-white flex flex-col gap-y-4"
      >
        <FormInput control={form.control} name="name" label="Full Name" placeholder="Enter Your Full Name" type="text" />
        <FormInput control={form.control} name="email" label="Email" placeholder="Enter Your Email" type="email" />
        <FormInput control={form.control} name="password" label="Password" placeholder="Enter Your Password" type="password" />

        <div className="flex flex-col">
          <label className="text-lg font-bold text-gray-300">Profile Image</label>
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profileImage"
            />
            <label
              htmlFor="profileImage"
              className="block w-full text-sm text-ellipsis truncate text-gray-300 bg-gray-800 border border-gray-600 rounded-md cursor-pointer p-2 text-center hover:bg-gray-700"
            >
              {selectedFile ? selectedFile.name : "Upload Your Image"}
            </label>
          </div>
        </div>


        <FormInput control={form.control} name="residenceAddress" label="Residence Address" placeholder="Enter Your Residence Address" type="text" />
        <FormInput control={form.control} name="contact" label="Contact Number" placeholder="Enter Your Contact Number" type="text" />
        <FormInput control={form.control} name="cnic" label="CNIC" placeholder="Enter Your CNIC" type="text" />

        <CustomTooltip content={form.watch("walletAddress") ? "You have connected your wallet!" : "Click on 'Connect Wallet' to connect your wallet!"}>
          <FormInput control={form.control} name="walletAddress" label="Wallet Address" placeholder="Your Wallet Address" type="text"  />
        </CustomTooltip>

        <FormButton text="Sign Up" type="submit" />
      </form>
    </Form>
  );
};

export default SignupForm;
