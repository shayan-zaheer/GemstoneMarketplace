"use client"
import React from "react";
import GemstoneCard from "@/components/GemstoneCard";
import {motion} from "framer-motion"


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
      id: 8,
      name: "Garnet",
      image: "/garnet.png",
      owner: "Robert Downey",
      price: "165ETH",
    },
  ];
  return (
    <div className="relative min-h-screen bg-[#1a1c1ff8] py-8 px-12 mt-20 ">
      <motion.div 
      initial={{y: 600}}
      animate={{y:0}}
      transition={{type: "tween", duration: 0.5}}
      className="flex flex-wrap justify-evenly">
        {gemstones.map((gem) => (
          <GemstoneCard key={gem.id} info={gem} />
        ))}
      </motion.div>
    </div>
  );
};

export default Products;
