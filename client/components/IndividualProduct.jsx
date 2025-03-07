"use client";
import axios from "axios";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageModal from "@/components/ImageModal";
import { FaCartShopping } from "react-icons/fa6";

const IndividualProduct = ({ productID }) => {
  //   const [gem, setGem] = useState({})
  //  useEffect(()=>{
  //   const fetchData = async ()=>{
  //       try{
  //           const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/${productID}`, {withCredentials: true});
  //           if(result.data.status == "success"){
  //             setGem(result.data.gem)
  //           } else {
  //             throw new Error();
  //           }
  //         } catch(err){
  //           return null;
  //         }
  //   }
  //   fetchData();

  //  },[productID])
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const gem = {
    id: 2,
    name: "Diamond",
    price: "200ETH",
    description:
      "This breathtaking 1.5-carat diamond features a brilliant cut, exceptional clarity, and dazzling fire, making it the perfect centerpiece for an engagement ring or fine jewelry. Expertly crafted to maximize light reflection, this diamond offers unmatched sparkle and elegance. GIA certified for authenticity and quality, ensuring you receive a truly remarkable gem. Elevate your jewelry collection with this timeless beauty—secure it today!",
    createdAt: "2025-03-01T20:43:56.437Z",
    coverImage: "/diamondCover.jpg",
    image: "/diamond.jpg",
    moreImages: [
      "/diamond1.jpg",
      "/diamond2.jpg",
      "/diamond3.jpg",
      "/diamond4.jpg",
  
    ],
    owner: "David Laid",
  };
  return (
    <div className="relative top-20 md:min-h-[950px] lg:min-h-[800px]  min-h-content bottom-8 mb-20  bg-[#1a1c1ff8] md:pl-12 md:flex md:flex-row-reverse">
      <motion.div
        initial={{ x: 600 }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="md:w-[68%] md:min-h-[950px] lg:min-h-[800px]  min-h-content  relative flex flex-col align-end"
      >
        <img
          src={gem.coverImage}
          alt="Fading Image"
          className="w-full h-[300px] md:min-h-[950px] lg:min-h-[800px] min-h-content  object-cover mask-gradient2 md:mask-gradient "
        />
      </motion.div>
      <motion.div
        initial={{ x: -600 }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="md:w-[45%] md:pt-10  px-5 min-h-[350px] h-[550px] md:h-[1000px] md:absolute md:z-10 md:left-10 md:top-12"
      >
        <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-4xl md:text-6xl font-bold ">
          {gem.name}
        </h1>
        <span className="mt-1 text-white text-3xl font-semibold">
          {gem.price}
        </span>
        <div className="md:mt-8 mt-4">
          <p className="text-slate-300  md:text-sm text-[0.65rem] italic text-justify">
            {gem.description}
          </p>
        </div>
        <div className="mt-5 mb-8">
          <span className="text-blue-400 font-semibold text-2xl">
            More Images
          </span>
          <div className="flex flex-row w-full flex-wrap justify-start mt-3 gap-3">
            {gem.moreImages.map((image, index) => {
              if (index == 2 && gem.moreImages.length > 3) {
                return (
                  <div
                    key={index}
                    className="relative  md:w-32 md:h-32 w-24 h-24 border rounded-lg hover:cursor-pointer hover:brightness-[80%]"
                  >
                    <img
                      src="/diamond3.jpg"
                      alt="image3"
                      className="w-full h-full rounded-lg"
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
                      onClick={() => {
                        setCurrentImage(image);
                        setOpen(true);
                      }}
                    >
                      <span className="text-white text-3xl font-normal">
                        +{gem.moreImages.length - 3}
                      </span>
                    </div>
                  </div>
                );
              } else if (index < 2) {
                return (
                  <img
                    key={index}
                    src={image}
                    onClick={() => {
                      setCurrentImage(image);
                      setOpen(true);
                    }}
                    alt="image"
                    className="w-24 h-24 md:w-32 md:h-32  rounded-lg border hover:cursor-pointer hover:brightness-[80%]"
                  />
                );
              }
            })}
          </div>
        </div>

        <div className="md:mt-5 mt-1 text-white text-xl font-medium italic">
          Uploaded on{" "}
          <span className="text-blue-400">
            {new Date(gem.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>{" "}
          by{" "}
          <span className="bg-gradient-to-r to-[#00E8FC] via-[#D400A5] from-[#6A00F4] text-transparent bg-clip-text">
            {gem.owner}
          </span>
        </div>
        <div className="relative md:text-xl text-md md:w-48 w-36 my-4 mb-20 bg-blue-500 text-white font-bold rounded-lg shadow-lg ">
          <button className=" flex gap-3  px-3 md:px-6 md:py-3 py-2 hover:border rounded-lg  group hover:bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] hover:cursor-pointer w-full h-full">
            <FaCartShopping className="translate-y-1" />{" "}
           Add to Cart 
          </button>
        </div>
      </motion.div>
      {open && (
        <ImageModal
          setOpen={setOpen}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          imagesArr={gem.moreImages}
        />
      )}
    </div>
  );
};

export default IndividualProduct;
