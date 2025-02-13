import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full max-sm:h-[700px] bg-[#222528] pt-44">
      <div className="w-full h-11/12 flex max-sm:flex-col sm:flex-col lg:flex-row justify-center lg:mb-5">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center space-x-2">
            <Image
              src={"/Diamond.png"}
              alt="Logos"
              style={{ width: "auto", height: "auto" }}
              width={50}
              height={50}
            />
            <h1 className="text-white text-xl font-bold pt-2">
              <Link href={"/"}>GEMVAULT</Link>
            </h1>
          </div>
          <h1 className="text-slate-200 text-lg font-semibold text-center w-9/12 max-sm:w-[370px]  mt-3 max-sm:text-[16px]">
            GEMVAULT is a next-generation marketplace for buying and selling
            certified gemstones. Backed by blockchain technology, it ensures
            secure ownership transfers and complete transparency in every trade.
          </h1>
          <div>
            <ul className="flex items-center justify-center gap-x-4 mt-4">
              <li className="border-2 border-white rounded-md p-2 hover:bg-white group transition-all duration-300 ease-linear">
                <Link href={"/"} className="text-white font-semibold text-lg ">
                  <FaFacebookF className="text-2xl group-hover:text-black" />
                </Link>
              </li>
              <li className="border-2 border-white rounded-md p-2 hover:bg-white group transition-all duration-300 ease-linear">
                <Link href={"/"} className="text-white font-semibold text-lg ">
                  <FaInstagram className="text-2xl group-hover:text-black" />
                </Link>
              </li>
              <li className="border-2 border-white rounded-md p-2 hover:bg-white group transition-all duration-300 ease-linear">
                <Link href={"/"} className="text-white font-semibold text-lg ">
                  <FaPinterestP className="text-2xl group-hover:text-black" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-around w-full max-sm:mt-8 sm:mt-8  text-white">
          <div>
            <h1 className="font-semibold text-2xl border-b-4 border-blue-500 max-sm:text-xl">
              Explore
            </h1>
            <ul className="mt-2 text-lg max-sm:text-sm italic space-y-1">
              <li className="footer-links">
                <Link href={"/"}>
                  {" "}
                  <span className="footer-links-span">All Gemstones</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link href={"/"}>
                  <span className="footer-links-span">Sell Gemstones</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link href={"/"}>
                  <span className="footer-links-span">My Profile</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link href={"/"}>
                  <span className="footer-links-span">Connect Wallet</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-semibold text-2xl border-b-4 border-blue-500 max-sm:text-xl">
              Connect With Us
            </h1>
            <ul className="mt-2 text-lg italic max-sm:text-sm">
              <li className="footer-links">
                <Link href={"/"}>
                  <span className="footer-links-span">Login</span>
                </Link>
              </li>
              <li className="footer-links">
                <Link href={"/"}>
                  <span className="footer-links-span">SignUp</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className=" w-10/12 h-2 border-t-2 border-slate-400 mx-auto mt-2 max-sm:mt-8 
      "
      ></div>
      <div className="w-full sm:h-[40px] max-sm:h-[30px]  flex items-center justify-center ">
        <h1 className="text-white text-lg font-semibold">
          © 2025 GEMVAULT. All rights reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
