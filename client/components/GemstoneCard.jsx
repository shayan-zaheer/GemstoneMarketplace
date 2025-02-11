import React from 'react'
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  import Image from "next/image";

const GemstoneCard = ({info}) => {
  return (
    <Card className="w-[18rem]">
        <CardHeader>
          <CardTitle className="overflow-hidden rounded-tl-xl rounded-tr-xl">
            <Image
              src={info.image}
              width={300}
              height={100}
              alt="gemstoneImage"
              className="rounded-tl-xl rounded-tr-xl transition-transform duration-300 hover:scale-125 hover:cursor-pointer hover:brightness-50 z-[-1]"
            />
          </CardTitle>
          <CardTitle className="text-xl pt-2 pl-3"> {info.name}</CardTitle>
          <CardDescription>{info.price}</CardDescription>
        </CardHeader>
        <CardFooter>
          Owned by <span className="text-gray-500 ml-2">{info.owner} </span>
        </CardFooter>
      </Card>
  )
}

export default GemstoneCard