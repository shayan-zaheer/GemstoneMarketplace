"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const HeroCard = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="max-sm:w-[350px] sm:w-[420px] lg:w-[430px] h-[480px] bg-[#eef2ff] border border-[#7c3aed]/20 rounded-2xl shadow-xl mx-auto flex flex-col justify-between"
    >
      <div className="overflow-hidden w-[90%] h-[280px] mx-auto mt-6 mb-2 rounded-xl">
        <img
          src={"/Diamond.jpg"}
          alt="Gemstone"
          className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </div>

      <div className="flex items-center animate-pulse gap-2 px-5 text-white mb-1">
        <Flame className="text-gray-900  drop-shadow-lg" />
        <span className="text-lg font-bold text-gray-900 tracking-wide  drop-shadow-md">
          Trending
        </span>
      </div>

      <div className="px-5 text-black mb-6">
        <h1 className="text-[#7c3aed] text-2xl font-bold">
          Ruby
        </h1>
        <p className="text-lg font-medium">
          Price: <span className="font-semibold text-gray-500 italic">450,000 Rs</span>
        </p>
        <p className="text-lg font-medium truncate">
          Owned:{" "}
          <span className="font-semibold text-gray-500 italic">
            Shayan Naqvi Jaffri Zaidi
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default HeroCard;
