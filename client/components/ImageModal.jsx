"use client";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Example({
  open,
  setOpen,
  currentImage,
  setCurrentImage,  
  imagesArr,
}) {
  const handleNext = () => {
    const currentIndex = imagesArr.findIndex((img) => img.path === currentImage);
    console.log(currentIndex);
    if (currentIndex < imagesArr.length - 1) {
      setCurrentImage(imagesArr[currentIndex + 1]?.path);
    }
  };

  const handlePrev = () => {
    const currentIndex = imagesArr.findIndex((img) => img.path === currentImage);
    if (currentIndex > 0) {
      setCurrentImage(imagesArr[currentIndex - 1]?.path);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <div className="relative bg-[#1a1c1ff8] rounded-lg shadow-xl p-4 w-full max-w-[60vw] sm:max-w-[60vw] md:max-w-[40vw] lg:max-w-[35mvw]  flex flex-col items-center">
          <div className="flex justify-center items-center w-full  relative">
            <span
              className="text-3xl text-white hover:cursor-pointer absolute top-3 right-1"
              onClick={() => setOpen(false)}
            >
              <RxCross1 />
            </span>
            {/* Left Button */}
            <button
              className="absolute left-2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition disabled:opacity-50"
              onClick={handlePrev}
              disabled={imagesArr.indexOf(currentImage) === 0}
            >
              <FaArrowLeft size={20} />
            </button>

            <img
              src={currentImage}
              alt="Preview"
              className="w-full max-w-[400px] h-auto max-h-[60vh] rounded border border-white object-contain"
            />

            {/* Right Button */}
            <button
              className="absolute right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition disabled:opacity-50"
              onClick={handleNext}
              disabled={
                imagesArr.indexOf(currentImage) === imagesArr.length - 1
              }
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
