import Collections from "@/components/collection/Collections";
import Loader from "@/components/common/Loader";
import AppLayout from "@/layout";
import { getCollectionRequest } from "@/store/collection/actions";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const list = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  /* Get responses of api call */
  const { getCollectionData, isLoading } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    userData: store?.auth?.verifyTokenData,
    getCollectionData: store?.collection?.getCollectionData,
  }));

  /* collection list api */
  useEffect(() => {
    dispatch(
      getCollectionRequest({
        params: {
          page: page,
          limit: limit,
        },
      })
    );
  }, [page, limit]);
  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        <section className="md:py-8 sm:py-6 py-4">
          <div className="container xl:px-24 px-4 mx-auto">
            <div className="border-b  xl:py-1 flex items-end gap-3">
              <h2 className="text-gray-900 xl:text-3xl sm:text-2xl text-xl">
                Collections
              </h2>
              <button className="text-theme hover:text-dark-theme xl:text-lg sm:text-base text-sm px-3 ">
                Recent
              </button>
            </div>
            <Collections
              collectionListData={getCollectionData?.results}
              isLoading={isLoading}
            />
            {getCollectionData?.totalPages > 1 && (
              <div className="pagination flex sm:gap-2.5 gap-1.5 items-centr justify-center my-2">
                <Pagination
                  count={getCollectionData?.totalPages}
                  page={page}
                  onChange={(e, value) => {
                    setPage(value);
                  }}
                  shape="rounded"
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default list;
