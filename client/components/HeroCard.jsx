"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const HeroCard = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="max-sm:w-[350px] sm:w-[420px] lg:w-[430px] h-[450px]   bg-[#47494aeb] mt-6 rounded-xl shadow-lg relative mx-auto"
    >
      <div className="overflow-hidden max-sm:w-[320px] sm:w-[380px] lg:w-[90%] h-[320px] mx-auto mt-6 mb-2 rounded-xl">
        <img
          src={"/Emerald.png"}
          alt="Gemstone"
          className=" w-full  h-full object-cover rounded-xl hover:scale-105 transition-all duration-300 ease-linear mx-auto "
        />
      </div>
      <div className="absolute top-10 left-8 flex items-center gap-x-2 bg-[#343431c4] backdrop-blur-md px-4 py-2 rounded-lg text-white border border-white/20 shadow-lg">
        <Flame className="text-orange-500 animate-pulse drop-shadow-lg transition-all ease-linear " />

        <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text drop-shadow-md animate-pulse">
          Trending
        </span>
      </div>
      <div className="flex justify-between items-center px-5 text-white ">
        <div>
          <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-2xl font-bold">
            Emerald
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-200 tracking-wide ">
            Price : <span className="font-semibold text-white">55,000 Rs</span>
          </p>
          <p className="text-lg sm:text-xl font-medium text-gray-200 tracking-wide line-clamp-1">
            Owned :{" "}
            <span className="font-semibold text-white ">
              Shayan Naqvi Jaffri Zaidi
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
