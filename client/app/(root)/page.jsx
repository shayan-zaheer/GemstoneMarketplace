"use client";
import Hero from "@/components/Hero/Hero";
import Collections from "@/components/Collections/Collections";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [trendingGems, setTrendingGems] = useState([]);
  const [highvolumeGems, setHighVolumeGems] = useState([]);

  const fetchCards = async () => {
    try {
      const [trendingRes, highVolumeRes] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/category/trending`
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/category/highvolume`
        ),
      ]);
      setTrendingGems(trendingRes?.data?.data);
      setHighVolumeGems(highVolumeRes?.data?.data);
    } catch (err) {
      setTrendingGems([]);
      setHighVolumeGems([]);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCards();
    // console.log(trendingGems, highvolumeGems);
  }, []);

  //   const gemstones = [
  //     {
  //       id: 1,
  //       name: "Shiny Emerald",
  //       image: "/emerald.jpg",
  //       owner: "Joe Burgh",
  //       price: "150PKR",
  //     },
  //     {
  //       id: 2,
  //       name: "Diamond",
  //       image: "/diamond.jpg",
  //       owner: "James Bill",
  //       price: "200PKR",
  //     },
  //     {
  //       id: 3,
  //       name: "Sapphire",
  //       image: "/sapphire.jpg",
  //       owner: "Joe Murphy",
  //       price: "190PKR",
  //     },
  //     {
  //       id: 4,
  //       name: "Amethyst",
  //       image: "/amethyst.jpg",
  //       owner: "Michael Starc",
  //       price: "180PKR",
  //     },
  //     {
  //       id: 5,
  //       name: "Ruby",
  //       image: "/ruby.png",
  //       owner: "Sarah Lee",
  //       price: "170PKR",
  //     },
  //     {
  //       id: 6,
  //       name: "Topaz",
  //       image: "/topaz.png",
  //       owner: "David Kim",
  //       price: "160PKR",
  //     },
  //     {
  //       id: 7,
  //       name: "Opal",
  //       image: "/opal.png",
  //       owner: "Emma Watson",
  //       price: "155PKR",
  //     },
  //     {
  //       id: 8,
  //       name: "Garnet",
  //       image: "/garnet.png",
  //       owner: "Robert Downey",
  //       price: "165PKR",
  //     },
  //   ];

  return (
    <div className="w-full min-h-[1000px] relative top-20 bg-[#1a1c1ff8] pb-20 mb-20 ">
      <Hero />
      <Collections collectionName={"Trending"} gemstones={trendingGems} />
      <Collections
        collectionName={"Highest Volume"}
        gemstones={highvolumeGems}
      />
    </div>
  );
};

export default HomePage;
