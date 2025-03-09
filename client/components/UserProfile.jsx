"use client";
import React from "react";
import UserGemstones from "@/components/UserGemstones";


const UserProfile = ({ userid }) => {
  const user = {
    userid: 2,
    userName: "Shayan Zaheer",
    profileImage: "/user-profile.png",
    userBio:
      "100% Authentic Gemstone seller. Sold over 10+ certified gemstones",
    ownedGemstones: [
      
    ],
    soldGemstones: [{
      id: 2,
      name: "Diamond",
      price: "200ETH",
      owner: {
        name: "Shayan",
      },
      image: "/diamond.jpg"
    },
    {
      id: 3,
      name: "Diamond",
      price: "200ETH",
      owner: {
        name: "Shayan",
      },
      image: "/diamond.jpg"
    },
    {
      id: 4,
      name: "Diamond",
      price: "200ETH",
      owner: {
        name: "Shayan",
      },
      image: "/diamond.jpg"
    },
    {
      id: 5,
      name: "Diamond",
      price: "200ETH",
      owner: {
        name: "Shayan",
      },
      image: "/diamond.jpg"
    },
    {
      id: 6,
      name: "Diamond",
      price: "200ETH",
      owner: {
        name: "Shayan",
      },
      image: "/diamond.jpg"
    },
    ],
  };
  return (
    <div className="min-h-content relative top-20 mb-20 bg-[#1a1c1ff8]">
      <div className="flex flex-col md:flex-row gap-[0.06rem]  bg-gradient-to-b from-[#00E8FC] via-[#D400A5] to-[#6A00F4]">
        <div className="flex flex-col md:w-[40%] bg-[#1a1c1ff8] ">
            <span className="text-gray-200 font-semibold text-4xl m-5">Profile Section</span>
          <div className=" flex flex-col mx-auto my-8">
            <div className="  w-72">
              <img
                src={user.profileImage}
                className="border rounded-full shadow-lg"
                alt=""
              />
              <span className="flex justify-center text-white font-semibold mt-4  text-3xl">
                {user.userName}
              </span>
              <span className="flex mx-auto text-gray-300 italic text-md text-center leading-tight mt-2 font-medium">
                {user.userBio}
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-[60%] bg-[#1a1c1ff8] px-5 min-h-content">
        <UserGemstones gemstones={user.ownedGemstones} title={"Owned Gemstones"} /> 
        <UserGemstones gemstones={user.soldGemstones} title={"Sold Gemstones"}/>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
