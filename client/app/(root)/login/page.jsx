"use client";
import LoginForm from "@/components/Form/LoginForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

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
    <div className="w-full min-h-[94vh] flex justify-center items-center bg-main mt-16">
      <div
        onClick={handleClick}
        className={`relative max-sm:w-[350px] sm:w-96 cursor-pointer transition-all duration-500 ease-linear bg-card p-6  overflow-hidden  ${
          isClicked ? "h-[380px]" : "h-32"
        }`}
      >
        <div className="absolute inset-0 bg-primary rounded-lg"></div>
        <div className="absolute inset-0 bg-surface rounded-lg"></div>

        <div
          className={`relative z-10 flex justify-center items-center gap-x-3 ${
            !isClicked && "mt-5"
          }`}
        >
          <h1 className={`text-center text-3xl font-semibold text-primary `}>
            Login
          </h1>
          <img src="/LogoGem.png" alt="Logo" width={40} height={20} />
        </div>

        <div
          className={`relative z-10 transition-opacity duration-500 ${
            isClicked ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <LoginForm />
        </div>

        <div
          className={`relative z-10 flex justify-between text-white transition-opacity duration-500 my-3 ${
            isClicked ? "opacity-100" : "opacity-0 pointer-events-none hidden"
          }`}
        >
          <Link
            href="/forgot"
            className="underline text-primary hover:text-purple-700"
          >
            Forgot Your Password?
          </Link>
          <Link
            href="/signup"
            className="underline text-primary hover:text-purple-700"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
