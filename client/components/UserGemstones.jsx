import React from "react";
import GemstoneCard from "./GemstoneCard";

const UserGemstones = ({ gemstones, title }) => {
  return (
    <>
      <h1 className="text-gray-200 font-semibold text-4xl mt-5">{title}</h1>
      {gemstones && gemstones.length != 0 ? (
        <div className="bg-[#1a1c1ff9] min-h-[300px] rounded-lg px-2 gap-4 py-[0.01rem] my-3 flex flex-nowrap overflow-x-scroll">
          {gemstones && gemstones.map((item) => (
            <GemstoneCard info={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="bg-[#1a1c1ff9] min-h-[70px] flex rounded-lg px-2 gap-4 py-[0.01rem] my-3">
          {title == "Owned Gemstones" ? (
            <span className="text-gray-400 m-auto text-2xl italic"> You do not own any gemstone </span>
          ) : (
            <span className="text-gray-400 m-auto text-2xl italic"> You haven't sold any gemstone</span>
          )}
        </div>
      )}
    </>
  );
};

export default UserGemstones;
