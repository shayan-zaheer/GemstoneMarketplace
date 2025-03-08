"use client";
import SignupForm from "@/components/Form/SignupForm";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center bg-[#1a1c1ff8] py-16 mt-16">
      {/* Main Box */}
      <div
        className={`relative max-sm:w-[350px] sm:w-3/5 lg:w-2/5 transition-all duration-500 ease-linear bg-[#2A2D33] py-12 px-4 rounded-xl overflow-hidden cursor-pointer ${
          isClicked ? "h-fit" : "h-32"
        }`}
        onClick={() => setIsClicked(!isClicked)} // Only clicking on outer div triggers expand
      >
        {/* Glowing Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-border rounded-xl"></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg"></div>

        {/* Header with Logo - Click to Expand */}
        <div className="relative z-10 flex justify-center items-center gap-x-3">
          <h1 className="text-center max-sm:text-2xl sm:text-2xl md:text-3xl font-semibold text-white ">
            Create An Account
          </h1>
          <img src="/LogoGem.png" alt="" width={40} height={20} />
        </div>

        {/* Form & Links */}
        {isClicked && (
          <div
            className="relative z-10 mt-4"
            onClick={(e) => e.stopPropagation()} // Prevents parent click event from triggering
          >
            {/* Signup Form */}
            <SignupForm />

            {/* Forgot Password & Signup Links */}
            <div className="text-white justify-center gap-x-3 flex transition-opacity duration-500 my-3">
              <p>Already have an account?</p>
              <Link href="/login" className="underline text-blue-400">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
