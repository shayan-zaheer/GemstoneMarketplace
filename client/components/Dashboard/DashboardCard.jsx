import React from "react";
import { MdInventory } from "react-icons/md";

const DashboardCard = ({ card }) => {
  return (
    <div
      className={`flex flex-col h-full justify-center items-center rounded-lg p-4 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient p-[0.1rem]`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#1b1c20] rounded-lg p-4">
        <div className="text-3xl lg:text-4xl mb-2">
          {card.icon}
        </div>
        <h2 className="lg:text-3xl text-xl text-center font-semibold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text">
          {card.title}
        </h2>
        <p className="text-2xl bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text">
          {card.value}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
