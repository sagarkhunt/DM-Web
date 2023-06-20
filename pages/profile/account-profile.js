import Collections from "@/components/collection/Collections";
import Loader from "@/components/common/Loader";
import FollowFllowingMdl from "@/components/project/FollowFllowingMdl";
import List from "@/components/project/List";
import AppLayout from "@/layout";
import { profileDetailsRequest } from "@/store/user/actions";
import { formateDateYear } from "@/utils/dateMixin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaHeart, FaPencilAlt, FaTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const AccountProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tabindex, setTabIndex] = useState("likes");
  const [tabVal, setTabVal] = useState(0);
  const [openFollowFollowing, setOpenFollowFollowing] = useState(false);
  const [openMdlFollowFollowing, setOpenMdlFollowFollowing] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const tabHandler = (index) => {
    setTabIndex(index);
  };
  const { userProfileDetails, isLoading, collectionAddData, projectFavData } =
    useSelector((store) => ({
      userProfileDetails: store?.user?.userProfileDetails,
      isLoading: store?.user?.loading,
      projectFavData: store?.project?.projectFavData,
      collectionAddData: store?.collection?.collectionAddData,
    }));
  /**
   * get user profile details
   */
  useEffect(() => {
    dispatch(profileDetailsRequest());
  }, [projectFavData, collectionAddData]);

  useEffect(() => {
    if (router?.query?.index) {
      setTabIndex(router?.query?.index);
    }
  }, [router?.query?.index]);
  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        {/* <!-- PROFILE-START --> */}
        <section className="lg:pt-16 pt-12">
          <div className="container xl:px-24 px-4 mx-auto">
            <div className="mx-auto sm:w-24 w-20 sm:h-24 h-20 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover mx-auto"
                width={720}
                height={720}
                src={userProfileDetails?.profile_image_path}
                alt=""
              />
            </div>
            <h2 className="lg:text-2xl text-xl font-semibold text-center py-3">
              {userProfileDetails?.name}
            </h2>
            <Link href={`/profile/profile-settings`}>
              <p className="text-theme flex items-center cursor-pointer hover:text-dark-theme gap-1 lg:text-base text-sm font-semibold justify-center xl:py-3.5 sm:py-1.5">
                <FaPencilAlt />
                Edit profile Settings
              </p>
            </Link>
            {/* <!-- Tabing --> */}
            <div className="py-1 border-b flex profile lg:gap-9 xs:gap-6 gap-4 font-bold lg:text-base text-sm flex-wrap items-center justify-center mt-5">
              {/* <button
              className={`${
                tabindex == 0 ? "active" : ""
              } text-gray-900 border-b-4 border-transparent py-1 px-1`}
              onClick={() => tabHandler(0)}
            >
              Activity
            </button> */}
              <button
                className={`${
                  tabindex == "likes" ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler("likes")}
              >
                Likes
              </button>
              <button
                className={`${
                  tabindex == "collection" ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler("collection")}
              >
                Collections
              </button>
              <button
                className={`${
                  tabindex == "about" ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler("about")}
              >
                About
              </button>
            </div>

            <div className="md:py-9 py-7 w-full ">
              {tabindex === "activity" ? (
                ""
              ) : // <div className="profile-content" id="activity">
              //   <p className="font-semibold tracking-wider text-sm py-1.5">
              //     Filter By
              //   </p>
              //   <select className="bg-transparent md:py-2.5 py-2 border w-56 text-sm border-gray-400 focus:outline-none md:px-3 px-2 rounded">
              //     <option>All Activity</option>
              //     <option>Reviews</option>
              //     <option>likes</option>
              //     <option>Collections</option>
              //     <option>Comments</option>
              //     <option>Following</option>
              //     <option>Products</option>
              //   </select>
              //   <div className="py-9 lg:space-y-11 sm:space-y-6 space-y-4">
              //     <div className="flex xs:flex-nowrap flex-wrap lg:gap-6 md:gap-5 gap-3 items-start">
              //       <div className="lg:w-[230px] md:w-[200px] xs:w-[185px] w-full lg:min-w-[230px] md:min-w-[200px] xs:min-w-[185px] lg:h-[140px] md:h-[120px] xs:h-[110px] h-[200px]">
              //         <img
              //           src="../assets/images/font1.webp"
              //           className="w-full h-full object-cover"
              //           alt=""
              //         />
              //       </div>
              //       <div className="flex sm:flex-nowrap flex-wrap items-start md:gap-7 xs:gap-4 gap-2 justify-between w-full xs:py-1.5 ">
              //         <a
              //           href=""
              //           className="flex items-start lg:gap-2 gap-1.5 text-gray-900 2xl:text-lg lg:text-base text-sm"
              //         >
              //           <i className="fa-solid fa-heart pt-1"></i>RiddhiKhanpara
              //           liked Risoprint - Risograph Grain Effect
              //         </a>
              //         <p className="text-slate-400 whitespace-nowrap 2xl:text-lg ml-auto lg:text-base text-sm">
              //           Mar 20, 2023
              //         </p>
              //       </div>
              //     </div>
              //     <div className="flex xs:flex-nowrap flex-wrap lg:gap-6 md:gap-5 gap-3 items-start">
              //       <div className="lg:w-[230px] md:w-[200px] xs:w-[185px] w-full lg:min-w-[230px] md:min-w-[200px] xs:min-w-[185px] lg:h-[140px] md:h-[120px] xs:h-[110px] h-[200px]">
              //         <img
              //           src="../assets/images/font1.webp"
              //           className="w-full h-full object-cover"
              //           alt=""
              //         />
              //       </div>
              //       <div className="flex sm:flex-nowrap flex-wrap items-start md:gap-7 xs:gap-4 gap-2 justify-between w-full xs:py-1.5 ">
              //         <a
              //           href=""
              //           className="flex items-start lg:gap-2 gap-1.5 text-gray-900 2xl:text-lg lg:text-base text-sm"
              //         >
              //           <i className="fa-solid fa-heart pt-1"></i>RiddhiKhanpara
              //           liked Risoprint - Risograph Grain Effect
              //         </a>
              //         <p className="text-slate-400 whitespace-nowrap 2xl:text-lg ml-auto lg:text-base text-sm">
              //           Mar 20, 2023
              //         </p>
              //       </div>
              //     </div>
              //     <div className="flex xs:flex-nowrap flex-wrap lg:gap-6 md:gap-5 gap-3 items-start">
              //       <div className="lg:w-[230px] md:w-[200px] xs:w-[185px] w-full lg:min-w-[230px] md:min-w-[200px] xs:min-w-[185px] lg:h-[140px] md:h-[120px] xs:h-[110px] h-[200px]">
              //         <img
              //           src="../assets/images/font1.webp"
              //           className="w-full h-full object-cover"
              //           alt=""
              //         />
              //       </div>
              //       <div className="flex sm:flex-nowrap flex-wrap items-start md:gap-7 xs:gap-4 gap-2 justify-between w-full xs:py-1.5 ">
              //         <a
              //           href=""
              //           className="flex items-start lg:gap-2 gap-1.5 text-gray-900 2xl:text-lg lg:text-base text-sm"
              //         >
              //           <i className="fa-solid fa-heart pt-1"></i>RiddhiKhanpara
              //           liked Risoprint - Risograph Grain Effect
              //         </a>
              //         <p className="text-slate-400 whitespace-nowrap 2xl:text-lg ml-auto lg:text-base text-sm">
              //           Mar 20, 2023
              //         </p>
              //       </div>
              //     </div>
              //   </div>
              //   <div className="flex xs:flex-nowrap flex-wrap gap-2 items-center justify-between py-5">
              //     <p className="flex items-center lg:text-base text-sm gap-1.5 text-gray-900 ">
              //       <i className="fa-solid fa-tag rotate-90"></i> RiddhiKhanpara
              //       joined Creative Market
              //     </p>
              //     <p className="text-slate-400 lg:text-base text-sm ml-auto whitespace-nowrap">
              //       Mar 20, 2023
              //     </p>
              //   </div>
              // </div>
              tabindex === "likes" ? (
                <div className="profile-content" id="likes">
                  <List
                    projectListData={userProfileDetails?.favorites || []}
                    col={4}
                    type="list"
                    isLoading={isLoading}
                  />
                </div>
              ) : tabindex === "collection" ? (
                <div
                  className="profile-content text-gray-900 "
                  id="collections"
                >
                  <Collections
                    collectionListData={userProfileDetails?.collections}
                    isLoading={isLoading}
                  />
                </div>
              ) : tabindex === "about" ? (
                <div className="profile-content text-gray-900 " id="about">
                  <div className="mx-auto max-w-xs py-9 px-16 bg-white shadow border rounded-md">
                    <div className="flex items-center md:text-base text-sm justify-center gap-10">
                      <div
                        className="text-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setOwnerId(localStorage.getItem("userID"));
                          setTabVal(0);
                          setOpenMdlFollowFollowing(!openMdlFollowFollowing);
                        }}
                      >
                        <p className="md:text-2xl text-xl font-bold !leading-none">
                          {userProfileDetails?.followers}
                        </p>
                        <p>Followers</p>
                      </div>
                      <div
                        className="text-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setOwnerId(localStorage.getItem("userID"));
                          setTabVal(1);
                          setOpenMdlFollowFollowing(!openMdlFollowFollowing);
                        }}
                      >
                        <p className="md:text-2xl  text-xl font-bold !leading-none">
                          {userProfileDetails?.following}
                        </p>
                        <p>Following</p>
                      </div>
                    </div>
                    <p className="flex items-center justify-center gap-1.5 xl:py-5 py-3.5 xl:text-lg md:text-base text-sm cursor-pointer">
                      {/* <i className="fa-solid fa-tag rotate-90 "></i> */}
                      <span className="rotate-90">
                        <FaTag />
                      </span>{" "}
                      Est. {formateDateYear(userProfileDetails?.createdAt)}
                    </p>
                    {/* <p className="text-theme flex items-center gap-1 md:text-base text-sm font-semibold justify-start py-1">
                    <i className="fa-solid fa-pen text-xs"></i>Edit
                  </p> */}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
        {openMdlFollowFollowing && (
          <FollowFllowingMdl
            ownerId={ownerId}
            open={openMdlFollowFollowing}
            tabIndex={tabVal}
            setOpen={setOpenMdlFollowFollowing}
          />
        )}
        {/* <!-- PROFILE-END --> */}
      </AppLayout>
    </>
  );
};

export default AccountProfile;
