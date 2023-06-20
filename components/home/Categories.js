import { listCateoryRequest } from "@/store/category/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../common/Loader";

const Categories = ({ type, catId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router?.query?.slug) {
      dispatch(
        listCateoryRequest({
          params: {
            category_id: router?.query?.slug?.join(","),
          },
        })
      );
    } else {
      dispatch(
        listCateoryRequest({
          params: { type: type },
        })
      );
    }
  }, []);

  /* Get responses of api call */
  const { categoryListData, isLoading } = useSelector((store) => ({
    isLoading: store?.category?.loading,
    categoryListData: store?.category?.categoryListData,
  }));

  const goToCategory = (categoryId) => {
    router.push(`/project/list/${categoryId}`);
  };

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
      {categoryListData?.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {(categoryListData || []).map((item, i) => {
            return (
              <SwiperSlide key={item?.id}>
                <div
                  onClick={() => {
                    goToCategory(item?.id);
                  }}
                  className="2xl:p-4 xl:p-3 p-2 bg-gray-200 hover:bg-[#e5e7eb] cursor-pointer transition-all duration-700 rounded-md shadow-sm"
                >
                  <div className="xl:h-[160px] lg:h-[125px] md:h-[145px] sm:h-[165px] xs:h-[105px] h-[115px]">
                    <img
                      src={item?.category_image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="2xl:text-base text-sm text-gray-900 text-center font-bold block pt-3">
                    {item?.category_name}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        ""
      )}
    </>
  );
};

export default Categories;
