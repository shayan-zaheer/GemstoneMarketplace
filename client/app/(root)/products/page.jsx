"use client";
import React from "react";
import GemstoneCard from "@/components/GemstoneCard";
import { motion } from "framer-motion";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";

const Products = () => {
  const gemstones = [
    {
      id: 1,
      name: "Shiny Emerald",
      image: "/emerald.jpg",
      owner: "Joe Burgh",
      price: "150ETH",
    },
    {
      id: 2,
      name: "Diamond",
      image: "/diamond.jpg",
      owner: "James Bill",
      price: "200ETH",
    },
    {
      id: 3,
      name: "Sapphire",
      image: "/sapphire.jpg",
      owner: "Joe Murphy",
      price: "190ETH",
    },
    {
      id: 4,
      name: "Amethyst",
      image: "/amethyst.jpg",
      owner: "Michael Starc",
      price: "180ETH",
    },
    {
      id: 5,
      name: "Ruby",
      image: "/ruby.png",
      owner: "Sarah Lee",
      price: "170ETH",
    },
    {
      id: 6,
      name: "Topaz",
      image: "/topaz.png",
      owner: "David Kim",
      price: "160ETH",
    },
    {
      id: 7,
      name: "Opal",
      image: "/opal.png",
      owner: "Emma Watson",
      price: "155ETH",
    },
    {
      id: 8,
      name: "Garnet",
      image: "/garnet.png",
      owner: "Robert Downey",
      price: "165ETH",
    },
  ];
  return (
    <div className="relative min-h-screen bg-[#1a1c1ff8] py-8 px-12 mt-20 ">
      <div className="flex md:justify-end md:mr-20 justify-center">
        <DropdownMenuRadioGroupDemo
          ddText="Sort By"
          valuesText={["newest", "price"]}
          values={["Newest", "Price"]}
        />
      </div>
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        className="flex flex-wrap justify-evenly"
      >
        {gemstones.map((gem) => (
          <GemstoneCard key={gem.id} info={gem} />
        ))}
      </motion.div>
    </div>
  );
};

export default Products;
