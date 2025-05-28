"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { verifySeller, uploadGemOnChain } from "@/services/gemBlockchain";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadGemSchema2 } from "../Schemas/uploadGemSchema2";
import { useRouter } from "next/navigation";

const UploadGemstoneSecond = ({ setNext, gemData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(uploadGemSchema2),
    defaultValues: {
      certificate: "",
      transactionHash: "",
      category: "",
    },
  });

  const handleFileChange = (e, name) => {
    const files = Array.from(e.target.files);
    form.setValue(name, files);
  };

  const onSubmit = async (data) => {
    console.log("FIRST PAGE DATA:", gemData);
    console.log("SECOND PAGE DATA:", data);
    console.log(data["transactionHash"]);
    console.log(gemData, data);
    setIsLoading(true);
    try {
      const isVerified = await verifySeller(
        data["transactionHash"],
        data.category
      );
      if (!isVerified) {
        toast.error(
          "Your selected category is not correct!\nReview the certificate and try again."
        );
        setIsLoading(false);
        return;
      } else {
        let hash=`${data["transactionHash"]}`
        gemData.append("txHash", String(hash));
        // let obj= {...gemData,txHash:data["transactionHash"]}
        console.log("UPLOAD API PAYLOAD:",typeof hash);
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems`,
          gemData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Result: ", result);
        if (result?.data?.status == "success") {
          const tx = await uploadGemOnChain(
            result?.data?.data?.id,
            data.category,
            data["transactionHash"]
          );
          // console.log(tx)
          if (tx.status == "Success") {
            toast.success(tx.message);
            router.push(`/products`);
          } else {
            toast.error(tx.message);
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message + "Invalid Data");
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="relative z-10 text-white flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
          <div className="min-h-full md:min-w-[450px] w-full bg-surface border border-primary rounded-md p-4 text-gray-700 flex justify-center flex-col gap-y-4">
            <h1 className=" md:text-3xl text-xl text-center mb-2 font-bold text-primary">
              Upload Gemstone
            </h1>
            <FormInput
              control={form.control}
              name="certificate"
              label="Seller Certificate (Approved by Govt.)"
              placeholder="Upload Certificate"
              type="file"
              handleFileChange={(e) => handleFileChange(e, "certificate")}
            />
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
                disabled={isLoading}
                text="Submit"
                type={"submit"}
              ></FormButton>
            </div>
          </div>
      </form>
    </Form>
  );
};

export default UploadGemstoneSecond;
