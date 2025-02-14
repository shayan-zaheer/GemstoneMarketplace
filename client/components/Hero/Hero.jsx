import Image from "next/image";
import React from "react";
import HeroCard from "./HeroCard";
import HeroDetails from "./HeroDetails";

const Hero = () => {
  return (
    <div className=" w-full md:w-11/12   max-sm:min-h-[830px] sm:min-h-[800px] md:min-h-[900px] lg:min-h-[600px] bg-blue-300 relative mx-auto md:rounded-2xl  md:top-10 lg:top-14">
      <div className="w-full min-h-full flex items-center justify-center absolute inset-0 bg-cover bg-center blur-lg rounded-2xl">
        <Image
          src={"/ruby.png"}
          alt="Gemstone"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="w-full min-h-full absolute bg-black bg-opacity-60 inset-0 md:rounded-2xl ">
        <div className="w-full min-h-full flex flex-col absolute max-sm:top-10 sm:top-10 px-10 max-sm:px-5 lg:flex-row lg:p-10">
          <HeroDetails />

          <HeroCard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
