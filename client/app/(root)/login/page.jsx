"use client";
import LoginForm from "@/components/Form/LoginForm";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center bg-[#1a1c1ff8] mt-16">
      {/* Main Box */}
      <div
        onClick={() => setIsClicked(!isClicked)}
        className={`relative max-sm:w-[350px] sm:w-96 h-32 cursor-pointer ${
          isClicked ? "h-[420px]" : "h-32"
        } transition-all duration-500 ease-linear bg-[#2A2D33] py-12 px-4 rounded-xl overflow-hidden`}
      >
        {/* Glowing Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-border rounded-xl"></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg"></div>

        {/* Header with Logo */}
        <div className="relative z-10 flex justify-center items-center gap-x-3">
          <h1 className="text-center max-sm:text-3xl sm:text-3xl font-semibold text-white">
            Login{" "}
          </h1>
          <img src="/LogoGem.png" alt="" width={40} height={20} />
        </div>

        {/* Login Form - Smooth Show/Hide on Click */}
        {isClicked && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 transition-opacity duration-500 ${
              isClicked ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <LoginForm />
            {/* Forgot Password & Signup Links */}
            <div
              className={`relative z-10 text-white justify-between transition-opacity duration-500 my-3 ${
                isClicked
                  ? "opacity-100 flex"
                  : "opacity-0 pointer-events-none hidden"
              }`}
            >
              <Link href="/forgot" className="underline text-blue-400">
                Forgot Your Password?
              </Link>
              <Link href="/signup" className="underline text-blue-400">
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
