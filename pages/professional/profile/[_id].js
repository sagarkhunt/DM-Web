import MessageMdl from "@/components/project/MessageMdl";
import AppLayout from "@/layout";
import { listCateoryUserWiseRequest } from "@/store/category/actions";
import {
  followFollowingClear,
  followFollowingRequest,
  shopeListRequest,
} from "@/store/professionalprofile/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Shope from "./components/Shope";
import { CircularProgress, Rating } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";

const ProfileView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [tabindex, setTabIndex] = useState(0);
  const profileDetails = useSelector((store) => store?.auth?.verifyTokenData);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [limit, setLimit] = useState(12);

  /**
   *
   * @param {tabHandler} index
   */
  const tabHandler = (index) => {
    setTabIndex(index);
  };
  const {
    shopeListData,
    follwFollowing,
    loadingFollow,
    isLoader,
    categoryProjectListData,
    categoryListUserWiseData,
    collectionCreateData,
    collectionAddData,
  } = useSelector((store) => ({
    shopeListData: store?.professionalprofile?.shopeListdData,
    follwFollowing: store?.professionalprofile?.follwFollowing,
    loadingFollow: store?.professionalprofile?.loadingFollow,
    isLoader: store?.professionalprofile?.loading,
    categoryProjectListData: store?.category?.categoryProjectListData,
    categoryListUserWiseData: store?.category?.categoryListUserWiseData,
    collectionCreateData: store?.collection?.collectionCreateData,
    collectionAddData: store?.collection?.collectionAddData,
  }));

  /**
   *
   * @param {handleSearch} e
   */
  const handleSearch = (e) => {
    setPage(1);
    setSearch(e?.target?.value);
  };

  const [staticFollow, setStaticFollow] = useState(
    shopeListData?.user?.isFollowed
  );

  useEffect(() => {
    setStaticFollow(shopeListData?.user?.isFollowed);
  }, [shopeListData]);

  const handleChangeFollow = (e) => {
    if (!staticFollow) {
      shopeListData.user.follower += 1;
    } else {
      shopeListData.user.follower -= 1;
    }
    setStaticFollow(!staticFollow);
    e.preventDefault();
    if (router?.query?._id && localStorage.getItem("isAuthentication")) {
      dispatch(
        followFollowingRequest({
          id: router?.query?._id,
        })
      );
    } else {
      router.push("/auth/login");
    }
  };
  // const handleChangeCategory = (e) => {
  //   setCategoryId(e?.target?.value);
  // };
  /**
   *get professional shope list
   */
  useEffect(() => {
    const body = {
      page: page,
      search: search,
      limit: limit,
      categoryId: categoryId ? JSON.stringify([categoryId]) : [],
      isProfessionalProject: true,
    };
    dispatch(followFollowingClear());
    if (router?.query?._id) {
      dispatch(
        shopeListRequest({
          body,
          id: router?.query?._id,
        })
      );
    }
  }, [
    router?.query?._id,
    search,
    page,
    categoryId,
    // collectionCreateData,
    // collectionAddData,
  ]);

  useEffect(() => {
    // dispatch(
    //   listProjectsCateoryRequest({
    //     params: { type: "projects" },
    //   })
    // );
    if (router?.query?._id) {
      dispatch(
        listCateoryUserWiseRequest({
          params: { type: "professional-shop", userId: router?.query?._id },
        })
      );
    }
  }, [router?.query?._id]);
  return (
    <>
      {/* {loader && <Loader />} */}
      <AppLayout>
        {/* <!-- BANNER_START --> */}
        <section className="xs:pt-10 pt-5">
          <div className="container xl:px-24 px-4 mx-auto">
            <div className="md:relative md:mb-14 mb-7">
              <div className="w-full h-[195px]  md:block hidden">
                <img
                  className="w-full h-full object-cover"
                  src={shopeListData?.user?.professional_banner_image}
                  alt=""
                />
                {/* {shopeListData?.user?.professional_banner_image} */}
              </div>
              <div className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 xl:w-24 xs:w-20 w-16 xl:h-24 xs:h-20 h-16 rounded-full overflow-hidden border-4 border-white bg-white mx-auto">
                <img
                  className="w-full h-full object-cover mx-auto"
                  src={shopeListData?.user?.profile_image}
                  alt=""
                />
              </div>
            </div>
            {/* <div className="mx-auto md:py-3 py-1 flex items-center justify-center">
              <button className="flex items-center justify-center gap-1 text-white bg-theme border-2 border-theme rounded font-semibold tracking-wider hover:bg-dark-theme hover:border-dark-theme transition-all text-sm py-1 xs:px-7 px-5">
                Verify
                <HiCheckBadge />
              </button>
            </div> */}
            <div className="text-center">
              <h2 className="text-gray-800 font-semibold md:text-2xl text-xl gap-1.5 flex items-center justify-center">
                {shopeListData?.user?.name}
                {shopeListData?.user?.is_verified ? (
                  <HiCheckBadge className="text-theme " />
                ) : (
                  ""
                )}
              </h2>
              <div className="flex items-center justify-center gap-7 md:py-4 py-3">
                <div className="flex items-center gap-1.5 text-gary-800 text-xs">
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={
                      shopeListData?.user?.averageRating === undefined
                        ? 0
                        : shopeListData?.user?.averageRating
                    }
                    readOnly
                    size="small"
                  />
                </div>

                {shopeListData?.user?.userDetails?.city && (
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    {/* <i className="fa-solid fa-location-dot"></i> */}
                    {/* <FaMapMarkerAlt /> */}
                    <div className="font-bold tracking-wide gap-1">
                      <span> {shopeListData?.user?.userDetails?.city},</span>
                      <span className="ml-1">
                        {shopeListData?.user?.userDetails?.country}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="max-w-2xl mx-auto md:text-base text-sm text-gray-800">
                {shopeListData?.user?.useDetails?.description}
                {/* We are a team of designers, developers & photographers from Italy
              and we love to create striking graphic resources! Visit our
              website to discover more abou…
              <a href="" className="text-theme font-semibold tracking-wide">
                Read More
              </a> */}
              </p>
              <div
                className="flex items-center justify-center gap-2 md:py-6 py-4"
                onClick={handleChangeFollow}
              >
                <button
                  disabled={
                    typeof window !== "undefined" &&
                    localStorage.getItem("userID") === router?.query?._id
                  }
                  type="button"
                  className={
                    typeof window !== "undefined" &&
                    (localStorage.getItem("userID") === router?.query?._id) ===
                      true
                      ? "text-white bg-theme/50 border-2 border-theme/50 rounded font-semibold tracking-wider transition-all text-sm py-1 xs:px-7 px-5"
                      : "text-white bg-theme border-2 border-theme rounded font-semibold tracking-wider hover:bg-dark-theme hover:border-dark-theme transition-all text-sm py-1 xs:px-7 px-5"
                  }
                >
                  {loadingFollow ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : follwFollowing?.isFollowed === undefined ? (
                    shopeListData?.user?.isFollowed ? (
                      "Following"
                    ) : (
                      "Follow"
                    )
                  ) : follwFollowing?.isFollowed ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                  {/* {shopeListData?.user?.isFollowed ? "Following" : "Follow"} */}
                </button>
                {/* <button
                className="text-theme border-2 border-theme rounded font-semibold tracking-wider hover:text-dark-theme hover:border-dark-theme hover hover:bg-theme-light text-sm py-1 xs:px-7 px-5"
                onClick={() => {
                  setOwnerId(1);
                  setOpenMsg(!openMsg);
                }}
              >
                Message
              </button> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- BANNER_END --> */}
        {/* <!-- TABING-START --> */}
        <section>
          <div className="container xl:px-24 px-4 mx-auto">
            <div className="py-1 border-b flex profile lg:gap-9 xs:gap-6 gap-4 font-bold lg:text-base text-sm flex-wrap items-center justify-center sm:mt-5 mt-2">
              <button
                className={`${
                  tabindex === 0 ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler(0)}
              >
                Shop
              </button>
              <button
                className={`${
                  tabindex === 1 ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler(1)}
              >
                About
              </button>
              <button
                className={`${
                  tabindex === 2 ? "active" : ""
                } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler(2)}
              >
                Reviews
              </button>
            </div>

            <div className="md:py-9 py-7 w-full">
              <div
                className={`${tabindex != 0 ? "hidden" : ""} shop-content`}
                id="shop"
              >
                <Shope
                  shopeData={shopeListData}
                  categoryList={categoryListUserWiseData}
                  search={search}
                  onChange={handleSearch}
                  setCategoryId={setCategoryId}
                  categoryId={categoryId}
                  page={page}
                  limit={limit}
                  setPage={setPage}
                  isLoading={isLoader}
                />
              </div>
              <div
                className={`${tabindex != 1 ? "hidden" : ""} shop-content`}
                id="about"
              >
                <About aboutData={shopeListData} />
              </div>
              <div
                className={`${
                  tabindex != 2 ? "hidden" : ""
                } shop-content  2xl:space-y-16 xl:space-y-12 md:space-y-10 xs:space-y-7 space-y-5`}
                id="review"
              >
                <Reviews />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- TABING-START --> */}

        <MessageMdl projectId={projectId} open={openMsg} setOpen={setOpenMsg} />
      </AppLayout>
    </>
  );
};

export default ProfileView;
