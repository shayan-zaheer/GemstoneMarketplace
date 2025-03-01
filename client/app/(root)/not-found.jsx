"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative bg-[#1a1c1ff8]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/ruby.png"
          alt="Gemstone Background"
          fill
          className="object-cover opacity-20 blur-md"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <h1 className="text-white text-7xl sm:text-8xl font-bold tracking-wide">
          404
        </h1>
        <p className="text-slate-300 text-xl sm:text-2xl mt-3">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-4 text-lg bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-white rounded-xl hover:scale-105 transition-all duration-300"
        >
          Go Back Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
