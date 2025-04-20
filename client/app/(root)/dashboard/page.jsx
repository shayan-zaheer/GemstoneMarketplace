import React from "react";
import { FaEye } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import { MdInventory } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardLine from "@/components/Dashboard/DashboardLine";
import PieChart from "@/components/Dashboard/PieChart";
import { MdSpaceDashboard } from "react-icons/md";

const page = () => {
  const cardDetails = [
    {
      title: "Visits",
      value: 100,
      icon: <FaEye />,
      bgColor: "bg-[#09f3ff]",
    },
    {
      title: "Total Users",
      value: 50,
      icon: <HiUserGroup />,
      bgColor: "bg-[#e4048c]",
    },
    {
      title: "Sold Gemstones",
      value: 10,
      icon: <GiCutDiamond />,
      bgColor: "bg-[#9169db]",
    },
    {
      title: "Gemstones Listed",
      value: 20,
      icon: <MdInventory />,
      bgColor: "bg-[#34195a]",
    },
  ];
  return (
    <div className="relative top-20 mb-20 bg-[#1a1c1ff8] text-white min-h-screen p-8">
      <div className="flex justify-center items-center h-20 w-full flex-col mb-8 ">
        <MdSpaceDashboard  className="text-white w-10 h-10 lg:w-20 lg:h-20" />
        <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12 md:w-10/12  gap-x-2 mt-2">
          <div className="flex-grow border-t-4 border-gray-300"></div>
          <span className="font-bold max-sm:text-3xl sm:text-3xl text-white">
            Dashboard
          </span>
          <div className="flex-grow border-t-4 border-gray-300"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 auto-rows-auto gap-2 ">
        {cardDetails.map((card, index) => (
          <div key={index} className="md:h-48 h-32">
            <DashboardCard card={card} />
          </div>
        ))}
        <div className="md:row-span-2 md:col-span-3 bg-[#1b1c20] rounded-lg">
          <DashboardLine />
        </div>
        <div className="md:row-span-2 bg-[#1b1c20] rounded-lg p-4">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default page;
