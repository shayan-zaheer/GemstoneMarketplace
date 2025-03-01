import Hero from "@/components/Hero/Hero";
import Collections from "@/components/Collections/Collections";
import React from "react";

const Home = () => {  
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
    <div className="w-full min-h-[1000px] relative top-20 bg-[#1a1c1ff8] pb-20 mb-20 ">
      <Hero />
      <Collections collectionName={"Trending"} gemstones={gemstones} />
      <Collections collectionName={"Highest Volume"} gemstones={gemstones} />
    </div>
  );
};

export default Home;