import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";

function Category() {
  const router = useRouter();
  /* Get responses of api call */
  const [filterCat, setFilterCat] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    if (filterCat || filterSearch) {
      router.push(
        `/project/list/${filterCat}${
          filterSearch ? "?search=" + filterSearch : ""
        }`
      );
    }
  }, [filterCat, filterSearch]);

  const { categoryProjectListData } = useSelector((store) => ({
    categoryProjectListData: store?.category?.categoryProjectListData,
  }));
  return (
    <>
      <div className="container bg-white  mx-auto px-4">
        <ul className="md:flex relative hidden justify-center xl:gap-9 gap-5 items-center border-y border-black py-px lg:text-sm text-xs text-black/80 font-bold">
          {categoryProjectListData?.slice(0, 7)?.map((cat, index) => {

            return (
              <div key={index}>

            <li
              
              onClick={() => {
                setFilterCat(cat?._id);
              }}
              className="py-3 border-b-2 cursor-pointer border-transparent transition-all hover:border-b-2 hover:border-black"
            >
              {cat?.category_name}
            </li>
              </div>

            )
          })}
          {/* <li
            key={"99"}
            className=" group  py-3 border-b-2 cursor-pointer border-transparent  hover:border-b-2 hover:border-black"
          >
            See more
            <div className="group-hover:scale-y-100 transition-all px-36 scale-y-0 z-50 absolute w-full py-10 bg-white border-b-2 shadow border-black top-[103%] flex gap-20 left-0 items-start">
              <div className="text-gray-800 space-y-3 text-sm">
                <p className="font-semibold text-base whitespace-nowrap">
                  Curated Collections
                </p>
                <ul className="font-medium space-y-2.5">
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Global Finds
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-gray-800 space-y-3 text-sm">
                <p className="font-semibold text-base">Blog</p>
                <ul className="font-medium space-y-2.5">
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      Creative Market’s Latest Drop: 41 Assets To Grab Right Now
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      9 Best iPhone 14 Mockups to Bring Your Designs to Life
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      The 20 Best Finance Icons Sets for Any Project
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      2023 Graphic Design Trends to Inspire You All Year Long
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a className="inline border-b-2  border-transparent   hover:border-b-2 hover:border-black">
                      10 Best Fonts to Use for Resumes
                    </a>
                  </li>
                </ul>
                <a
                  className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                >
                  View the blog{" "}
                  <FaChevronRight size={12} className="text-sm pt-0.5" />{" "}
                </a>
              </div>
              <div className="text-gray-800 space-y-3 text-base whitespace-nowrap">
                <ul className="font-medium space-y-2 ">
                  <li className=" cursor-pointer">
                    <a
                      className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                    >
                      View the blog{" "}
                      <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a
                      className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                    >
                      View the blog{" "}
                      <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a
                      className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                    >
                      View the blog{" "}
                      <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a
                      className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                    >
                      View the blog{" "}
                      <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                    </a>
                  </li>
                  <li className=" cursor-pointer">
                    <a
                      className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                    >
                      View the blog{" "}
                      <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                    </a>
                  </li>

                  <a
                    className="font-semibold 
                inline-flex items-center gap-2 border-b-2  border-transparent   hover:border-b-2 hover:border-black"
                  >
                    View the blog{" "}
                    <FaChevronRight size={14} className="text-sm pt-0.5" />{" "}
                  </a>
                </ul>
              </div>
              <div className="bg-theme-light text-gray-800 space-y-3  rounded-2xl p-5 ">
                <p className="text-lg font-semibold tracking-wider !leading-snug text-center">
                  Save 20% on our entire catalogue
                </p>
                <p className="text-sm text-center">
                  Join now to save big on design assets
                </p>
                <button className=" tracking-wide w-full bg-theme inline-block text-white px-4 py-2.5 rounded-md hover:bg-dark-theme transition">
                  Learn About Membership
                </button>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
}

export default Category;
