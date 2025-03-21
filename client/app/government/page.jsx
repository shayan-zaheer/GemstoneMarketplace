"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { registerSeller, getAllSellers } from "@/services/blockchain";

const GovernmentDashboard = () => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        categoryName: "",
        ownerName: "",
        walletAddress: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
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
                    NAME: formData.ownerName,
                    DATE: new Date().toLocaleDateString(),
                    CATEGORY: formData.categoryName,
                    ADDRESS: formData.walletAddress,
                });

                doc.render();
                const blob = doc.getZip().generate({ type: "blob" });
                saveAs(blob, "certificate.docx");
            } catch (error) {
                console.error("Error rendering document", error);
            }
        };
        await registerSeller({
            sellerWallet: formData.walletAddress,
            category: formData.categoryName,
        });
        reader.readAsBinaryString(file);
    };

    const getSellers = async() => {
        const sellers = await getAllSellers();
        console.log(sellers);
    }

    return (
        <div className="w-full min-h-screen bg-[#1a1c1ff8] text-white flex flex-col items-center pt-20">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text"
            >
                Government Certification Authority
            </motion.h1>
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="w-1/2 mt-10 bg-gray-800 p-6 rounded-lg shadow-lg"
            >
                <label className="block mb-3">
                    Upload Template:
                    <input
                        type="file"
                        name="certificate"
                        accept=".docx"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 mt-1 bg-gray-700 border-none rounded"
                        required
                    />
                </label>
                <label className="block mb-3">
                    Category Name:
                    <input
                        type="text"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-700 border-none rounded"
                        required
                    />
                </label>
                <label className="block mb-3">
                    Owner Name:
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-700 border-none rounded"
                        required
                    />
                </label>
                <label className="block mb-3">
                    Wallet Address:
                    <input
                        type="text"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-700 border-none rounded"
                        required
                    />
                </label>
                <Button
                    type="submit"
                    className="w-full py-3 mt-5 bg-blue-500 hover:bg-blue-700"
                >
                    Submit Certification
                </Button>
                <Button
                type="button"
                    onClick={getSellers}
                    className="w-full py-3 mt-5 bg-blue-500 hover:bg-blue-700"
                >
                    Get Existing Sellers
                </Button>
            </motion.form>
        </div>
    );
};

export default GovernmentDashboard;
