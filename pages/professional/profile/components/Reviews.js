import { shopeOwnerReviewListRequest } from "@/store/professionalprofile/actions";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { weekDayFormate } from "@/utils/dateMixin";
import Link from "next/link";

const Reviews = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);

  const { isLoading, shopeOnerReviewListdRecord } = useSelector((store) => ({
    isLoading: store?.professionalprofile?.loading,
    shopeOnerReviewListdRecord:
      store?.professionalprofile?.shopeOnerReviewListdData,
  }));
  useEffect(() => {
    const body = {
      page: page,
      search: search,
      limit: limit,
    };
    if (router?.query?._id) {
      dispatch(
        shopeOwnerReviewListRequest({
          body,
          id: router?.query?._id,
        })
      );
    }
  }, [router?.query?._id, search, page]);
  return (
    <>
      {/* <div className="sm:w-96 w-24 sm:h-36 h-24 mx-auto md:mt-5 mt-3">
        <img
          className="w-full h-full object-cover mx-auto"
          src="/assets/images/collections.png"
          alt=""
        />
        <p className="text-gray-900 font-bold lg:text-base sm:text-sm text-xs text-center w-full">
          No review found
        </p>
      </div> */}
      {shopeOnerReviewListdRecord?.results?.length > 0 ? (
        <>
          {shopeOnerReviewListdRecord?.results?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap items-start lg:gap-7 md:gap-5 gap-2"
              >
                <div className="group">
                  <Link href={`/project/project-details/${item?.project?._id}`}>
                    <div className="xl:w-80 lg:w-64 md:w-56 w-full xl:max-w-[320px] lg:max-w-[256px] md:max-w-[224px] rounded-sm overflow-hidden">
                      <img
                        className="w-full h-full"
                        src={item?.project?.webp_banner_file_path}
                        alt=""
                      />
                    </div>
                    <p className="font-bold tracking-wide xl:text-base text-sm text-gray-900 transition-all group-hover:text-theme pt-1">
                      {item?.project?.project_name}
                    </p>
                  </Link>
                </div>
                <div className="py-1">
                  <div className="flex lg:gap-5 gap-3.5">
                    <div className="xl:w-12 w-10 xl:h-12 h-10 rounded-full overflow-hidden">
                      <img
                        src={item?.user?.profile_image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 underline xl:text-base text-sm font-bold tracking-wider">
                        {item?.user?.name}
                      </p>
                      <div className="flex items-center gap-1 text-gray-900 text-sm pt-1">
                        {item?.rating && (
                          <ReactStars
                            count={5}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                            value={item?.rating}
                            isHalf={true}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-gray-800 xl:text-base lg:text-sm text-xs">
                      {weekDayFormate(item?.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-900 xl:text-base xs:text-sm text-xs py-3">
                    {item?.review_message}
                  </p>
                  {/* <div className="flex items-center lg:gap-2 gap-1.5 xl:py-2 py-1 flex-wrap whitespace-nowrap">
                    <a className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
                      12 days of christmas
                    </a>
                    <a className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
                      12 days of christmas
                    </a>
                    <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
                      12 days of christmas
                    </button>
                    <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
                      12 days of christmas
                    </button>
                    <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
                      12 days of christmas
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
          {shopeOnerReviewListdRecord?.totalPages > 10 && (
            <div className="pagination flex sm:gap-2.5 gap-1.5 items-centr justify-center my-2">
              <Pagination
                count={shopeOnerReviewListdRecord?.totalPages}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
                shape="rounded"
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-lg text-theme font-semibold tracking-wider">No reviews found</div>
      )}

      {/* <div className="flex flex-wrap md:flex-nowrap items-start lg:gap-7 md:gap-5 gap-2">
        <div className="group">
          <div className="xl:w-80 lg:w-64 md:w-56 w-full xl:max-w-[320px] lg:max-w-[256px] md:max-w-[224px] rounded-sm overflow-hidden">
            <img
              className="w-full h-full"
              src="../assets/images/font2.webp"
              alt=""
            />
          </div>
          <p className="font-bold tracking-wide xl:text-base text-sm text-gray-900 transition-all group-hover:text-theme pt-1">
            1250 Ransom Note Letters
          </p>
        </div>
        <div className="py-1">
          <div className="flex lg:gap-5 gap-3.5">
            <div className="xl:w-12 w-10 xl:h-12 h-10 rounded-full overflow-hidden">
              <img
                src="../assets/images/review2.png"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div>
              <p className="text-gray-800 underline xl:text-base text-sm font-bold tracking-wider">
                Oscar Sanchez
              </p>
              <div className="flex items-center gap-1 text-gray-900 text-sm pt-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
            <p className="text-gray-800 xl:text-base lg:text-sm text-xs">
              4 week ago
            </p>
          </div>
          <p className="text-gray-900 xl:text-base xs:text-sm text-xs py-3">
            This is a great source for collage type edits! There is a lot of
            variation and they keep on updating it! Highly recommend
          </p>
          <div className="flex items-center lg:gap-2 gap-1.5 xl:py-2 py-1 flex-wrap whitespace-nowrap">
            <a className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
              12 days of christmas
            </a>
            <a className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
              12 days of christmas
            </a>
            <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
              12 days of christmas
            </button>
            <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
              12 days of christmas
            </button>
            <button className="lg:py-2 py-1.5 lg:px-4 px-3 lg:text-sm text-xs rounded-full bg-yellow-300 transition-all hover:bg-yellow-500">
              12 days of christmas
            </button>
          </div>
        </div>
      </div> */}
      {/* <!-- Pagination --> */}
    </>
  );
};

export default Reviews;
