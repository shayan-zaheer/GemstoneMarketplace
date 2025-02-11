import React from "react";
import GemstoneCard from "@/components/GemstoneCard";


const Products = () => {
  const gemstones = [
    {
      id: 1,
      name: "Shiny Emerald",
      image: "/emerald.jpg",
      owner: "Joe Burgh",
      price: "150ETH"
    },{
      id: 2,
      name: "Diamond",
      image: "/diamond.jpg",
      owner: "James Bill",
      price: "200ETH"
    }
    ,{
      id: 3,
      name: "Sapphire",
      image: "/sapphire.jpg",
      owner: "Joe Murphy",
      price: "190ETH"
    },{
      id: 4,
      name: "Amethyst",
      image: "/amethyst.jpg",
      owner: "Michael Starc",
      price: "180ETH"
    }
  ];
  return (
    <div className="relative h-screen py-8 px-12 mt-20 bg-slate-500">
      <div className="flex justify-around">
      {
        gemstones.map(gem=><GemstoneCard key={gem.id} info={gem}/>)
      }
      </div>
    </div>
  );
};

export default Products;
