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
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";
import SellerCategories from "@/components/Modals/SellerCategories";

const GovernmentDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const form = useForm({
        defaultValues: {
            categoryName: "",
            ownerName: "",
            walletAddress: "",
            certificate: null,
            sellerWallet: "",
        },
    });

    const handleFileChange = (e) => {
        form.setValue("certificate", e.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            if (!data.certificate) {
                alert("Please upload a valid DOCX template first!");
                return;
            }
            
            setIsLoading(true);

            const hash = await registerSeller({
                sellerWallet: data.walletAddress,
                category: data.categoryName,
            });

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
                        HASH: hash || "N/A",
                    });

                    doc.render();
                    const blob = doc.getZip().generate({ type: "blob" });
                    saveAs(blob, "certificate.docx");
                } catch (error) {
                    console.error(error);
                }
            };

            reader.readAsArrayBuffer(data.certificate);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const getSeller = async () => {
        try {
            const address = form.watch("sellerWallet");
            if(!address){
                toast.error("Address can not be empty!");
                return;
            }
            setIsLoading(true);

            const categories = await getSellerByWallet({
                sellerWallet: address,
            });

            if (categories.length === 0) {
                toast.error(
                    "This wallet address doesn't hold any gem selling certificate."
                );
                setIsLoading(false);
                return;
            }
            
            setCategories(categories);
            setIsLoading(false);
            setShowModal(true);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
            setIsLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-main p-6">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: { background: "#333", color: "white" },
                }}
            />
            {showModal && !isLoading && (
                <SellerCategories
                    categories={categories}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full max-w-3xl bg-card p-8">
                    <h1 className="text-center text-4xl font-extrabold text-primary mb-8">
                        Government Certification Authority
                    </h1>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
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
                            <FormButton
                                text="Submit Certification"
                                type="submit"
                                className="btn-primary"
                            />
                            <hr className="my-6 border-primary" />
                            <FormInput
                                control={form.control}
                                name="sellerWallet"
                                label="Search Seller by Wallet"
                                placeholder="Enter Wallet Address"
                                type="text"
                            />
                            <FormButton
                                text="Get Categories by Wallet"
                                type="button"
                                onClick={getSeller}
                                className="btn-secondary"
                            />
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default GovernmentDashboard;
