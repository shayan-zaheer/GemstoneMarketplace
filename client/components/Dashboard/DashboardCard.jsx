import React from "react";
import { MdInventory } from "react-icons/md";

const DashboardCard = ({ card }) => {
  return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-card !border-purple-600  rounded-lg p-4">
        <h2 className="lg:text-2xl text-xl text-center font-medium text-black">
          {card.title}
        </h2>
        <p className="text-3xl text-primary font-bold">
          {card.value}
        </p>
      </div>
  );
};

export default DashboardCard;
