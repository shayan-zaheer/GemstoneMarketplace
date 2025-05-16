"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const HeroDetails = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col max-sm:w-full sm:w-full md:w-full lg:w-2/3 pr-5"
    >
      <h1 className="text-black text-5xl sm:text-6xl md:text-7xl font-semibold lg:w-11/12 max-sm:text-4xl max-sm:text-center">
        Trade{" "}
        <span className="text-[#7c3aed]">
          Gemstones
        </span>{" "}
        at the Best Prices
      </h1>

      <p className="text-gray-800 mt-4 w-11/12 sm:text-lg md:text-xl font-medium lg:w-10/12 max-sm:text-center">
        Find rare and certified gemstones in seconds. Buy or sell gemstones with ease.
      </p>

      <div className="flex gap-6 mt-8 max-sm:justify-center max-sm:flex-col sm:flex-row">
        <Button
          className="px-6 py-6 text-white bg-[#7c3aed] border hover:bg-[#7c3aed]/80 hover:scale-102 hover:text-white transition-all duration-200 ease-in-out font-semibold text-base md:text-lg"
          variant="outline"
        >
          Explore Gemstones
        </Button>
        <Button className="px-6 py-6 bg-white text-[#7c3aed] border border-[#7c3aed] hover:scale-102 transition-all duration-200 hover:bg-[#7c3aed] hover:text-white ease-in-out font-semibold text-base md:text-lg">
          Sell my Gemstone
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroDetails;
