"use client";
import React from "react";
import { Form } from "../ui/form";
import FormInput from "./FormInput";
import FormButton from "../FormButton";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UploadGemstoneFirst = ({ setNext, receiveData }) => {
    const user = useSelector((store) => store.user.user);
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            shape: "",
            purity: "",
            dimensions: "",
            weight: "",
            image: "",
            price: "",
            userId: user?.userId,
            coverImage: "",
            moreImages: [],
        },
    });

    const handleFileChange = (e, name) => {
        const files = Array.from(e.target.files);
        console.log(name);
        if (name == "moreImages") {
            if (files.length < 2 || files.length > 6) {
                alert("Please upload between 2 and 6 images.");
                return;
            }
        }
        form.setValue(name, files);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("shape", data.shape);
        formData.append("purity", data.purity);
        formData.append("dimensions", data.dimensions);
        formData.append("weight", data.weight);
        formData.append("price", data.price);
        formData.append("userId", data.userId);
        formData.append("image", data.image[0]);
        formData.append("coverImage", data.coverImage[0]);

        data.moreImages.forEach((file) => {
            formData.append("moreImages", file);
        });

        receiveData(formData);
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
                            name="name"
                            label="Gem Name"
                            placeholder="Enter Gemstone Name"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="description"
                            label="Description"
                            placeholder="Enter Gemstone Description"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="shape"
                            label="Shape"
                            placeholder="Enter Gemstone Shape"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="dimensions"
                            label="Dimensions (a x b x c)"
                            placeholder="Enter Gemstone Dimensions"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="price"
                            label="Price (PKR)"
                            placeholder="Enter Gemstone Price"
                            type="number"
                        />
                        <div className="md:gap-3 flex gap-y-4 flex-col md:flex-row w-full">
                            <span className="w-full md:w-1/2">
                                <FormInput
                                    control={form.control}
                                    name="purity"
                                    label="Purity"
                                    placeholder="Enter Gemstone Purity"
                                    type="description"
                                />
                            </span>
                            <span className="w-full md:w-1/2">
                                <FormInput
                                    control={form.control}
                                    name="weight"
                                    label="Weight (C.T.)"
                                    placeholder="Enter Gemstone Weight"
                                    type="number"
                                />
                            </span>
                        </div>
                        <FormInput
                            control={form.control}
                            name="image"
                            label="Gem Profile image"
                            placeholder="Enter Gemstone Profile Image"
                            type="file"
                            handleFileChange={(e) =>
                                handleFileChange(e, "image")
                            }
                        />
                        <FormInput
                            control={form.control}
                            name="coverImage"
                            label="Gem Cover image"
                            placeholder="Enter Gemstone Cover Image"
                            type="file"
                            handleFileChange={(e) =>
                                handleFileChange(e, "coverImage")
                            }
                        />
                        <FormInput
                            control={form.control}
                            name="moreImages"
                            label="Additional Gemstone images (Min = 2, Max = 6)"
                            placeholder="Enter Gemstone Cover Image"
                            type="file"
                            more={true}
                            handleFileChange={(e) =>
                                handleFileChange(e, "moreImages")
                            }
                        />
                        <FormButton text="Next" type="submit" />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default UploadGemstoneFirst;