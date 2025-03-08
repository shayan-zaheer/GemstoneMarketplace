import React from "react";

const ProductImages = ({gem, setCurrentImage, setOpen}) => {
  return (
    <div className="flex flex-row w-full flex-wrap justify-start mt-3 gap-3">
      {gem.moreImages &&
        gem.moreImages.map((image, index) => {
          if (index == 2 && gem.moreImages.length > 3) {
            return (
              <div
                key={index}
                className="relative  md:w-32 md:h-32 w-24 h-24 border rounded-lg hover:cursor-pointer hover:brightness-[80%]"
              >
                <img
                  src="/diamond3.jpg"
                  alt="image3"
                  className="w-full h-full rounded-lg"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
                  onClick={() => {
                    setCurrentImage(image?.path);
                    setOpen(true);
                  }}
                >
                  <span className="text-white text-3xl font-normal">
                    +{gem.moreImages.length - 3}
                  </span>
                </div>
              </div>
            );
          } else if (index < 2) {
            return (
              <img
                key={index}
                src={image?.path}
                onClick={() => {
                  setCurrentImage(image?.path);
                  setOpen(true);
                }}
                alt="image"
                className="w-24 h-24 md:w-32 md:h-32  rounded-lg border hover:cursor-pointer hover:brightness-[80%]"
              />
            );
          }
        })}
    </div>
  );
};

export default ProductImages;
