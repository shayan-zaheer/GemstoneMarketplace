"use client";
import { ArrowLeft, Menu, Search, X, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ConnectWalletBtn } from "./ConnectWalletBtn";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userActions } from "@/Store/userSlice";
import { store } from "@/Store";
import { cartActions } from "@/Store/cartSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((store) => store.user.user);
    const cartItems = useSelector((store) => store.cart.cartItems);
    const [cartItemsLength, setCartItemsLength] = useState(0);

    const handleSessionExpiration = () => {
        const currentUser = store.getState().cart.userId;
        if (currentUser) {
            const cart = store.getState().cart.cartItems;
            localStorage.setItem(
                `cart_${currentUser}`,
                JSON.stringify(cart)
            );
        }
        dispatch(cartActions.clearCart());
        dispatch(userActions.removeSession());
        
        toast.error("Your session has expired. Please log in again.", {
            duration: 4000,
            position: "top-center",
        });
    };

    useEffect(() => {
        if (user) {
            const validateSession = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-session`,
                        { withCredentials: true }
                    );
                    
                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log("Session expired, logging out");
                        handleSessionExpiration();
                    }
                }
            };
            
            validateSession();
            
            const sessionCheckInterval = setInterval(validateSession, 15 * 60 * 1000);
            
            return () => {
                clearInterval(sessionCheckInterval);
            };
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user) {
            const validateSession = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-session`,
                        { withCredentials: true }
                    );

                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log("Session expired, logging out");
                        const currentUser = store.getState().cart.userId;
                        if (currentUser) {
                            const cart = store.getState().cart.cartItems;
                            localStorage.setItem(
                                `cart_${currentUser}`,
                                JSON.stringify(cart)
                            );
                        }
                        dispatch(cartActions.clearCart());
                        dispatch(userActions.removeSession());
                    }
                }
            };

            validateSession();

            const sessionCheckInterval = setInterval(
                validateSession,
                15 * 60 * 1000
            );

            return () => {
                clearInterval(sessionCheckInterval);
            };
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user?.id) {
            const handleConnect = () => {
                socket.emit("userRegistered", user.id);
            };

            if (socket.connected) {
                handleConnect();
            } else {
                socket.on("connect", handleConnect);
            }

            return () => {
                socket.off("connect", handleConnect);
            };
        }
    }, [user?.id]);

    useEffect(() => {
        setCartItemsLength(cartItems.length);
    }, [cartItems]);

    const handleLogout = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
                { withCredentials: true }
            );
            if (result.data?.status == "success") {
                const currentUser = store.getState().cart.userId;
                if (currentUser) {
                    const cart = store.getState().cart.cartItems;
                    localStorage.setItem(
                        `cart_${currentUser}`,
                        JSON.stringify(cart)
                    );
                }
                dispatch(cartActions.clearCart());
                dispatch(userActions.removeSession());
                router.push("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && user) {
                const validateSession = async () => {
                    try {
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-session`,
                            { withCredentials: true }
                        );
                    } catch (error) {
                        if (error.response?.status === 401) {
                            handleSessionExpiration();
                        }
                    }
                };
                
                validateSession();
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user, dispatch]);

    const [openSearch, setOpenSearch] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <nav className="w-full h-20 bg-[#1A1C1F] flex justify-between items-center px-4 fixed top-0 z-50 shadow-lg">
            <div className="flex items-center space-x-2">
                <Image src={"/Diamond.png"} alt="Logo" width={50} height={50} />
                <h1 className="text-white text-xl font-bold pt-2">
                    <Link href="/">GEMVAULT</Link>
                </h1>
            </div>

            <div className="hidden lg:block">
                <input
                    type="text"
                    placeholder="Search Gemstones"
                    className="navbar-input"
                />
            </div>

            <div className="hidden lg:flex">
                <ul className="flex items-center text-white font-semibold text-lg gap-x-2">
                    <li className="h-16 px-4 flex items-center">
                        <Link href="/products" className="hover:scale-105">
                            Products
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className="h-16 px-4 flex items-center">
                                <Link
                                    href={`/user/${user.userId}`}
                                    className="hover:scale-105"
                                >
                                    Profile
                                </Link>
                            </li>
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
                            <li className="h-16  px-4  flex items-center">
                                <Link
                                    href={"/myOrders"}
                                    className="relative transition duration-300 ease hover:scale-105"
                                >
                                    {" "}
                                    My Orders
                                </Link>
                            </li>
                            <li
                                className="h-16 px-4 flex items-center cursor-pointer hover:scale-105"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-5 h-5 mr-2" /> Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="h-16 px-4 flex items-center">
                                <Link href="/login" className="hover:scale-105">
                                    Login
                                </Link>
                            </li>
                            <li className="h-16 px-4 flex items-center">
                                <Link
                                    href="/signup"
                                    className="hover:scale-105"
                                >
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="h-16 px-4 flex items-center">
                        <ConnectWalletBtn className="navbar-button">
                            Connect Wallet
                        </ConnectWalletBtn>
                    </li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 lg:hidden">
                <Search
                    className="text-white w-7 h-7 cursor-pointer"
                    onClick={() => setOpenSearch(true)}
                />
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

            <AnimatePresence>
                {openSearch && (
                    <motion.div
                        initial={{ x: "200%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="absolute top-0 left-0 w-full h-full px-4 bg-[#1A1C1F] flex items-center gap-x-5 z-20"
                    >
                        <ArrowLeft
                            className="text-white w-10 h-10 cursor-pointer"
                            onClick={() => setOpenSearch(false)}
                        />
                        <input
                            type="text"
                            placeholder="Search Gemstones"
                            className="responsive-navbar-input"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {openMenu && (
                    <motion.div
                        className="responsive-menu"
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
                                <Link
                                    href="/products"
                                    className="responsive-menu-links"
                                >
                                    Products
                                </Link>
                            </li>
                            {user ? (
                                <>
                                    <li
                                        className="h-16 border-b px-4 flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            href={`/user/${user.userId}`}
                                            className="responsive-menu-links"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li
                                        className="h-16 border-b px-4 s flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            href={"/cart"}
                                            className="relative responsive-menu-links"
                                        >
                                            {" "}
                                            Cart
                                            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                {cartItemsLength}
                                            </span>
                                        </Link>
                                    </li>
                                    <li
                                        className="h-16 border-b px-4 flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            href={`/myOrders`}
                                            className="responsive-menu-links"
                                        >
                                            My Orders
                                        </Link>
                                    </li>
                                    <li
                                        className="h-16 border-b px-4 flex items-center cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />{" "}
                                        Logout
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li
                                        className="h-16 border-b px-4 flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            href="/login"
                                            className="responsive-menu-links"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li
                                        className="h-16 border-b px-4 flex items-center"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        <Link
                                            href="/signup"
                                            className="responsive-menu-links"
                                        >
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="h-16 border-b px-4 flex justify-center items-center cursor-pointer">
                                <ConnectWalletBtn className="responsive-navbar-button">
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
