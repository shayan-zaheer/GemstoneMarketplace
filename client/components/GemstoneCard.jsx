"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <Card
      className="min-w-[18rem] bg-card border-slate-700 shadow-md ring-slate-500 md:h-[350px]  h-[330px] my-4"
      onClick={() => router.push(`/products/${info?.id}`)}
    >
      <CardHeader>
        <CardTitle className="overflow-hidden rounded-tl-xl rounded-tr-xl">
          <Image
            src={info?.image}
            width={300}
            height={100}
            alt="gemstoneImage"
            className="rounded-tl-xl rounded-tr-xl transition-transform duration-300 hover:scale-125 hover:cursor-pointer hover:brightness-50 z-[-1] h-56"
          />
        </CardTitle>
        <CardTitle className="text-primary text-2xl font-semibold mx-2">
          {" "}
          {info?.name}
        </CardTitle>
        <CardDescription className="text-black font-semibold text-lg ">
          {info?.price} PKR
        </CardDescription>
      </CardHeader>
      <CardFooter className="text-gray-500">
        Owned by{" "}
        <span className="text-primary font-semibold ml-2 italic">{info?.owner.name} </span>
      </CardFooter>
    </Card>
  );
};

export default GemstoneCard;
