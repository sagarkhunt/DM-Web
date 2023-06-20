import { Pagination } from "@mui/material";
import React from "react";

const Following = ({ page, setPage, followersListData }) => {
  return (
    <div>
      {followersListData?.results?.length > 0 ? (
        <div>
          <div className="xl:space-y-4 space-y-2.5 lg:max-h-[550px] max-h-[400px] overflow-hidden">
            {followersListData?.results?.map((item, index) => {
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-1">
                    <div className="xl:w-14 sm:w-12 w-10 xl:h-14 sm:h-12 h-10 overflow-hidden rounded-full">
                      <img src={item?.profile_image} alt="" />
                    </div>
                    <div>
                      <p className="underline decoration-2 text-gray-900 font-semibold tracking-wide xl:text-base sm:text-sm text-xs">
                        {item?.name}
                      </p>
                      <p className="inline-block xl:text-base sm:text-sm text-xs text-gray-600">
                        {item?.followers} Followers
                      </p>
                      <p className="inline-block xl:text-base sm:text-sm text-xs text-gray-600 sm:ml-2 ml-1">
                        {item?.following} Following
                      </p>
                    </div>
                  </div>
                  {/* <div>
            <button className="py-1.5 xl:text-sm text-xs rounded text-slate-400 font-bold tracking-wider xl:px-4 px-3 bg-[#e2e9ee]">
              Follow
            </button>
          </div> */}
                </div>
              );
            })}
          </div>
          <div className="pagination flex sm:gap-2.5 gap-1.5 items-centr justify-center pt-6">
            {followersListData?.totalPages >= 10 ? (
              <Pagination
                count={followersListData?.totalPages}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
                shape="rounded"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-theme">Not Yet</div>
      )}
    </div>
  );
};

export default Following;
