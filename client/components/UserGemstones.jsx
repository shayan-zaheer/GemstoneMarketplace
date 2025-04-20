"use client";
import GemstoneCard from "./GemstoneCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const UserGemstones = ({ user, gemstones, title }) => {
  const loggedinUser = useSelector((store) => store.user.user);

  const handleDelete=async (gemId)=>{
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/delete/${gemId}`
      );
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-gray-200 font-semibold text-4xl mt-5">{title}</h1>
      {gemstones && gemstones.length != 0 ? (
        <div className="bg-[#1a1c1ff9] min-h-[300px] rounded-lg px-2 gap-4 py-[0.01rem] my-3 flex flex-nowrap overflow-x-scroll">
          {gemstones &&
            gemstones.map((item) => (
              <div className="relative" key={item.id}>
                {loggedinUser?.userId === user?.userId &&
                  title == "Owned Gemstones" && (
                    <div className="absolute w-10 h-10 text-white top-2 right-[-5] bg-red-500 rounded-full flex justify-center items-center text-3xl hover:scale-105 ease-in-out duration-200 hover:cursor-pointer z-10" >
                      <MdDelete />
                    </div>
                  )}
                <GemstoneCard info={item} />
              </div>
            ))}
        </div>
      ) : (
        <div className="bg-[#1a1c1ff9] min-h-[70px] flex rounded-lg px-2 gap-4 py-[0.01rem] my-3">
          {title == "Owned Gemstones" ? (
            <span className="text-gray-400 m-auto text-2xl italic">
              {loggedinUser?.userId === user?.userId
                ? "You own these gemstone"
                : `${user?.name} does not own any gemstone`}
            </span>
          ) : (
            <span className="text-gray-400 m-auto text-2xl italic">
              {loggedinUser?.userId === user?.userId
                ? "You sold these gemstone"
                : `${user?.name} have not sold any gemstone`}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default UserGemstones;
