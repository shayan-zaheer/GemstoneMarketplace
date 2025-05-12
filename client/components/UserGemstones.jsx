"use client";
import GemstoneCard from "./GemstoneCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { DialogTrigger } from "@/components/ui/dialog"
import DeleteIcon from "./DeleteIcon";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserGemstones = ({ user, gemstones, title }) => {
  const loggedinUser = useSelector((store) => store.user.user);
  const [localGemstones, setLocalGemstones] = useState(gemstones);

  useEffect(() => {
    setLocalGemstones(gemstones);
  }, [gemstones]);
  const handleDelete=async (gemId)=>{
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/delete/${gemId}`, {withCredentials : true}
      );
      if (result.status === 204) {
        toast.success("Gemstone deleted successfully");
        setLocalGemstones((prev) => prev.filter((item) => item.id !== gemId));
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting gemstone");
    }
  }

  return (
    <>
      <h1 className="text-gray-200 font-semibold text-4xl mt-5">{title}</h1>
      {localGemstones && localGemstones.length != 0 ? (
        <div className="bg-[#1a1c1ff9] min-h-[300px] rounded-lg px-2 gap-4 py-[0.01rem] my-3 flex flex-nowrap overflow-x-scroll">
          {localGemstones &&
            localGemstones.map((item) => (
              <div className="relative" key={item.id}>
                {loggedinUser?.userId === user?.userId &&
                  title == "Owned Gemstones" && (
                    <DeleteIcon gemID={item.id} onDelete={handleDelete} />
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
