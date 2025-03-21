"use client";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/FormButton";
import { useForm } from "react-hook-form";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { registerSeller, getSellerByWallet } from "@/services/blockchain";

const GovernmentDashboard = () => {
    const form = useForm({
        defaultValues: {
            categoryName: "",
            ownerName: "",
            walletAddress: "",
            certificate: null,
            sellerWallet: null
        },
    });

    const handleFileChange = (e) => {
        form.setValue("certificate", e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!data.certificate) {
            alert("Please upload a DOCX template first!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const content = event.target.result;
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    delimiters: { start: "{{", end: "}}" },
                });
                doc.setData({
                    NAME: data.ownerName,
                    DATE: new Date().toLocaleDateString(),
                    CATEGORY: data.categoryName,
                    ADDRESS: data.walletAddress,
                });
                doc.render();
                const blob = doc.getZip().generate({ type: "blob" });
                saveAs(blob, "certificate.docx");
            } catch (error) {
                console.error("Error rendering document", error);
            }
        };
        reader.readAsBinaryString(data.certificate);

        await registerSeller({
            sellerWallet: data.walletAddress,
            category: data.categoryName,
        });
    };

    const getSeller = async () => {
        const address = form.watch("sellerWallet");
        const categories = await getSellerByWallet({ sellerWallet: address });
        console.log(categories);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] bg-clip-text text-transparent mb-6">
                    Government Certification Authority
                </h1>
                <Form {...form}>
                    <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput
                            control={form.control}
                            name="certificate"
                            label="Upload Template"
                            type="file"
                            handleFileChange={handleFileChange}
                        />
                        <FormInput
                            control={form.control}
                            name="categoryName"
                            label="Category Name"
                            placeholder="Enter Category Name"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="ownerName"
                            label="Owner Name"
                            placeholder="Enter Owner Name"
                            type="text"
                        />
                        <FormInput
                            control={form.control}
                            name="walletAddress"
                            label="Wallet Address"
                            placeholder="Enter Wallet Address"
                            type="text"
                        />
                        <FormButton text="Submit Certification" type="submit" />
                        <FormInput
                            control={form.control}
                            name="sellerWallet"
                            label="Search Seller by Wallet"
                            placeholder="Enter Wallet Address"
                            type="text"
                        />
                        <FormButton text="Get Seller by Wallet" type="button" onClick={getSeller} />
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default GovernmentDashboard;
