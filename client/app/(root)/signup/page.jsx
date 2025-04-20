"use client";
import SignupForm from "@/components/Form/SignupForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if (e.target.closest("form")) return;
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center bg-[#1a1c1ff8] mt-16">
      <div
        onClick={handleClick}
        className={`relative max-sm:w-[350px] sm:w-96 cursor-pointer transition-all duration-500 ease-linear bg-[#2A2D33] p-6 rounded-xl overflow-hidden my-10 ${
          isClicked ? "h-[500px]" : "h-32"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-border rounded-xl"></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg"></div>

        <div
          className={`relative z-10 flex justify-center items-center gap-x-3 ${
            !isClicked && "mt-5"
          }`}
        >
          <h1 className="text-center text-3xl font-semibold text-white">
            Sign Up
          </h1>
          <img src="/LogoGem.png" alt="Logo" width={40} height={20} />
        </div>

        <div
          className={`relative z-10 transition-opacity duration-500 ${
            isClicked ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="max-h-[380px] overflow-y-auto px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <SignupForm />
          </div>
        </div>

        <div
          className={`relative z-10 flex justify-center text-white transition-opacity duration-500 my-3 ${
            isClicked ? "opacity-100" : "opacity-0 pointer-events-none hidden"
          }`}
        >
          <p>Already have an account?&nbsp;</p>
          <Link href="/login" className="underline text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
