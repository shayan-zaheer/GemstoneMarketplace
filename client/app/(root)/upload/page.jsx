"use client"
import React, { useState } from "react";
import UploadGemstoneFirst from "@/components/Form/UploadGemstoneFirst";
import UploadGemstoneSecond from "@/components/Form/UploadGemstoneSecond";

const UploadGem = () => {
    const [next, setNext] = useState(false);
  return (
    <div className="relative top-20 min-h-[94vh] bg-[#1a1c1ff8] mb-20 p-12 flex justify-center items-center">
      {!next ? <UploadGemstoneFirst setNext={setNext} /> : <UploadGemstoneSecond setNext={setNext} />
      }
        
    </div>
  );
};

export default UploadGem;
