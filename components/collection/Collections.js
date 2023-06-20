import Link from "next/link";
import React from "react";
import Loader from "../common/Loader";
const Collections = ({ collectionListData, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {collectionListData?.length ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-4 2xl:gap-5 xl:gap-4 md:gap-3 xs:gap-2 gap-3 xl:pt-8 pt-5">
              {collectionListData?.map((item, index) => {
                return (
                  <div
                    className="group border rounded-sm cursor-pointer"
                    key={index}
                  >
                    <div className="w-full 2xl:h-[215px] xl:h-[180px] md:h-[155px] xs:h-[135px] h-[145px] border rounded-sm overflow-hidden">
                      <Link href={`/collection/${item?._id}`}>
                        {/* <img
                        src={
                          item?.projectList[0]?.webp_banner_file || "../../assets/images/nocollection.png"
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      /> */}
                        <img
                          src={
                            item?.projectList[0]?.webp_banner_file ||
                            "../../assets/images/nocollection.png"
                          }
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2  gap-0.5  py-1">
                      <div className="w-full 2xl:h-[100px] xl:h-[80px] md:h-[70px] xs:h-[60px] h-[70px] border rounded-sm overflow-hidden">
                        <Link href={`/collection/${item?._id}`}>
                          <img
                            src={
                              item?.projectList[1]?.webp_banner_file ||
                              item?.projectList[0]?.webp_banner_file ||
                              "../../assets/images/nocollection.png"
                            }
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="w-full 2xl:h-[100px] xl:h-[80px] md:h-[70px] xs:h-[60px] h-[70px] border rounded-sm overflow-hidden">
                        <Link href={`/collection/${item?._id}`}>
                          <img
                            src={
                              item?.projectList[2]?.webp_banner_file ||
                              item?.projectList[0]?.webp_banner_file ||
                              "../../assets/images/nocollection.png"
                            }
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 xs:grid-cols-3  grid-cols-4 items-center gap-1">
                      <div className="md:px-3 xs:px-2 px-2.5 md:py-2 xs:py-1 py-1.5 md:col-span-3 xs:col-span-2 col-span-3">
                        <Link
                          href={`/collection/${item?._id}`}
                          className="text-gray-900 2xl:text-lg md:text-base text-sm min-w-full !leading-none  line-clamp-1 !mx-auto  text-ellipsis"
                        >
                          {item?.collection_name}
                        </Link>
                        <p
                          className={`text-slate-400 xl:text-sm lg:text-xs xs:text-[10px]  text-xs ${
                            item?.created_by ? "" : "hidden"
                          }`}
                        >
                          By&nbsp;
                          <span className="text-gray-900">
                            {item?.created_by?.name}
                          </span>
                        </p>
                      </div>
                      <div className="2xl:text-sm  text-xs text-center border-l lg:px-3 xs:px-2 px-3 md:py-2 xs:py-1 py-1.5">
                        <p className="font-semibold text-gray-900 !leading-none">
                          {item?.total_product}
                        </p>
                        <p className="text-slate-400 !leading-none">Goods</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="sm:w-36 w-24 sm:h-36 h-24 mx-auto md:mt-5 mt-3">
                <img
                  className="w-full h-full object-cover mx-auto"
                  src="../no-data.png"
                  alt=""
                />
              </div>
              <p className="text-gray-900 font-bold lg:text-base sm:text-sm text-xs tracking-wide text-center py-3.5 whitespace-nowrap">
                It seems we can’t find any results based on your search.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Collections;
