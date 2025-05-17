"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageModal from "@/components/ImageModal";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import ProductImages from "@/components/ProductImages";
import { TbShoppingCartCancel } from "react-icons/tb";
import toast from "react-hot-toast";
import Loader from "./Loader";
import Link from "next/link";
import { cartActions } from "@/Store/cartSlice";

const IndividualProduct = ({ productID }) => {
  const loggedinUser = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const dispatch = useDispatch();
  const [gem, setGem] = useState({});
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  console.log(loggedinUser);

  useEffect(() => {
    const exists = cartItems.some((item) => item.id === +productID);
    setAlreadyInCart(exists);
  }, [cartItems, productID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/${productID}`,
          { withCredentials: true }
        );

        if (result.data.status === "success") {
          setGem(result.data.gem);
          console.log(result.data.gem);
        } else {
          throw new Error();
        }
      } catch (err) {
        return null;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productID]);

  const handleAddToCart = () => {
    console.log(loggedinUser);
    if (!loggedinUser) {
      toast.error("You need to log in first!");
      return;
    }
    dispatch(cartActions.addToCart(gem));
    toast.success(`${gem.name} added to cart!`, {
      style: { background: "#333", color: "white" },
    });
  };

  const handleRemoveFromCart = () => {
    if (!loggedinUser) {
      toast.error("You need to log in first!");
      return;
    }
    dispatch(cartActions.removeFromCart(gem));
    toast.success(`${gem.name} removed from cart!`, {
      style: { background: "#333", color: "white" },
    });
  };

  return (
    <div className="relative top-20 pb-20 md:pb-0  md:min-h-[950px] lg:min-h-[900px] min-h-content bottom-8 mb-20 bg-[#1a1c1ff8] md:pl-12 md:flex md:flex-row-reverse">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <motion.div
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:w-[64%] md:min-h-[950px] lg:min-h-[800px] min-h-content relative flex flex-col align-end"
          >
            <img
              src={gem.coverImage}
              alt="Fading Image"
              className="w-full h-[300px] md:min-h-[950px] lg:min-h-[900px] min-h-content object-cover mask-gradient2 md:mask-gradient"
            />
          </motion.div>
          <motion.div
            initial={{ x: -600 }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:w-[45%] md:pt-10 px-5 min-h-[350px] h-[550px] md:h-[1000px] md:absolute md:z-10 md:left-10 md:top-12"
          >
            <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-4xl md:text-6xl font-bold">
              {gem.name}
            </h1>
            <span className="mt-1 text-white text-3xl font-semibold">
              {gem.price}PKR
            </span>
            <div className="md:mt-8 mt-4">
              <p className="text-slate-300 md:text-sm text-[0.65rem] italic text-justify">
                {gem.description}
              </p>
            </div>
            <div className="mt-5 mb-8">
              <span className="text-blue-400 font-semibold text-2xl">
                More Images
              </span>
              <ProductImages
                gem={gem}
                setCurrentImage={setCurrentImage}
                setOpen={setOpen}
              />
            </div>
            <div className="md:mt-5 mt-1 text-white text-xl font-medium">
              Uploaded on{" "}
              <span className="text-blue-400 italic">
                {new Date(gem.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>{" "}
              by{" "}
              <Link href={`/user/${gem?.owner?.userId}`}>
                <span className="bg-gradient-to-r italic to-[#00E8FC] via-[#D400A5] from-[#6A00F4] text-transparent bg-clip-text">
                  {gem?.owner?.name}
                </span>
              </Link>
            </div>
            {loggedinUser?.userId !== gem?.owner?.userId && loggedinUser?.role !== 'admin' && (
               <div className="relative md:text-xl text-md my-4 mb-20 text-white font-bold">
                 {!alreadyInCart ? (
                   <button
                     className="flex gap-3 md:w-44 w-36 px-3  bg-blue-600 hover:bg-blue-700 md:py-3 py-2 shadow-lg rounded-lg hover:cursor-pointer h-full"
                     onClick={handleAddToCart}
                   >
                     <FaCartShopping className="translate-y-1" /> Add to Cart
                   </button>
                 ) : (
                   <button
                     className="flex gap-3 px-3 md:px-6 md:py-3 py-2 hover:bg-red-700 bg-red-600 rounded-lg shadow-lg hover:cursor-pointer md:w-72 w-64 h-full"
                     onClick={handleRemoveFromCart}
                   >
                     <TbShoppingCartCancel className="translate-y-1 md:text-2xl" />{" "}
                     Remove From Cart
                   </button>
                 )}
               </div>
             )}
          </motion.div>
          {open && (
            <ImageModal
              setOpen={setOpen}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
              imagesArr={gem.moreImages}
            />
          )}
        </>
      )}
    </div>
  );
};

export default IndividualProduct;
