// "use client";
import AppLayout from "@/layout";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import ReadMore from "@/components/common/ReadMore";
import CollectionMdl from "@/components/project/CollectionMdl";
import FilePreviewMdl from "@/components/project/FilePreviewMdl";
import List from "@/components/project/List";
import MessageMdl from "@/components/project/MessageMdl";
import Payment from "@/components/project/Payment";
import RatingReview from "@/components/project/RatingReview";
import { addToCartRequest } from "@/store/cart/actions";
import { followFollowingRequest } from "@/store/professionalprofile/actions";
import {
  favProjectRequest,
  projectDetailsRequest,
} from "@/store/project/actions";
import { formateDate } from "@/utils/dateMixin";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBookmark,
  FaCalendarAlt,
  FaExchangeAlt,
  FaHeart,
  FaPinterestP,
  FaPlus,
  FaRegBookmark,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Loader from "@/components/common/Loader";
import {
  addToCollectionRequest,
  listCollectionRequest,
} from "@/store/collection/actions";
import Swal from "sweetalert2";
import Image from "next/image";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [filePreview, setFilePreview] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [projectIdForCollection, setProjectIdForCollection] = useState("");
  const [fileProjectId, setFileProjectId] = useState("");
  const [ownerId, setOwnerId] = useState("");

  /**project name first latter capital */
  const firstLatterCapital = (str) => {
    return str && str?.charAt(0)?.toUpperCase() + str?.slice(1);
  };
  const {
    isLoading,
    projectFavData,
    projectDetailData,
    follwFollowing,
    loader,
    cartAddData,
    cartLoader,
    collectionCreateData,
    collectionAddData,
  } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    projectFavData: store?.project?.projectFavData,
    projectDetailData: store?.project?.projectDetailsData,
    follwFollowing: store?.professionalprofile?.follwFollowing,
    loader: store?.professionalprofile?.loadingFollow,
    cartLoader: store?.cart?.loading,
    cartAddData: store?.cart?.cartAddData,
    collectionCreateData: store?.collection?.collectionCreateData,
    collectionAddData: store?.collection?.collectionAddData,
  }));

  const handleChange = (userId, flag) => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isAuthentication") &&
      userId
    ) {
      dispatch(
        followFollowingRequest({
          id: userId,
        })
      );
      projectDetailData.created_by.isFollowed = !flag;
      // projectDetailData.is_wishlist = !flag;
      // projectDetailData?.created_by?.isFollowed = !flag
    } else {
      router.push("/auth/login");
    }
  };
  /**project favorite or not */
  const projectFavourite = (projectId, flag, type, index) => {
    if (localStorage.getItem("isAuthentication")) {
      dispatch(favProjectRequest({ projectId: projectId }));
      if (type == "Normal") {
        projectDetailData.is_wishlist = !flag;
      } else if (type == "MeettheShop") {
        projectDetailData.most_liked_projects_of_created_by[index].is_wishlist =
          !flag;
      }
    } else {
      router.push("/auth/login");
    }
  };

  /** project book mark */
  const projectCollection = (projectId) => {
    if (localStorage.getItem("isAuthentication")) {
      setProjectIdForCollection(projectId);
      setOpen(true);
    } else {
      router.push("/auth/login");
    }
  };
  // useEffect(() => {
  //   // if (localStorage.getItem("isAuthentication")) {

  //     if (collectionCreateData.legnth > 0 ||
  //       collectionAddData.legnth > 0) {

  //       dispatch(
  //         listCollectionRequest({
  //           data
  //         })
  //       );
  //     }
  //   // }
  // }, [collectionAddData])

  /**
   * get project details get api
   */
  // useEffect(() => {
  //   if (typeof router?.query?._id !== "undefined") {
  //     dispatch(
  //       projectDetailsRequest({
  //         data: router?.query?._id,
  //       })
  //     );
  //   }
  // }, [router?.query?._id]);
  useEffect(() => {
    if (typeof router?.query?._id === undefined) {
      return;
    }

    if (
      // projectFavData ||
      // follwFollowing ||
      cartAddData ||
      typeof router?.query?._id !== "undefined"
    ) {
      dispatch(
        projectDetailsRequest({
          data: router?.query?._id,
        })
      );
    }
  }, [
    // projectFavData,
    // follwFollowing,
    cartAddData,
    router?.query?._id,
    // collectionCreateData,
    collectionAddData,
  ]);

  useEffect(() => {
    if (projectId) {
      dispatch(addToCartRequest({ projectId: projectId }));
    }
  }, [projectId]);
  // const scrollToTop = () => {
  //   document.getElementById("suggestScroll").scrollIntoView();
  // };

  // useEffect(() => {
  //   scrollToTop();
  // }, [router]);
  return (
    <>
      {isLoading && <Loader />}
      {projectDetailData?.project_status === "approved" ? (
        <AppLayout>
          {/* <div className="container"> */}
          {/* <!-- Suggested Searches -END --> */}
          <section className="md:py-8 py-8" id="suggestScroll">
            <div className="container xl:px-20 px-4 mx-auto">
              <h2 className="text-gray-900">
                <span className="font-bold lg:text-lg">Suggested Searches</span>
                <span className="lg:text-base text-sm">
                  {" "}
                  based on this product
                </span>
              </h2>
              <div className="flex items-center gap-2 py-3  flex-wrap whitespace-nowrap">
                {(projectDetailData?.suggestion || [])?.map((i, el) => {
                  return (
                    <Link
                      href={`/project/list?search=${i}`}
                      key={el}
                      className="2xl:py-3 cursor-pointer   md:py-2 py-1.5 2xl:px-5 md:px-4 px-3 xl:text-base text-sm rounded-full bg-yellow-300 transition-all hover:bg-yellow-500 "
                    >
                      {i}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
          {/* <!-- COLLECTION-START --> */}
          <section>
            <div className="container xl:px-24 px-4 mx-auto">
              <h2 className="xl:text-2xl lg:text-xl text-lg font-bold tracking-wider">
                {firstLatterCapital(projectDetailData?.project_name)}
                {/* {projectDetailData?.project_name} */}
              </h2>
              <div className="flex items-center gap-1.5 xl:py-2 py-1">
                <div className=" lg:w-7 w-6 lg:h-7 h-6">
                  <img
                    src={
                      projectDetailData &&
                      projectDetailData?.created_by?.profile_image
                    }
                    width={720}
                    height={720}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <Link
                  href={`/professional/profile/${projectDetailData?.created_by?._id}`}
                  className="font-light"
                >
                  {projectDetailData?.created_by?.name}
                </Link>
              </div>
              <div className="md:grid md:grid-cols-3 space-y-4 md:space-y-0 xl:gap-6 lg:gap-4 gap-3">
                <div className="md:col-span-2">
                  <div>
                    <Swiper
                      navigation={{
                        navigation: {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                        },
                      }}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      modules={[Navigation, Thumbs]}
                      className="mySwiper2 group"
                    >
                      {(projectDetailData?.largeSS || [])?.map((i, el) => {
                        return (
                          <SwiperSlide key={el}>
                            <div className="2xl:h-[595px] xl:h-[475px] lg:h-[435px] md:h-[325px] sm:h-[400px] xs:h-[300px] h-[250px] ">
                              <img
                                src={i.file_path}
                                width={720}
                                height={720}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}

                      <div className="absolute hidden sm:block lg:top-4 top-2 lg:right-5 md:right-1 right-3 lg:space-y-2 space-y-1 z-50">
                        <div className="2xl:w-12 lg:w-10 w-8 2xl:h-12 lg:h-10 h-8 cursor-pointer bg-white text-gray-600 transition-all hover:text-theme flex items-center justify-center rounded-full">
                          <span className="lg:text-base text-sm">
                            {projectDetailData?.is_wishlist ? (
                              <FaHeart
                                color="#088178"
                                className="xl:text-xl text-base"
                                onClick={() => {
                                  projectFavourite(
                                    projectDetailData?._id,
                                    projectDetailData?.is_wishlist,
                                    "Normal"
                                  );
                                }}
                              />
                            ) : (
                              <FaRegHeart
                                className="xl:text-xl text-base"
                                onClick={() => {
                                  projectFavourite(
                                    projectDetailData?._id,
                                    projectDetailData?.is_wishlist,
                                    "Normal"
                                  );
                                }}
                              />
                            )}
                          </span>
                        </div>
                        <div className="2xl:w-12 lg:w-10 w-8 2xl:h-12 lg:h-10 h-8 overflow-hidden cursor-pointer  bg-white text-gray-600 transition-all hover:text-theme flex items-center justify-center rounded-full">
                          <div className="block md:rounded-none sm:rounded-md  rounded-none xs:text-base text-sm bg-white sm:bg-theme-light md:bg-white xs:p-2 p-1.5">
                            {projectDetailData?.is_bookmark ? (
                              <FaBookmark
                                color="#088178"
                                className="xl:text-xl text-base"
                                onClick={() => {
                                  projectCollection(projectDetailData?._id);
                                }}
                              />
                            ) : (
                              <FaRegBookmark
                                className="xl:text-xl text-base"
                                onClick={() => {
                                  projectCollection(projectDetailData?._id);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="absolute z-50 lg:scale-0 group-hover:scale-100 cursor-pointer top-2.5 left-2.5 bg-red-900 p-1  text-white rounded flex items-center text-xs gap-0.5">
                        <FaPinterestP />
                        <p>Save</p>
                      </div>
                    </Swiper>

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={3}
                      slidesPerView={8}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper md:!flex gap-2 my-3 !hidden"
                    >
                      {(projectDetailData?.smallSS || [])?.map((i, el) => {
                        return (
                          <SwiperSlide key={el}>
                            <div className="border-4 cursor-pointer w-full border-transparent hover:border-theme transition-all 2xl:h-[70px] h-16">
                              <img
                                src={i.file_path}
                                width={720}
                                height={720}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
                {/* <!-- PAYMENT-START --> */}
                {projectDetailData && (
                  <Payment
                    projectDetailData={projectDetailData}
                    // isLoading={cartLoader}
                    setProjectId={setProjectId}
                  />
                )}
                {/* <!-- PAYMENT-END --> */}
              </div>
            </div>
          </section>

          {projectDetailData && (
            <>
              {/* <!-- COLLECTION-END --> */}
              {/* ABOUT-THE-PRODUCT-START  */}
              <section>
                <div className="container xl:px-24 px-4 mx-auto">
                  <div className="md:grid grid-cols-3 pt-7  lg:items-start lg:gap-10 gap-5">
                    <div className="col-span-2">
                      {/* Details */}
                      <div className="about -z-[9]  overflow-hidden">
                        <h2 className="text-gray-900 font-bold xl:text-2xl text-xl">
                          About the Product
                        </h2>
                        <p className="text-gray-900 xl:text-base text-sm font-bold pt-2 ">
                          {firstLatterCapital(projectDetailData?.project_name)}
                        </p>
                      </div>
                      <ReadMore>{projectDetailData?.description}</ReadMore>
                    </div>
                    <div className="text-gray-900 py-5 md:py-0">
                      <h2 className="xl:text-xl text-lg tracking-wider font-semibold">
                        Product Specs
                      </h2>
                      <div className="xl:space-y-5 space-y-3 xl:py-5 lg:py-4 py-3">
                        <div className="flex items-center xl:gap-3.5 gap-2">
                          <span className="xl:text-2xl text-lg text-gray-900">
                            <FaCalendarAlt />
                          </span>
                          <p className="xl:text-base text-sm">
                            Created: {formateDate(projectDetailData?.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center xl:gap-3.5 gap-2">
                          <span className="xl:text-2xl text-lg text-gray-900">
                            <FaExchangeAlt />
                          </span>
                          <p className="xl:text-base text-sm">
                            Compatible with:&nbsp;
                            {projectDetailData?.technologies?.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gxl:ap-3.5  gap-2">
                          <span className="xl:text-2xl text-lg text-gray-900">
                            <FaShoppingBag />
                          </span>
                          <p className="xl:text-base text-sm">
                            File Size: {projectDetailData?.project_file_size}
                          </p>
                        </div>
                        {/* <div className="flex items-center gxl:ap-3.5  gap-2">
                      <span className="xl:text-2xl text-lg text-gray-900">
                        <FaMagic />
                      </span>
                      <p className="xl:text-base text-sm">
                        Dimensions: 1920 x 1080 px
                      </p>
                    </div> */}
                        {/* <div className="flex items-center xl:gap-3.5 gap-2">
                      <span className="xl:text-2xl text-lg text-gray-900">
                        <FaChessBoard />
                      </span>
                      <p className="xl:text-base text-sm">DPI: 300</p>
                    </div> */}

                        <button
                          type="button"
                          onClick={() => {
                            setFileProjectId(projectDetailData?._id);
                            setFilePreview(!filePreview);
                          }}
                          className="text-theme font-bold tracking-wider pt-1 xl:text-base text-sm block"
                        >
                          Preview the Files
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*  ABOUT-THE-PRODUCT-END*/}
              {/* <!-- MEET THE SHOP-START --> */}
              <section className="lg:py-20 py-5">
                <div className="container xl:px-24 px-4 mx-auto">
                  {/* <!-- Meet the shop --> */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-gray-900 font-semibold lg:text-2xl text-xl pb-4">
                      Meet the Shop
                    </h2>
                    <Link
                      href={`/professional/profile/${projectDetailData?.created_by?._id}`}
                      className="flex items-center gap-2 font-bold text-theme text-sm"
                    >
                      Go to shop<i className="fa-solid fa-angle-right"></i>
                    </Link>
                  </div>
                  <div className="md:grid grid-cols-3 xl:gap-8 lg:gap-4 md:gap-1.5 sm:gap-4 gap-2.5 md:py-6 sm:py-3 py-2">
                    <div className="p-1">
                      <div className="shadow-lg 2xl:py-14 lg:py-10 md:py-5 py-10 w-full text-center lg:px-10 px-6 ">
                        <Link
                          href={`/professional/profile/${projectDetailData?.created_by?._id}`}
                        >
                          <div className="2xl:w-16 lg:w-14 w-10 2xl:h-16 lg:h-14 h-10 mx-auto">
                            <img
                              src={projectDetailData?.created_by?.profile_image}
                              width={720}
                              height={720}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          </div>
                          <h2 className="xl:py-2 py-1 lg:text-base  font-semibold tracking-wider">
                            {projectDetailData?.created_by?.name}
                          </h2>
                        </Link>
                        <p className="text-gray-900 xl:text-base text-sm text-ellipsis line-clamp-3 ">
                          {projectDetailData?.created_by?.description}
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              handleChange(
                                projectDetailData?.created_by?._id,
                                projectDetailData?.created_by?.isFollowed
                              );
                            }}
                            disabled={
                              (typeof window !== "undefined" &&
                                localStorage.getItem("userID") ===
                                  projectDetailData?.created_by?._id) ||
                              loader
                            }
                            className={
                              typeof window !== "undefined" &&
                              (localStorage.getItem("userID") ===
                                projectDetailData?.created_by?._id) ===
                                true
                                ? "xl:text-sm text-xs py-1 px-3 flex items-center gap-1 border-2 border-theme/50 font-bold rounded bg-theme/50 text-white "
                                : "xl:text-sm text-xs py-1 px-3 flex items-center gap-1 border-2 border-theme hover:border-dark-theme font-bold rounded bg-theme hover:bg-dark-theme text-white "
                            }
                          >
                            {loader ? (
                              <CircularProgress size={15} color="inherit" />
                            ) : projectDetailData?.created_by?.isFollowed ? (
                              "Following"
                            ) : (
                              <>
                                <FaPlus />
                                Follow
                              </>
                            )}
                          </button>
                          {/* <button
                        onClick={() => {
                          setOwnerId(projectDetailData?.created_by?._id);
                          setOpenMsg(!openMsg);
                        }}
                        className="xl:text-sm text-xs py-1 px-3 flex items-center gap-1 font-bold border-2 border-theme rounded  hover:bg-theme-light text-theme "
                      >
                        Message
                      </button> */}
                        </div>
                      </div>
                    </div>
                    {(
                      projectDetailData?.most_liked_projects_of_created_by || []
                    )?.map((i, el) => {
                      return (
                        <div
                          key={el}
                          className="group sm:flex flex-col gap-4 cursor-pointer p-1 sm:p-0 md:!p-1 overflow-hidden rounded-md"
                        >
                          <div className="relative sm:p-1 md:p-0 overflow-hidden md:!overflow-visible">
                            <Link href={`/project/project-details/${i?._id}`}>
                              <div className="2xl:h-[225px]  xl:h-[185px] lg:h-[175px] md:h-[130px] xs:h-[230px] h-[205px] sm:w-[195px]  sm:max-w-[195px] md:w-full md:max-w-none">
                                <img
                                  src={i?.webp_banner_file_path}
                                  width={720}
                                  height={720}
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                              </div>
                            </Link>
                            <div className="absolute top-2.5 hidden group-hover:flex lg:scale-0 md:right-2.5 sm:-right-96 right-2.5 z-30 duration-700 transition flex-col lg:flex sm:gap-2 md:gap-0 justify-center sm:shadow-sm md:shadow-none group-hover:scale-100">
                              <div className="block xs:p-2 p-1.5 md:!border-b md:border-solid md:rounded-none sm:rounded-md rounded-none bg-white sm:bg-theme-light md:bg-white sm:border-none border-b xs:text-base text-sm border-black">
                                {i?.is_wishlist ? (
                                  <FaHeart
                                    color="#088178"
                                    size={14}
                                    onClick={() => {
                                      projectFavourite(
                                        i?._id,
                                        i?.is_wishlist,
                                        "MeettheShop",
                                        el
                                      );
                                    }}
                                  />
                                ) : (
                                  <FaRegHeart
                                    size={14}
                                    onClick={() => {
                                      projectFavourite(
                                        i?._id,
                                        i?.is_wishlist,
                                        "MeettheShop",
                                        el
                                      );
                                    }}
                                  />
                                )}
                              </div>
                              <div className="block md:rounded-none sm:rounded-md rounded-none xs:text-base text-sm bg-white sm:bg-theme-light md:bg-white xs:p-2 p-1.5">
                                {i?.is_bookmark ? (
                                  <FaBookmark
                                    color="#088178"
                                    size={14}
                                    onClick={() => {
                                      projectCollection(i?._id);
                                    }}
                                  />
                                ) : (
                                  <FaRegBookmark
                                    size={14}
                                    onClick={() => {
                                      projectCollection(i?._id);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                            {i?.discount < 0 ? (
                              <>
                                <div className="absolute -top-[58px] -right-[54px] w-28 h-28 lg:text-base text-sm rotate-[133deg] text-white bg-[#e06868] rounded-lg flex flex-col items-end justify-center p-1.5 text-bold !leading-none">
                                  <div className="rotate-[272deg]">
                                    <p>{i?.discount}%</p>
                                    <p>OFF</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="md:flex sm:block flex justify-between py-2 px-0.5 gap-3 grow">
                            <div>
                              <Link href={`/project/project-details/${i?._id}`}>
                                <p className="max-w-xs xl:text-lg lg:text-base md:text-sm sm:text-base !mr-auto text-sm text-ellipsis line-clamp-1 font-bold">
                                  {i?.project_name}
                                </p>
                              </Link>
                              <p className="lg:text-sm md:text-xs sm:text-sm text-xs text-gray-400">
                                by{" "}
                                <Link
                                  href={`/professional/profile/${projectDetailData?.created_by?._id}`}
                                >
                                  <span className="text-gray-900">
                                    {i?.created_by}&nbsp;
                                  </span>
                                </Link>
                                in
                                <span className="text-gray-900">
                                  &nbsp; {i?.category_name}
                                </span>
                              </p>
                            </div>
                            <div>
                              {i?.price > 0 ? (
                                <>
                                  <p className="inline-block sm:mt-3 md:mt-0 text-gray-900 font-bold xl:text-base lg:text-sm md:text-xs xs:text-sm text-xs bg-theme-light rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                                    ${numberWithCommas(i?.price)}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="inline-block sm:mt-3 md:mt-0 font-bold lg:text-sm md:text-xs xs:text-sm text-xs bg-theme/70 text-white rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                                    FREE
                                  </p>
                                </>
                              )}
                              {/* <p className="inline-block sm:mt-3 md:mt-0 text-gray-900 font-bold xl:text-base lg:text-sm md:text-xs xs:text-sm text-xs bg-theme-light rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                          ${i?.price}
                        </p> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              {/* <!-- MEET THE SHOP-START --> */}
              {/* <!-- MORE DESIGN-START --> */}
              <section className="pb-10">
                <div className="container xl:px-24 px-4 mx-auto">
                  <h2 className="text-gray-900 font-semibold  lg:text-xl text-lg">
                    More from {projectDetailData?.created_by?.name}
                  </h2>
                  <List
                    projectListData={
                      projectDetailData?.random_projects_of_created_by
                    }
                    col={4}
                    type="list"
                  />
                </div>
              </section>
              {/* <!-- MORE DESIGN-END --> */}
              {/* <!-- YOU MAY ALSO LIKE-START --> */}
            </>
          )}

          {projectDetailData?.related_projects?.length > 0 && (
            <section>
              <div className="container xl:px-24 px-4 mx-auto">
                <h2 className="text-gray-900 font-semibold lg:text-2xl text-xl ">
                  You May Also Like
                </h2>
                {/* <!-- you may also like --> */}
                <List
                  projectListData={projectDetailData?.related_projects}
                  col={4}
                  type="list"
                />
              </div>
            </section>
          )}
          {/* <!-- YOU MAY ALSO LIKE-END --> */}
          {/* <!-- REVIEW-START --> */}
          {projectDetailData && (
            <RatingReview projectId={projectDetailData?._id} />
          )}

          {/* <!-- REVIEW-END --> */}
          {/* <!-- KEEP EXPLORING-START --> */}

          <section className="py-5">
            <div className="container xl:px-24 px-4 mx-auto">
              <h2 className="text-gray-900 font-semibold  lg:text-2xl text-xl  pb-3">
                Keep Exploring
              </h2>
              <div className="flex items-center lg:gap-3 gap-2 py-3  flex-wrap whitespace-nowrap">
                {/* <a className="sm:py-2 py-1.5 sm:px-5 px-4 font-medium xl:text-base text-sm rounded-full bg-blue-200 transition-all hover:bg-blue-400 ">
                  12 days of christmas
                </a> */}
                {(projectDetailData?.tags || [])?.map((i, el) => {
                  return (
                    <Link
                      href={`/project/list?search=${i}`}
                      key={el}
                      className="sm:py-2 py-1.5 sm:px-5 px-4 font-medium xl:text-base text-sm rounded-full bg-blue-200 transition-all hover:bg-blue-400 "
                    >
                      {i}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* <!-- KEEP EXPLORING-END --> */}
          <CollectionMdl
            projectId={projectIdForCollection}
            open={open}
            setOpen={setOpen}
          />
          <MessageMdl ownerId={ownerId} open={openMsg} setOpen={setOpenMsg} />
          <FilePreviewMdl
            projectId={fileProjectId}
            open={filePreview}
            setFilePreview={setFilePreview}
          />
          {/* </div> */}
        </AppLayout>
      ) : projectDetailData?.project_status === "suspend" ||
        projectDetailData?.project_status === "reject" ||
        projectDetailData?.project_status === "pending" ? (
        <div className=" h-screen ">
          <div
            className="lg:w-48 sm:w-40 xs:w-full absolute top-10 left-10  lg:h-12 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/assets/DM-Logo.png"
              alt="lazy-loader"
              className="object-cover w-full h-full"
              width={720}
              height={720}
            />
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="shadow-lg p-10 rounded max-w-2xl  ">
              <div className="w-28 h-28 mx-auto mb-7">
                <Image
                  width={700}
                  height={700}
                  className="w-full h-full object-cover mx-auto"
                  src="/assets/access-denied.png"
                />
              </div>
              <h2 className="text-theme font-medium text-2xl">
                Sorry for interrupt this page can't open{" "}
              </h2>
              <div className="text-center pt-5">
                <button
                  className="xl:text-sm text-xs py-1 px-3  border-2 border-theme hover:border-dark-theme font-bold rounded bg-theme hover:bg-dark-theme text-white "
                  onClick={() => {
                    router.push("/project/list");
                  }}
                >
                  Back To Project List
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProjectDetails;
