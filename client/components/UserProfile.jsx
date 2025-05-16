import UserGemstones from "@/components/UserGemstones";
import axios from "axios";
import { EditModal } from "./Modals/EditModal";
import { FaStar } from "react-icons/fa";

const getUserById = async (id) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
    );
    return result.data.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getReviews = async (id) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/reviews`
    );
    return result.data.reviews;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const UserProfile = async ({ userid }) => {
  const user = await getUserById(userid);
  const reviews = await getReviews(userid);
  console.log(reviews);
  return (
    <div className="min-h-content relative top-20 mb-20  pb-8 bg-[#1a1c1ff8]">
      <div className="flex flex-col md:flex-row gap-[0.06rem] border-b-2 border-gray-600 bg-gradient-to-b from-[#00E8FC] via-[#D400A5] to-[#6A00F4]">
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
                src={user?.profileImage}
                className="border rounded-full shadow-lg"
                alt=""
              />
              <span className="flex justify-center text-white font-semibold mt-4  text-3xl">
                {user?.name}
              </span>
              <span className="flex items-center justify-center text-gray-300 italic text-md leading-tight mt-2 font-medium">
                {user?.residenceAddress}
              </span>
              <span className="flex items-center justify-center text-gray-300 italic text-sm leading-tight mt-2 font-medium">
                {user?.walletAddress}
              </span>
            </div>
            {/* <div className="flex gap-6 mt-5 ">
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
            </div> */}
          </div>
        </div>
        <div className="md:w-[60%] bg-[#1a1c1ff8] px-5 min-h-content ">
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
      <div className="w-[98vw] h-fit bg-[#1D1B24] mt-4 mx-2  overflow-y-hidden rounded-md mb-3">
        <div
          className={`bg-[#1e20249f] p-4 rounded-md border border-gray-700 ${
            reviews ? "w-fit" : "w-full"
          } h-full`}
        >
          <h3 className="text-3xl font-bold text-white mb-2">Reviews</h3>
          {reviews ? (
            <div className="flex items-center mb-2 w-full ">
              {reviews?.map((review, i) => (
                <div
                  className="mt-4 bg-[#414848] p-3 rounded-lg border border-gray-700 w-72 h-[460px] mx-2 "
                  key={i}
                >
                  <div className="w-full h-48 ">
                    <img
                      src={review.Gem.image}
                      className="w-full h-full"
                      alt="Gem Image"
                    />
                  </div>
                  <div className="text-white font-bold mt-2 border-b">
                    <p className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-2xl font-bold animate-gradient">
                      {review.Gem.name}
                    </p>
                    <p className="text-lg">{review.Gem.price} PKR</p>
                  </div>
                  <h3 className="text-white font-semibold mt-2 text-lg">
                    Reviewed By:
                  </h3>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    {review.Buyer.name}
                  </h3>
                  <div className="flex items-center mb-2 w-full">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <FaStar
                        key={star}
                        size={25}
                        className={
                          star <= review.Review.rating
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-2 line-clamp-3">
                    {review.Review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-48 flex justify-center items-center ">
              <p className="font-bold text-4xl text-white opacity-80">
                No Reviews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
