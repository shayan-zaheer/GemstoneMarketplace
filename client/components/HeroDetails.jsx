"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const HeroDetails = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col  max-sm:w-full sm:w-full md:w-full lg:w-2/3 pr-5"
    >
      <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold lg:w-11/12">
        {" "}
        Trade{" "}
        <span className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text ">
          Gemstones
        </span>{" "}
        at the Best Prices
      </h1>
      <div className=" my-4">
        <h1 className="text-slate-300 w-11/12 sm:text-lg md:text-xl font-semibold lg:w-10/12">
          Find rare and certified gemstones in seconds. Buy or sell gemstones
          with ease.
        </h1>
      </div>
      <div className="flex gap-x-10">
        <Button
          className="px-5 py-6 hover:scale-105 transition-all duration-300 ease-linear md:px-6 md:py-7  md:text-lg"
          variant="outline"
        >
          Explore Gemstones
        </Button>
        <Button className="px-5 py-6 md:px-6 md:py-7  md:text-lg bg-transparent border border-white hover:scale-105 transition-all duration-300 ease-linear hover:bg-white hover:text-black ">
          Sell my Gemstone
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroDetails;
