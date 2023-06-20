import { reviewsListRequest } from "@/store/project/actions";
import { weekDayFormate } from "@/utils/dateMixin";
import { ratingReviewSorting } from "@/utils/ratingReviewsorting";
import { FormControl, MenuItem, Rating, Select } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { HiXMark } from "react-icons/hi2";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

const Reviews = ({ projectId }) => {
  let [reviewsorting, setReviewSorting] = useState("");
  const [showMore, setShowMore] = useState(3);
  const [rating, setRating] = useState([]);
  const dispatch = useDispatch();
   

  const toggleReadMore=(prev)=>{
    
      setShowMore(prev => prev < reviewsListData?.results?.length ? prev + 3 : 3)

      // setShowMore(prev => prev < reviewsListData?.results?.length ? (prev + 3 ): (prev -3 ? (showMore > 3 ? (prev-3) : (2)): 3) )
      
  }

  //progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: [theme.palette.mode === "light" ? "#fee4c3" : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#fcc875" : "#fcc875",
    },
  }));

  const { reviewsListData, projectDetailsData } = useSelector((store) => ({
    reviewsListData: store?.project?.reviewsListData,
    projectDetailsData: store?.project?.projectDetailsData,
  }));

  useEffect(() => {
    const data = {
      sortBy: reviewsorting ?? "",
    };

    if (typeof projectId !== "undefined") {
      dispatch(
        reviewsListRequest({
          data,
          projectId,
          
        })
      );
    }
  }, [projectId, reviewsorting]);

  useEffect(() => {
    if (reviewsListData?.results?.length > 0) {
      const data = reviewsListData?.results?.map((item, index) => item?.rating);
      setRating(data);
    }
  }, [reviewsListData]);

  return (
    <>
      <div className="content" id="reviews">
        {reviewsListData?.results?.length > 0 ? (
          <>
            <div className="border rounded xl:p-8 xs:p-6 p-3">
              <div className="flex items-center xs:gap-4  border-b xl:pb-5 pb-3.5">
                <h2 className="xl:text-2xl xs:text-xl text-base text-gray-900 font-bold tracking-wider">
                  {projectDetailsData?.total_review}&nbsp;Reviews
                </h2>
                <div className="flex items-center  xl:gap-3 gap-1 text-yellow-500 2xl:text-4xl xl:text-3xl xs:text-xl text-lg">
                  {/* <ReactStars
                size={40}
                activeColor="#fcc875"
                isHalf={true}
                isAggregateRating={true}
                value={projectDetailsData?.total_avg_rating}
                edit={false}
              /> */}
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={projectDetailsData?.total_avg_rating || 0}
                    readOnly
                    size="large"
                  />
                </div>
              </div>
              <div className="sm:grid grid-cols-2 gap-5 pt-6">
                {/* <div className="xl:space-y-4 space-y-3">
              <p className="xl:text-xl md:text-lg xs:text-base text-sm font-bold tracking-wider text-gray-900">
                What People Liked The Most
              </p>
              <div className="grid grid-cols-2 xl:text-base xs:text-sm text-xs text-gray-900">
                <div>
                  <p>Unique Style</p>
                </div>
                <div>
                  <p>Accurately</p>
                  <p>Described</p>
                </div>
              </div>
              <div className="grid grid-cols-2 xl:text-base text-sm text-gray-900">
                <div>
                  <p>High Resolution</p>
                </div>
                <div>
                  <p>Organized Files</p>
                </div>
              </div>
            </div> */}
                <div className="space-y-1 mt-3 sm:mt-0">
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-gray-900">5</p>
                    <div className="xl:h-3.5 h-3 w-full rounded z-10  overflow-hidden">
                      <BorderLinearProgress
                        className="h-full rounded-none"
                        variant="determinate"
                        value={parseInt(
                          reviewsListData?.ratingPercentage?.five
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-gray-900">4</p>
                    <div className="xl:h-3.5 h-3 w-full rounded z-10  overflow-hidden">
                      <BorderLinearProgress
                        className="h-full rounded-none"
                        variant="determinate"
                        value={parseInt(
                          reviewsListData?.ratingPercentage?.four
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-gray-900">3</p>
                    <div className="xl:h-3.5 h-3 w-full rounded z-10  overflow-hidden">
                      <BorderLinearProgress
                        className="h-full rounded-none"
                        variant="determinate"
                        value={parseInt(
                          reviewsListData?.ratingPercentage?.three
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-gray-900">2</p>
                    <div className="xl:h-3.5 h-3 w-full rounded z-10  overflow-hidden">
                      <BorderLinearProgress
                        className="h-full rounded-none"
                        variant="determinate"
                        value={parseInt(reviewsListData?.ratingPercentage?.two)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-gray-900">1</p>
                    <div className="xl:h-3.5 h-3 w-full rounded z-10  overflow-hidden">
                      <BorderLinearProgress
                        className="h-full rounded-none"
                        variant="determinate"
                        value={parseInt(reviewsListData?.ratingPercentage?.one)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <FormControl fullWidth className="relative">
          <Select
            label="ratingReviewSorting"
            onChange={(e) => {
              setReviewSorting(e?.target?.value);
            }}
            className="border w-40   xl:text-base text-sm border-gray-800/50 my-6 px-4  rounded-sm bg-transparent focus:outline-none"
          >
            {ratingReviewSorting?.map((sort, index) => {
              return (
                <MenuItem value={sort?.value} key={index}>
                  {sort?.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
            <FormControl fullWidth className="relative w-40">
              {/* <InputLabel id="demo-simple-select-label">Company Size</InputLabel> */}
              {/* <HiXMark
                onClick={() => {
                  setReviewSorting((reviewsorting = ""));
                }}
                className={`${
                  reviewsorting == "" ? "hidden " : "block"
                } cursor-pointer absolute top-1/2 -translate-y-1/2 z-40 right-9`}
              /> */}
              <Select
                className="border w-40   xl:text-base text-sm border-gray-800/50 my-6 px-2  rounded bg-transparent focus:outline-none"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reviewsorting}
                displayEmpty
                label="ratingReviewSorting"
                onChange={(e) => {
                  setReviewSorting(e?.target?.value);
                }}
              >
                <MenuItem value="" className="hidden" disabled>
                  Sort by
                </MenuItem>
                {ratingReviewSorting?.map((sort, index) => {
                  return (
                    <MenuItem
                      className="text-sm text-gray-800"
                      value={sort?.value}
                      key={index}
                    >
                      {sort?.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <div>
              {reviewsListData?.results
                ?.slice(0, showMore)
                ?.map((reviewList, index) => {
                  return (
                    <div key={index} className="xl:pt-10 pt-6">
                      <div className="flex  lg:gap-5 gap-3.5 ">
                        <div className="xl:w-12 w-10 xl:h-12 h-10">
                          <img
                            src={reviewList?.user?.profile_image}
                            width={720}
                            height={720}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-gray-900 xl:text-base text-sm font-bold tracking-wider">
                            {reviewList?.user?.name}
                          </p>
                          <div className="flex items-center gap-0.5 text-yellow-500 text-sm ">
                            {/* {rating?.length && (
                            <ReactStars
                              edit={false}
                              size={20}
                              activeColor="#fcc875"
                              isHalf={true}
                              // isAggregateRating={true}
                              value={rating[index]}
                            />
                          )} */}
                            <Rating
                              name="half-rating-read"
                              precision={0.5}
                              value={reviewList?.rating}
                              readOnly
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="flex  xl:gap-4 md:gap-3 gap-2">
                          <div className="bg-[#949291] w-0.5 mt-2 h-0.5 rounded-full"></div>
                          <p className="text-gray-800 xl:text-sm text-xs font-semibold tracking-wider">
                            {/* {date.toLocaleDateString(reviewList?.createdAt)}   */}
                            {weekDayFormate(reviewList?.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-900 xl:pt-1 pt-2 xl:text-base text-sm">
                        {reviewList?.review_message}
                      </p>
                    </div>
                  );
                })}
              {reviewsListData?.results?.length > 4 ? (
                <a
                  onClick={() => {
                    toggleReadMore();
                  }}
                  className="text-theme pt-5 cursor-pointer block font-bold tracking-wide hover:text-dark-theme transition-all "
                >
                  Show&nbsp;
                  {showMore < reviewsListData?.results?.length
                    ? "More"
                    : "Less"}
                </a>
              ) : (
                " "
              )}
              {/* {showMore < 3 ? null : (
                <a
                  onClick={() => {
                    toggleReadMore();
                  }}
                  className="text-theme pt-5 cursor-pointer block font-bold tracking-wide hover:text-dark-theme transition-all "
                >
                  Show&nbsp;
                  {showMore < reviewsListData?.results?.length
                    ? "More"
                    : "Less"}
                </a>
              )} */}
            </div>
          </>
        ) : (
          <p className="text-theme text-center font-semibold py-5">
            No Review Yet
          </p>
        )}
      </div>
    </>
  );
};

export default Reviews;
