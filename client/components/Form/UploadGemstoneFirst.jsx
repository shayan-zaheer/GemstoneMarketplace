"use client";
import React from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import { useForm } from "react-hook-form";

const UploadGemstoneFirst = ({setNext}) => {
  const form = useForm({
    defaultValues: {
      gemName: "",
      gemDesc: "",
      gemShape: "",
      gemPurity: "",
      gemDim: "",
      gemWeight: "",
      gemProfileImg: "",
      gemCoverImg: "",
      gemMoreImg: [],
    },
  });
  
  const handleFileChange = (e,name) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    console.log(name)
    if(name=="gemMoreImg"){
      if (files.length < 2 || files.length > 6) {
        alert("Please upload between 2 and 6 images.");
        return;
      }
    }
    form.setValue(name, files); // ✅ Store multiple files in react-hook-form state
  };

  const onSubmit = (data) => {
    console.log(data.gemMoreImg);
    console.log(data);
    setNext(true);
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
              name="gemName"
              label="Gem Name"
              placeholder="Enter Gemstone Name"
              type="text"
            />
            <FormInput
              control={form.control}
              name="gemDesc"
              label="Description"
              placeholder="Enter Gemstone Description"
              type="text"
            />
            <FormInput
              control={form.control}
              name="gemShape"
              label="Shape"
              placeholder="Enter Gemstone Shape"
              type="text"
            />
            <FormInput
              control={form.control}
              name="gemDim"
              label="Dimensions (a x b x c)"
              placeholder="Enter Gemstone Dimensions"
              type="text"
            />
            <div className="md:gap-3 flex gap-y-4 flex-col md:flex-row w-full">
              <span className="w-full md:w-1/2">
                <FormInput
                  control={form.control}
                  name="gemPurity"
                  label="Purity"
                  placeholder="Enter Gemstone Purity"
                  type="description"
                />
              </span>
              <span className="w-full md:w-1/2">
                <FormInput
                  control={form.control}
                  name="gemWeight"
                  label="Weight (C.T.)"
                  placeholder="Enter Gemstone Weight"
                  type="number"
                />
              </span>
            </div>
            <FormInput
              control={form.control}
              name="gemProfileImg"
              label="Gem Profile image"
              placeholder="Enter Gemstone Profile Image"
              type="file"
              handleFileChange={(e)=>handleFileChange(e,"gemProfileImg")}
            />
            <FormInput
              control={form.control}
              name="gemCoverImg"
              label="Gem Cover image"
              placeholder="Enter Gemstone Cover Image"
              type="file"
              handleFileChange={(e)=>handleFileChange(e,"gemCoverImg")}
            />
            <FormInput
              control={form.control}
              name="gemMoreImg"
              label="Additional Gemstone images (Min = 2, Max = 6)"
              placeholder="Enter Gemstone Cover Image"
              type="file"
              more={true}
              handleFileChange={(e)=>handleFileChange(e,"gemMoreImg")}
            />
            <FormButton text="Next" type="submit" />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UploadGemstoneFirst;
