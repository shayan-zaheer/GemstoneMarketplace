"use client";
import React, { useEffect, useState } from "react";
import GemstoneCard from "@/components/GemstoneCard";
import { motion } from "framer-motion";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";
import PageNumbering from "@/components/PageNumbering";

const Products = () => {
  const initialGemstones = [
    {
      id: 1,
      name: "Shiny Emerald",
      image: "/emerald.jpg",
      owner: "Joe Burgh",
      price: "150ETH",
      uploadDate: "2025-02-14T00:00:00.000Z"
    },
    {
      id: 2,
      name: "Diamond",
      image: "/diamond.jpg",
      owner: "James Bill",
      price: "200ETH",
      uploadDate: "2025-02-07T00:00:00.000Z"
    },
    {
      id: 3,
      name: "Sapphire",
      image: "/sapphire.jpg",
      owner: "Joe Murphy",
      price: "190ETH",
      uploadDate: "2025-02-06T00:00:00.000Z"
    },
    {
      id: 4,
      name: "Amethyst",
      image: "/amethyst.jpg",
      owner: "Michael Starc",
      price: "180ETH",
      uploadDate: "2025-02-11T00:00:00.000Z"
    },
    {
      id: 5,
      name: "Ruby",
      image: "/ruby.png",
      owner: "Sarah Lee",
      price: "170ETH",
      uploadDate: "2025-02-12T00:00:00.000Z"
    },
    {
      id: 6,
      name: "Topaz",
      image: "/topaz.png",
      owner: "David Kim",
      price: "160ETH",
      uploadDate: "2025-02-01T00:00:00.000Z"
    },
    {
      id: 7,
      name: "Opal",
      image: "/opal.png",
      owner: "Emma Watson",
      price: "155ETH",
      uploadDate: "2025-02-10T00:00:00.000Z"
    },
    {
      id: 8,
      name: "Garnet",
      image: "/garnet.png",
      owner: "Robert Downey",
      price: "165ETH",
      uploadDate: "2025-01-30T00:00:00.000Z"
    },
  ];
  const data={
    currentPage: 1,
    totalPages: 1,
    gemstoneData: initialGemstones
  }
  const [currentPage, setCurrentPage] = useState(data.currentPage)
  const [gemstones, setGemstones] = useState(data.gemstoneData);
  const [position, setPosition] = useState("newest");

  useEffect(() => {
    let sortedGemstones = [...gemstones]; 

    if (position === "newest") {
      sortedGemstones.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (position === "price") {
      sortedGemstones.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    setGemstones(sortedGemstones); 
  }, [position]);

  return (
    <div className="relative min-h-screen bg-[#1a1c1ff8] py-8 px-12 mt-20 ">
      <div className="flex md:justify-end md:mr-20 justify-center">
        <DropdownMenuRadioGroupDemo
          ddText="Sort By"
          valuesText={["newest", "price"]}
          values={["Newest", "Price"]}
          position={position}
          setPosition={setPosition}
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
      <PageNumbering currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data.totalPages}/>
    </div>
  );
};

export default Products;
