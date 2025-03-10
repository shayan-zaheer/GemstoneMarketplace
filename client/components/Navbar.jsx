"use client";
import { ArrowLeft, Menu, Search, Sun, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ConnectWalletBtn } from "./ConnectWalletBtn";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(store => store.user.user);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const [cartItemsLength, setCartItemsLength] = useState(0);

  useEffect(() => {
    setCartItemsLength(cartItems.length);
  }, [cartItems]);

  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="w-full h-20 bg-[#1A1C1F] flex justify-between items-center px-4 fixed top-0 z-50 shadow-lg">
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

      <div
        className="text-white hidden lg:block
      "
      >
        <input
          type="text"
          placeholder="Search Gemstones"
          className="navbar-input "
        />
      </div>

      <div className=" hidden lg:flex  ">
        <ul className="flex items-center text-white font-semibold text-lg gap-x-2 ">
          <li className="h-16 px-4 flex items-center">
            <a
              href="/products"
              className="transition duration-300 ease hover:scale-105"
            >
              {" "}
              Products
            </a>
          </li>
          {user && (
             <li className="h-16 px-4  flex items-center">
             <Link
               href={`/user/${user.userId}`}
               className="transition duration-300 ease hover:scale-105"
             >
               {" "}
               Profile
             </Link>
           </li>
          )}
          <li className="h-16  px-4  flex items-center">
            <Link
              href={"/cart"}
              className="relative transition duration-300 ease hover:scale-105"
            >
              {" "}
              Cart
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemsLength}
              </span>
            </Link>
          </li>
          <li className="h-16  px-4 flex items-center justify-center">
            <ConnectWalletBtn className="navbar-button">
              Connect Wallet
            </ConnectWalletBtn>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 lg:hidden">
        <div className="flex items-center space-x-4">
          <Sun className="text-white w-7 h-7" />
          <Search
            className="text-white  w-7 h-7 cursor-pointer"
            strokeWidth={2.5}
            onClick={() => setOpenSearch(true)}
          />
        </div>
        <div>
          {!openMenu ? (
            <Menu
              className="text-white w-7 h-7 cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />
          ) : (
            <X
              className="text-white w-7 h-7 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {openSearch && (
          <motion.div
            initial={{ x: "200%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className=" absolute top-0 left-0 w-full h-full px-4
        bg-[#1A1C1F]  flex items-center gap-x-5 z-20
        "
          >
            <ArrowLeft
              className="text-white w-10 h-10 cursor-pointer"
              onClick={() => setOpenSearch(false)}
            />
            <input
              type="text"
              placeholder="Search Gemstones"
              className="responsive-navbar-input "
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className=" responsive-menu"
            initial={{ x: "200%" }}
            animate={{ x: 0 }}
            exit={{ x: "200%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <ul className="w-full h-full flex flex-col justify-center text-white font-semibold">
              <li
                className="h-16 border-b px-4 flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link href={"/products"} className="responsive-menu-links">
                  {" "}
                  Products
                </Link>
              </li>
              <li
                className="h-16 border-b px-4  flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link href={"/profile/2"} className="responsive-menu-links">
                  {" "}
                  Profile
                </Link>
              </li>
              <li
                className="h-16 border-b px-4 s flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link href={"/cart"} className="relative responsive-menu-links">
                  {" "}
                  Cart
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItemsLength}
                  </span>
                </Link>
              </li>
              <li className="h-16 border-b px-4 flex items-center justify-center">
                <ConnectWalletBtn className=" responsive-navbar-button">
                  Connect Wallet
                </ConnectWalletBtn>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
