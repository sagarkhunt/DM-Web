import PurchaseList from "@/components/mypurchase/PurchaseList";
import List from "@/components/project/List";
import AppLayout from "@/layout";
import { listCateoryUserWiseRequest } from "@/store/category/actions";
import { moreProductRequest } from "@/store/mypurchase/action";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyPurchase = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  // const [categoryId, setCategoryId] = useState([]);
  // const [discount, setDiscount] = useState();
  // const [buttonHide, setButtonHide] = useState(false);
  // const [price, setPrice] = useState([0, 0]);
  const { moreProductList,
    collectionAddData, } = useSelector((store) => ({
      moreProductList: store?.mypurchase?.moreProductList,
      // collectionCreateData: store?.collection?.collectionCreateData,
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

  useEffect(() => {
    dispatch(
      moreProductRequest({
        params: {
          page: page,
          limit: 8,
          search: search,
          sortBy: sortBy,
        },
      })
    );
  }, [
    collectionAddData]);

  return (
    <AppLayout>
      <>
        <section className="sm:py-10 py-5">
          <div className="container 2xl:px-24 px-4 mx-auto">
            <h2 className="xl:text-3xl  sm:text-2xl text-xl font-bold tracking-wide text-gray-900 border-b pb-1">
              {" "}
              Purchases
            </h2>

            <PurchaseList
              page={page}
              limit={limit}
              search={search}
              onChange={handleSearch}
              sortBy={sortBy}
            // categoryId={categoryId}
            // price={price}
            />
          </div>
        </section>
        <section className="2xl:py-10 sm:py-0 py-5">
          <div className="container xl:px-24 px-4 mx-auto">
            <h2 className="2xl:text-3xl xs:text-2xl text-xl font-bold tracking-wide text-gray-900 text-center">
              More Products You'll Love
            </h2>
            <p className="2xl:text-lg xl:text-base xs:text-sm text-xs font-bold tracking-wide text-gray-900 text-center 2xl:pt-3.5 xs:pt-2.5 pt-2">
              Didn't find what you were looking for?
            </p>
            <p className="2xl:text-lg xl:text-base xs:text-sm text-xs font-bold tracking-wide text-gray-900 text-center ">
              Check out these popular products.
            </p>
            <List
              projectListData={moreProductList?.data?.results}
              col={4}
              type="list"
            ></List>
            <div className="w-full text-end">
              <Link
                href={`/project/list`}
                className="text-theme font-semibold text-end pt-1 inline border-b-2 transition-all border-transparent hover:border-theme"
              >
                More Product
              </Link>
            </div>
          </div>
        </section>
      </>
    </AppLayout>
  );
};

export default MyPurchase;
