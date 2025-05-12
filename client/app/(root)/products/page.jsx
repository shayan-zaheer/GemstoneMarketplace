"use client";
import React, { useEffect, useState } from "react";
import GemstoneCard from "@/components/GemstoneCard";
import { motion } from "framer-motion";
import { DropdownMenuRadioGroupDemo } from "@/components/Dropdown";
import PageNumbering from "@/components/PageNumbering";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";
import { IoDiamond } from "react-icons/io5";

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

        console.log(result?.data?.data?.gems);
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
    <div className="relative min-h-content bg-[#1a1c1ff8] py-4 mb-20 px-12 top-20">
      <div className="flex justify-center items-center h-24 w-full flex-col ">
        <IoDiamond className="text-white w-10 h-10 lg:w-20 lg:h-20" />
        <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12 md:w-10/12  gap-x-2 mt-2">
          <div className="flex-grow border-t-4 border-gray-300"></div>
          <span className="font-bold max-sm:text-3xl sm:text-3xl text-white">
            Products
          </span>
          <div className="flex-grow border-t-4 border-gray-300"></div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4 md:justify-between md:mx-20 justify-center mt-4">
        <div className="md:w-1/2 w-full">
                <input
                    type="text"
                    placeholder="Search Gemstones"
                    className="navbar-input w-full "
                />
            </div>
        <DropdownMenuRadioGroupDemo
          ddText="Sort By"
          valuesText={["createdAt", "price"]}
          values={["Newest", "Price"]}
          stateValue={sortBy}
          setStateValue={setSortBy}
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
