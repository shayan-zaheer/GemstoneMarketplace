import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

const GemstoneCard = ({ info }) => {
  return (
    <Card className="w-[18rem] bg-[#414848] border-slate-700 shadow-lg ring-slate-500 h-[350px] my-4">
      <CardHeader>
        <CardTitle className="overflow-hidden rounded-tl-xl rounded-tr-xl">
          <Image
            src={info.image}
            width={300}
            height={100}
            alt="gemstoneImage"
            className="rounded-tl-xl rounded-tr-xl transition-transform duration-300 hover:scale-125 hover:cursor-pointer hover:brightness-50 z-[-1] h-56"
          />
        </CardTitle>
        <CardTitle className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-2xl font-bold mx-2">
          {" "}
          {info.name}
        </CardTitle>
        <CardDescription className="text-white text-lg ">
          {info.price}
        </CardDescription>
      </CardHeader>
      <CardFooter className="text-white">
        Owned by{" "}
        <span className="text-gray-200 ml-2 italic">{info.owner} </span>
      </CardFooter>
    </Card>
  );
};

export default GemstoneCard;
