"use client";
import React, { useEffect, useState } from "react";
import GemstoneCard from "@/components/GemstoneCard";
import { motion } from "framer-motion";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";
import PageNumbering from "@/components/PageNumbering";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [gemstones, setGemstones] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getAllGems = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems?page=${currentPage}&sortBy=${sortBy}`
        );
        setGemstones(result?.data?.data?.gems);
        setLoading(false);
        setTotalPages(result?.data?.data?.totalPages);
      } catch (err) {
        console.error("Error fetching gemstones:", err);
        setGemstones([]);
        setTotalPages(0);
        setLoading(false);
      }
    };

    getAllGems();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, sortBy]);

  return (
    <div className="relative min-h-screen bg-[#1a1c1ff8] py-8 px-12 mt-20">
      <div className="flex md:justify-end md:mr-20 justify-center">
        <DropdownMenuRadioGroupDemo
          ddText="Sort By"
          valuesText={["createdAt", "price"]}
          values={["Newest", "Price"]}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <motion.div
        initial={{ y: 600 }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        className="flex flex-wrap justify-evenly"
      >
        {!loading ? (
          gemstones.map((gem) => <GemstoneCard key={gem.id} info={gem} />)
        ) : (
          <Loader loading={loading} />
        )}
      </motion.div>
      <hr className="my-10 md:mx-32 sm:mx-10 border-none h-[1px] md:h-[2px] bg-[radial-gradient(circle,_#00E8FC_10%,_#D400A5_40%,_#6A00F4_60%,_rgba(255,255,255,0)_100%)]" />

      <PageNumbering
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Products;
