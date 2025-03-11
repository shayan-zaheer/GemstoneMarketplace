import UserGemstones from "@/components/UserGemstones";
import axios from "axios";
import { EditModal } from "./Modals/EditModal";

const getUserById = async (id) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
    );
    return result.data.user;
  } catch (err) {
    return null;
  }
};

const UserProfile = async ({ userid }) => {
  const user = await getUserById(userid);

  return (
    <div className="min-h-content relative top-20 mb-20 bg-[#1a1c1ff8]">
      <div className="flex flex-col md:flex-row gap-[0.06rem]  bg-gradient-to-b from-[#00E8FC] via-[#D400A5] to-[#6A00F4]">
        <div className="flex flex-col md:w-[40%] bg-[#1a1c1ff8] ">
          <div className="flex justify-between my-2 items-center mx-4">
            <span className="text-gray-200 font-semibold text-4xl m-5">
              Profile Section
            </span>
            <EditModal user={user} />
          </div>
          <div className=" flex flex-col mx-auto my-8">
            <div className="w-72">
              <img
                src={user.profileImage}
                className="border rounded-full shadow-lg"
                alt=""
              />
              <span className="flex justify-center text-white font-semibold mt-4  text-3xl">
                {user.name}
              </span>
              <span className="flex items-center justify-center text-gray-300 italic text-md leading-tight mt-2 font-medium">
                {user.residenceAddress}
              </span>
              <span className="flex items-center justify-center text-gray-300 italic text-sm leading-tight mt-2 font-medium">
                {user.walletAddress}
              </span>
            </div>
            <div className="flex gap-6 mt-5 ">
              <div className="flex border gap-1 px-2 items-center border-gray-700 rounded-lg">
                <span className="w-1 h-1  rounded-full border-4 border-green-500"></span>
                <span className="text-gray-300">Active: 5</span>
              </div>
              <div className="flex border gap-1 px-2 items-center border-gray-700 rounded-lg">
                <span className="w-1 h-1  rounded-full border-4 border-red-500"></span>
                <span className="text-gray-300">Inactive: 2</span>
              </div>
              <div className="flex border gap-1 px-2 items-center border-gray-700 rounded-lg">
                <span className="w-1 h-1  rounded-full border-4 border-blue-500"></span>
                <span className="text-gray-300">Sold: 5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[60%] bg-[#1a1c1ff8] px-5 min-h-content">
          <UserGemstones
            user={user}
            gemstones={user?.ownedGemstones}
            title={"Owned Gemstones"}
          />
          <UserGemstones
            user={user}
            gemstones={user?.soldGemstones}
            title={"Sold Gemstones"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
