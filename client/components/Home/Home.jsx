"use client";

import Hero from "@/components/Hero/Hero";
import Collections from "@/components/Collections/Collections";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "@/Store";

const HomePage = ({ initialUserData, gemstones }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userActions.setUser(initialUserData));
  }, [initialUserData, dispatch]);
  
  return (
    <div className="w-full min-h-[1000px] relative top-20 bg-[#1a1c1ff8] pb-20 mb-20 ">
      <Hero />
      <Collections collectionName={"Trending"} gemstones={gemstones} />
      <Collections collectionName={"Highest Volume"} gemstones={gemstones} />
    </div>
  );
};

export default HomePage;