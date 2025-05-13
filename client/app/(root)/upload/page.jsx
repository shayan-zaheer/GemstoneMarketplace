"use client";
import React, { useState } from "react";
import UploadGemstoneFirst from "@/components/Form/UploadGemstoneFirst";
import UploadGemstoneSecond from "@/components/Form/UploadGemstoneSecond";
import { useSelector } from "react-redux";
import Unauthorized from "@/components/Unauthorized";

const UploadGem = () => {
  const [next, setNext] = useState(false);
  const [gemData, setGemData] = useState("");
  const loggedInUser = useSelector((store) => store?.user?.user);
  const receiveData = async (data) => {
    console.log("Receive Data", data);
    setGemData((p) => data);
  };

  return (
    <>
      {loggedInUser?.role != "user" ? (
        <Unauthorized />
      ) : (
        <div className="relative top-20 min-h-[94vh] bg-[#1a1c1ff8] mb-20 p-12 flex justify-center items-center">
          {!next ? (
            <UploadGemstoneFirst setNext={setNext} receiveData={receiveData} />
          ) : (
            <UploadGemstoneSecond setNext={setNext} gemData={gemData} />
          )}
        </div>
      )}
    </>
  );
};

export default UploadGem;
