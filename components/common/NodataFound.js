import Image from "next/image";
import React from "react";

const NodataFound = () => {
  return (
    <>
      <div className="container xl:px-24 px-4 mx-auto">
      <div className="my-3 py-16 border rounded-md flex flex-col justify-center items-center">
        <div className="w-16 h-16">
          {/* <img
            src="assets/images/not_found.png"
            className="w-full h-full object-cover"
            alt=""
          /> */}
          <Image
            src="/assets/images/not_found.png"
            width={720}
            height={720}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <p className="text-bold pt-2 text-gray-400">Data Not Found....</p>
      </div>
      </div>
    </>
  );
};

export default NodataFound;
