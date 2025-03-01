import React from "react";

const gemstoneData = [
  {
    id: 4,
    name: "Diamond",
    coverImage: "/diamondCover.jpg",
    image: "/diamond.jpg",
    price: "200ETH",
    uploadDate: "2025-02-19 10:45:36.216+00",
    createdAt: "2025-02-19 10:45:36.216+00",
    updatedAt: "2025-02-19 10:45:36.216+00",
    description:
      "This breathtaking 1.5-carat diamond features a brilliant cut, exceptional clarity, and dazzling fire, making it the perfect centerpiece for an engagement ring or fine jewelry. Expertly crafted to maximize light reflection, this diamond offers unmatched sparkle and elegance. GIA certified for authenticity and quality, ensuring you receive a truly remarkable gem. Elevate your jewelry collection with this timeless beauty—secure it today!",
  },
];

const Product = () => {
  return (
    <div className="relative top-20 min-h-content mb-20 bg-[#1a1c1ff8] md:pl-12 md:flex md:flex-row-reverse">
      <div className="md:w-[65%] relative">
        <img
          src="/diamondCover.jpg"
          alt="Fading Image"
          className="w-full h-[300px] md:h-full  object-cover mask-gradient2 md:mask-gradient "
        />
      </div>
      <div className="md:w-[40%] md:pt-12 px-5 md:absolute md:z-10 md:left-10 md:top-12">
        <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-4xl md:text-6xl font-bold ">
          {gemstoneData[0].name}
        </h1>
        <div className="md:mt-8 mt-4">
            <p className="text-slate-300  md:text-sm text-[0.65rem] italic text-justify">{gemstoneData[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
