import React from "react";

const FullScreenImageShow = () => {
  return (
    <div>
      <section className="border-b-4 pb-1.5 px-4">
        <button className="xl:absolute top-3.5 left-5 border-2 font-bold tracking-wider  border-theme rounded text-theme text-sm hover:bg-theme-light hover:text-dark-theme hover:border-dark-theme transition-all py-1.5 px-3 mt-3 mr-3">
          Back
        </button>
        <div className="2xl:max-w-6xl max-w-5xl sm:flex  items-start py-3.5 justify-between mx-auto ">
          <div className="flex items-start   gap-7">
            <div>
              <h2 className="text-gray-900 font-bold tracking-wide md:text-xl xs:text-lg">
                Marker – 500 Scribbles, Lines & More
              </h2>
              <p className="text-gray-900 md:text-lg xs:text-base text-sm">
                By Studio 2am in Graphics
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center sm:justify-end  mt-4  gap-7">
            <div className=" flex  items-center  gap-6  ">
              <button className=" bg-white text-gray-600 transition-all hover:text-theme flex items-center justify-center rounded-full">
                <i className="fa-solid fa-arrow-up-from-bracket lg:text-base text-sm"></i>
              </button>
              <button className="  bg-white text-gray-600 transition-all hover:text-theme flex items-center justify-center rounded-full">
                <i className="fa-regular fa-heart lg:text-base text-sm"></i>
              </button>
              <button className=" bg-white text-gray-600 transition-all hover:text-theme flex items-center justify-center rounded-full collection-btn">
                <i className="fa-regular fa-bookmark lg:text-base text-sm"></i>
              </button>
            </div>
            <button className="border-2 rounded hover:border-dark-theme hover:text-dark-theme transition-all hover:bg-theme-light border-theme py-1 text-sm text-theme font-bold tracking-wide px-5 ">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      {/* <!-- Images --> */}
      <section className="py-8 2xl:max-w-6xl max-w-5xl  mx-auto md:space-y-10 space-y-6 px-4">
        <div className="w-full h-full relative rounded-sm overflow-hidden">
          <img className="w-full h-full" src="../assets/images/font1.webp" alt="" />
          <div className="absolute z-50  cursor-pointer top-2.5 left-2.5 bg-red-900 p-1  text-white rounded flex items-center text-xs gap-0.5">
            <i className="fa-brands fa-pinterest"></i>
            <p>Save</p>
          </div>
        </div>
        <div className="w-full h-full relative rounded-sm overflow-hidden    ">
          <img className="w-full h-full" src="../assets/images/font2.webp" alt="" />
          <div className="absolute z-50   cursor-pointer top-2.5 left-2.5 bg-red-900 p-1  text-white rounded flex items-center text-xs gap-0.5">
            <i className="fa-brands fa-pinterest"></i>
            <p>Save</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullScreenImageShow;
