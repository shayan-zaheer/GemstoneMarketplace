"use client";
import React from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import { useForm } from "react-hook-form";

const UploadGemstoneSecond = ({ setNext }) => {
  const form = useForm({
    defaultValues: {
      transactionHash: "",
      category: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="relative z-10 text-white flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="bg-gradient-to-r p-[0.1rem] from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  md:w-[500px] rounded-lg border-transparent">
          <div className="min-h-full w-full bg-[#1a1c1cf0] rounded-md text-white p-4 flex justify-center flex-col gap-y-4">
            <h1 className="from-[#00E8FC] via-[#D400A5] to-[#6A00F4] bg-gradient-to-r text-transparent md:text-3xl text-xl text-center mb-2 font-bold bg-clip-text">
              Upload Gemstone
            </h1>
            <FormInput
              control={form.control}
              name="transactionHash"
              label="Transaction Hash"
              placeholder="Enter the certificate Transaction Hash"
              type="text"
            />
            <FormInput
              control={form.control}
              name="category"
              label="Gem Category"
              placeholder="Enter Gemstone Category"
              type="text"
            />
            <div className="flex md:gap-8 gap-4 flex-col md:flex-row">
              <FormButton
                onClick={() => setNext(false)}
                text="Back"
              ></FormButton>
              <FormButton
                // onClick={() => setNext(false)}
                text="Submit"
              ></FormButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UploadGemstoneSecond;
