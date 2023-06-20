import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";

const Loader = ({ isLoading }) => {
  return (
    // <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xl z-[9999]">
    //   <CircularProgress color="success" />
    // </div>
    <div className="fixed z-[9998] flex flex-col items-center justify-center w-screen h-full gap-3 bg-white/70 backdrop-blur ">
      <div className="relative w-40">
        <Image
          src="/assets/loader-logo.png"
          alt="lazy-loader"
          className="object-cover w-full h-full"
          width={720}
          height={720}
        />
      </div>
      <div>
        <CircularProgress color="success" size={30} />
      </div>
    </div>
  );
};

export default Loader;
