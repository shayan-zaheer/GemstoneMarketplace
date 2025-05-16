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
  const [filteredGems, setFilteredGems] = useState([])

  useEffect(() => {
    const getAllGems = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems?page=${currentPage}&sortBy=${sortBy}`
        );

        console.log(result?.data?.data?.gems);
        setGemstones(result?.data?.data?.gems);
        setFilteredGems(result?.data?.data?.gems)
        setLoading(false);
        setTotalPages(result?.data?.data?.totalPages);
      } catch (err) {
        console.error("Error fetching gemstones:", err);
        setGemstones([]);
        setFilteredGems([])
        setTotalPages(0);
        setLoading(false);
      }
    };

    getAllGems();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, sortBy]);

  const handleChange = (e)=>{
    const value = e.target.value.toLowerCase()
    const filtered = gemstones.filter(gem=>(
      gem.name.toLowerCase().includes(value) || gem.owner.name.toLowerCase().includes(value)
    ))
    setFilteredGems(filtered)
  }
  return (
    <div className="relative min-h-content bg-main py-4 mb-20 px-12 top-20">
      <div className="flex justify-center items-center h-24 w-full flex-col ">
        <IoDiamond className="text-primary w-10 h-10 lg:w-20 lg:h-20" />
        <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12 md:w-10/12  gap-x-2 mt-2">
          <div className="flex-grow border-t-4 border-primary"></div>
          <span className="font-bold max-sm:text-3xl sm:text-3xl text-primary">
            Products
          </span>
          <div className="flex-grow border-t-4 border-primary"></div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4 md:justify-between md:mx-20 justify-center mt-4">
        <div className="md:w-1/2 w-full">
                <input
                    type="text"
                    placeholder="Search Gemstones"
                    className="navbar-input w-full "
                    onChange={handleChange}
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
          filteredGems.length!==0 ?filteredGems.map((gem) => <GemstoneCard key={gem.id} info={gem} />):<div className="w-4/5 h-48 text-white text-3xl font-semibold flex justify-center items-center italic opacity-75">No Cards Found</div>
        ) : (
          <Loader loading={loading} />
        )}
      </motion.div>
      <hr className="my-10 md:mx-32 sm:mx-10 border border-primary"/>

      <PageNumbering
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Products;
