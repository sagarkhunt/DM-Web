import { addToCartRequest } from "@/store/cart/actions";
import { addToCollectionRequest } from "@/store/collection/actions";
import { favProjectRequest } from "@/store/project/actions";
import { numberWithCommas } from "@/utils/numberWithCommas";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import EditRatingMdl from "../mypurchase/EditRatingMdl";
import CollectionMdl from "./CollectionMdl";
import { CircularProgress, Rating } from "@mui/material";

const List = ({
  projectListData,
  col = 3,
  type = "list",
  pageName,
  isLoading,
  params,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState();
  const dispatch = useDispatch();
  const [purchaseId, setPurchaseId] = useState("");
  const [openrating, setOpenRating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [ratingstar, setRatingStar] = useState(0);
  const [ratingMessage, setRatingMessage] = useState("");
  const [id, setID] = useState("");

  const [likeFlag, setLikeFlag] = useState(false);

  const projectFavourite = (projectId, flag, index) => {
    if (localStorage.getItem("access")) {
      setLikeFlag(flag);
      dispatch(favProjectRequest({ projectId: projectId }));
      projectListData[index].is_wishlist = !flag;
    } else {
      router.push("/auth/login");
    }
  };

  const { loginUserId, collectionCreateId } = useSelector((store) => ({
    loginUserId: store?.auth?.verifyTokenData?._id,
    collectionCreateId: store?.collection?.getCollectionData?.user,
  }));

  const projectAddToCart = (projectId) => {
    dispatch(addToCartRequest({ projectId: projectId }));
  };

  const addProjectCollection = (id) => {
    if (localStorage.getItem("access")) {
      setOpen(true);
      setProjectId(id);
    } else {
      router.push("/auth/login");
    }
  };

  const editRatingReview = (id, rating, message) => {
    setOpenRating(true);
    setPurchaseId(id);
    setRatingStar(rating);
    setRatingMessage(message);
  };

  const projectRemoveFromCart = (projectId, collectionId) => {
    Swal.fire({
      title: "Are you sure want to remove from collection ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#088178",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          addToCollectionRequest({
            id: collectionId,
            projectId: projectId,
          })
        );
      }
    });
  };

  /**
   *
   * @param {getstars} Rating
   * @returns
   */
  const getstars = (Rating) => {
    return;
  };
  /**
   *
   * @param {downloadZip} projectId
   */
  const downloadZip = async (projectId) => {
    setID(projectId);
    setDownloading(true);
    const url = `${process.env.DESIGNER_MARKETPLACE_API_URL}/projects/download/${projectId}`;
    const authToken =
      typeof window !== "undefined" && localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // extract body as Blob
        } else if (response?.status === 401) {
          router.push("/auth/login");
        } else {
          setDownloading(false);
          throw new Error("Network response was not ok.");
        }
      })
      .then(async (data) => {
        if (data?.data) {
          const link = document.createElement("a");
          link.href = data?.data;
          link.setAttribute("download", "Test.zip");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
        setDownloading(false);
      })
      .catch((error) => {
        console.log("🚀 ~ file: Payment.js:48 ~ downloadZip ~ error:", error);
      });
  };

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <>
      {projectListData?.length > 0 ? (
        <div
          className={`grid md:grid-cols-${col} xl:gap-8 lg:gap-4 md:gap-1.5 sm:gap-4 gap-2.5 md:pt-5 sm:pt-3 pt-2 relative`}
        >
          {projectListData?.map((item, index) => {
            return (
              <div
                key={index}
                className="group sm:flex md:block gap-4 cursor-pointer 2xl:p-0 p-1 sm:p-0 md:p-1 overflow-hidden"
              >
                <div className="relative sm:p-1 md:p-0 overflow-hidden md:!overflow-visible">
                  <Link href={`/project/project-details/${item?._id}`}>
                    {/* <div
                          className={`${
                            col == 3
                              ? "2xl:h-[290px]  xl:h-[268px] lg:h-[215px] md:h-[160px] h-[205px] sm:w-[195px]  sm:max-w-[195px] md:w-full md:max-w-none"
                              : "2xl:h-[225px]  xl:h-[185px] lg:h-[175px] md:h-[130px] xs:h-[230px] h-[205px] sm:w-[195px]  sm:max-w-[195px] md:w-full md:max-w-none"
                          }`}
                        > */}
                    <div
                      className={`${
                        col == 3
                          ? "2xl:h-[290px]  xl:h-[268px] lg:h-[215px] md:h-[160px] sm:h-[130px] h-[205px] sm:w-[195px]  sm:max-w-[195px] md:w-full md:max-w-none"
                          : "2xl:h-[225px]  xl:h-[185px] lg:h-[175px] md:h-[130px] sm:h-[130px] xs:h-[230px] h-[205px] sm:w-[195px]  sm:max-w-[195px] md:w-full md:max-w-none"
                      }`}
                    >
                      <img
                        src={
                          item?.webp_banner_file_path || item?.webp_banner_file
                        }
                        width={720}
                        height={720}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="absolute top-2.5 group-hover:flex lg:scale-0 md:right-2.5 sm:-right-96 right-2.5 z-30 duration-700 transition flex-col flex sm:gap-2 md:gap-0 justify-center sm:shadow-sm md:shadow-none group-hover:scale-100">
                    <div
                      className={`block xs:p-2 p-1.5 md:!border-b md:border-solid md:rounded-none sm:rounded-md rounded-none bg-white sm:bg-theme-light md:bg-white sm:border-none border-b xs:text-base text-sm border-black ${
                        type === "collection" && item?.collectionId
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {item?.is_wishlist ? (
                        <FaHeart
                          color="#088178"
                          size={14}
                          onClick={() => {
                            projectFavourite(
                              item?._id,
                              item?.is_wishlist,
                              index
                            );
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          size={14}
                          onClick={() => {
                            projectFavourite(
                              item?._id,
                              item?.is_wishlist,
                              index
                            );
                          }}
                        />
                      )}
                    </div>
                    {collectionCreateId === loginUserId && (
                      <div
                        className={`block md:rounded-none  rounded-none xs:text-base text-sm bg-white sm:bg-theme-light md:bg-white xs:p-2 p-1.5 ${
                          type !== "collection" || !item.collectionId
                            ? "hidden"
                            : ""
                        }`}
                      >
                        <HiXMark
                          size={20}
                          onClick={() => {
                            projectRemoveFromCart(
                              item?._id,
                              item?.collectionId
                            );
                          }}
                        />
                      </div>
                    )}
                    <div
                      className={`block md:rounded-none sm:rounded-md rounded-none xs:text-base text-sm bg-white sm:bg-theme-light md:bg-white xs:p-2 p-1.5 ${
                        type === "collection" && item.collectionId
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {item?.is_bookmark ? (
                        <FaBookmark
                          color="#088178"
                          size={14}
                          onClick={() => {
                            addProjectCollection(item?._id);
                          }}
                        />
                      ) : (
                        <FaRegBookmark
                          size={14}
                          onClick={() => {
                            addProjectCollection(item?._id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`absolute -top-[58px] -right-[54px] w-28 h-28 lg:text-base text-sm rotate-[133deg] text-white bg-[#e06868] rounded-lg flex flex-col items-end justify-center p-1.5 text-bold !leading-none ${
                      item?.discount ? "" : "hidden"
                    }`}
                  >
                    <div className="rotate-[272deg]">
                      <p>{item?.discount}%</p>
                      <p>OFF</p>
                    </div>
                  </div>
                </div>
                <div className="md:flex sm:block flex justify-between py-2 px-0.5 gap-3 grow">
                  <div>
                    <Link href={`/project/project-details/${item?._id}`}>
                      <p className="max-w-xs xl:text-lg lg:text-base md:text-sm sm:text-base !mr-auto text-sm text-ellipsis line-clamp-1 font-bold">
                        {item?.projects?.project_name || item?.project_name}
                      </p>
                    </Link>
                    <p className="lg:text-sm md:text-xs sm:text-sm text-xs text-gray-400 line-clamp-1 text-ellipsis">
                      by &nbsp;
                      <Link
                        href={`/professional/profile/${item?.created_by?._id}`}
                      >
                        <span className="text-gray-900">
                          {item?.created_by?.name == ""
                            ? "Micra"
                            : item?.created_by?.name || item?.created_by}
                          &nbsp;
                        </span>
                      </Link>
                      in&nbsp;
                      <span className="text-gray-900">
                        {item?.category?.category_name || item?.category_name}
                        &nbsp;
                      </span>
                    </p>
                  </div>
                  <div>
                    {item?.price > 0 ? (
                      <>
                        <p className="inline-block sm:mt-3 md:mt-0 text-gray-900 font-bold xl:text-base lg:text-sm md:text-xs xs:text-sm text-xs bg-theme-light rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                          ${numberWithCommas(item?.price)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="inline-block sm:mt-3 md:mt-0 font-bold lg:text-sm md:text-xs xs:text-sm text-xs bg-theme/70 text-white rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                          FREE
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {type === "purchase" ? (
                  <>
                    <div className="flex items-center justify-between pb-2">
                      <Rating
                        name="half-rating-read"
                        precision={0.5}
                        value={(item?.rating && item?.rating?.rating) || 0}
                        readOnly
                      />
                      <a
                        className="xl:text-sm text-xs  text-theme font-bold tracking-wider"
                        onClick={() => {
                          editRatingReview(
                            item?._id,
                            item?.rating?.rating,
                            item?.rating?.review_message
                          );
                        }}
                      >
                        {item?.rating ? "Edit Rating" : "Add Rating"}
                      </a>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {type === "purchase" && (
                  <div>
                    <button
                      onClick={() => {
                        downloadZip(item?._id);
                      }}
                      className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                    >
                      {downloading && id === item?._id ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "Download"
                      )}
                    </button>
                    {/* <button
                        onClick={() => {
                          projectAddToCart(item?._id);
                        }}
                        className="lg:text-sm    sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        Add to cart
                      </button> */}
                  </div>
                )}
                {(type === "favourite" || type === "collection") && (
                  <div>
                    {item?.price === 0 ? (
                      <button
                        onClick={() => {
                          downloadZip(item?._id);
                        }}
                        className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        {downloading && id === item?._id ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          "Download"
                        )}
                      </button>
                    ) : loginUserId === item?.created_by?._id ? (
                      <button
                        onClick={() => {
                          downloadZip(item?._id);
                        }}
                        className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        {downloading && id === item?._id ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          "Download"
                        )}
                      </button>
                    ) : item?.is_purchased === true ? (
                      <button
                        onClick={() => {
                          downloadZip(item?._id);
                        }}
                        className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        {downloading && id === item?._id ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          "Download"
                        )}
                      </button>
                    ) : item?.price > 0 ? (
                      !item?.is_cart ? (
                        <button
                          onClick={() => {
                            projectAddToCart(item?._id);
                          }}
                          className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          disabled
                          className="lg:text-sm sm:text-xs text-sm text-dark-theme border-theme bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                        >
                          Added to cart
                        </button>
                        // <Link
                        //   href={`/cart`}
                        //   className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                        // >
                        //   View cart asdas
                        // </Link>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          downloadZip(item?._id);
                        }}
                        className="lg:text-sm sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        {downloading && id === item?._id ? (
                          <CircularProgress size={15} color="inherit" />
                        ) : (
                          "Download"
                        )}
                      </button>
                    )}
                    {/* <button
                        onClick={() => {
                          projectAddToCart(item?._id);
                        }}
                        className="lg:text-sm    sm:text-xs text-sm text-theme hover:text-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded-sm w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      >
                        Add to cart
                      </button> */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="sm:w-36 w-24 sm:h-36 h-24 mx-auto md:mt-5 mt-3">
            <img
              className="w-full h-full object-cover mx-auto"
              src="../../no-data.png"
              alt=""
            />
          </div>
          <p className="text-gray-900 font-bold lg:text-base sm:text-sm text-xs tracking-wide text-center py-3.5 whitespace-nowrap">
            It seems we can’t find any results based on your search.
          </p>
        </div>
      )}
      {open && (
        <CollectionMdl
          projectId={projectId}
          open={open}
          setOpen={setOpen}
          pageName={pageName}
          params={params}
        />
      )}
      <EditRatingMdl
        purchaseId={purchaseId}
        open={openrating}
        setOpen={setOpenRating}
        ratingstar={ratingstar}
        ratingMessage={ratingMessage}
      />
    </>
    //   )}
    // </>
  );
};

export default List;
