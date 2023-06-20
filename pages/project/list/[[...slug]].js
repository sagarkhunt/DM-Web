import Accordion from "@/components/common/Accordion";
import Categories from "@/components/home/Categories";
import List from "@/components/project/List";
import AppLayout from "@/layout";
import { detailsCateoryRequest } from "@/store/category/actions";
import { dropdownValueSearch, listProjectRequest, valueSearch } from "@/store/project/actions";
import { FormControl, Pagination, Slider, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
import { filterArray } from "@/utils/sortBy";
import Loader from "@/components/common/Loader";
import { HiXMark } from "react-icons/hi2";

const list = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);
  const [discount, setDiscount] = useState();
  const [buttonHide, setButtonHide] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [isActive, setIsActive] = useState("categories");
  const divRef = useRef(null);

  useEffect(() => {
    if (router?.query?.search) {
      setSearch(router?.query?.search);
    }
    else{
      setSearch("")
    }
    if (router?.query?.slug) {
      setCategoryId(router?.query?.slug);
      dispatch(detailsCateoryRequest({ categoryId: router?.query?.slug }));
    }
  }, [router?.query?.search, router?.query?.slug]);

  /* reset paging on filter */
  useEffect(() => {
    setPage(1);
  }, [categoryId, discount]);

  useEffect(() => {
    if (
      categoryId?.length > 0 ||
      price[0] != 0 ||
      price[1] != 0 ||
      typeof discount != "undefined" || router?.query?.search

    ) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
  }, [categoryId, price, discount, router?.query?.search]);

  /* sort by  */
  // useEffect(()=>{
  //   const array = sortBy?.map((sort, index)=>{
  //         return{
  //           label:sort?.label,
  //           value:sort?.value
  //         };
  //   });
  //   setSortBy(array);
  // },[sortBy]);

  /* Get responses of api call */
  const {
    isLoading,
    categoryDetailsData,
    projectListData,
    categoryProjectListData,
    projectFavData,
    collectionCreateData,
    collectionAddData,
  } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    categoryDetailsData: store?.category?.categoryDetailsData,
    projectListData: store?.project?.projectListData,
    categoryProjectListData: store?.category?.categoryProjectListData,
    projectFavData: store?.project?.projectFavData,
    collectionCreateData: store?.collection?.collectionCreateData,
    collectionAddData: store?.collection?.collectionAddData,
  }));

  /* Project list api */
  useEffect(() => {
    dispatch(
      listProjectRequest({
        params: {
          page: page,
          search: search,
          limit: limit,
          categoryId: JSON.stringify(categoryId),
          discount: discount,
          sortBy: sortBy,
          price: price[1] > 0 ? price.join("-") : "",
        },
      })
    );
  }, [
    categoryId,
    discount,
    sortBy,
    page,
    search,
    limit,
    price,
    projectFavData?.message,
    collectionCreateData,
    collectionAddData
  ]);

  /* set category filter */
  const setFilterCategoryId = (e) => {
    if (e.target.checked) {
      if (!categoryId.includes(e?.target?.value)) {
        setCategoryId([...categoryId, e.target.value]);
      }
    } else {
      setCategoryId(categoryId.filter((person) => person !== e?.target?.value));
    }
  };
  /* clear state on clear filter */
  const clearFilter = () => {
    setPage(1);
    setCategoryId([]);
    setPrice([0, 0]);
    setSearch("");
    setDiscount();
    setToggleFilter(false);
    setButtonHide(false);
    dispatch(valueSearch(""));
    dispatch(dropdownValueSearch({ value: '', label: 'All Items' }));

    router.push("/project/list");
  };

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const valuetext = (value) => {
    return `${value}°C`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setToggleFilter(false);

      }
    };
    // window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("click", handleClickOutside);

    return () => {
      // window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [divRef]);



  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        <section className="py-12">
          <div className="container 2xl:px-24 px-4 mx-auto">
            {categoryDetailsData ? (
              <>
                <h2 className="text-center text-gray-900 font-semibold tracking-wide lg:text-3xl text-2xl">
                  {categoryDetailsData?.category_name}
                </h2>
                <p className="lg:text-sm text-xs text-gray-900 max-w-4xl mx-auto text-center lg:py-4 py-2.5">
                  {categoryDetailsData?.description}
                </p>
              </>
            ) : (
              ""
            )}
            <div className="w-full h-24 xl:mt-5 mb-2">
              <img
                src="../../assets/images/sale.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <Categories type={"trending"} />
          </div>
        </section>
        <section className="pb-28 md:pt-3">
          <div className="container relative 2xl:px-24 px-4 mx-auto">
            <p className="text-sm font-semibold tracking-wider xl:pb-3 sm:pb-2">
              Total Project : {projectListData?.totalResults} Projects
            </p>
            <div className="flex items-center sort_by justify-between xl:py-6 py-4 xs:px-4">
              <div className="relative sm:p-1 md:p-0 " ref={divRef}>
                <button
                  className="md:px-6 xs:px-5 px-3.5 md:py-2.5 xs:py-2 py-1.5 hover:bg-theme-light transition-all xs:text-sm text-xs text-theme border-2 font-semibold rounded tracking-wider border-theme"
                  onClick={() => {
                    setToggleFilter(!toggleFilter);
                  }}
                >
                  Filter
                </button>
                {buttonHide ? (
                  <button
                    className="xs:ml-2 ml-1 md:px-6 xs:px-5 px-3.5 md:py-2.5 xs:py-2 py-1.5 hover:bg-theme-light transition-all xs:text-sm text-xs text-theme border-2 font-semibold rounded tracking-wider border-theme"
                    id="filter"
                    onClick={() => {
                      clearFilter(!toggleFilter);
                    }}
                  >
                    Clear
                  </button>
                ) : (
                  ""
                )}

                <div
                  className={`absolute shadow rounded top-full z-[90] left-0 w-64 ${toggleFilter ? "" : "hidden"
                    }`}
                >
                  <div className="!w-full container mx-auto whitespace-nowrap bg-white">
                    <Accordion
                      isActive={isActive}
                      setIsActive={setIsActive}
                      key="categories"
                      name="categories"
                      title="Categories"
                      content={
                        <ul className="xl:space-y-2  space-1 lg:text-base text-sm text-gray-900">
                          {categoryProjectListData?.map((cat, i) => {
                            return (
                              <li key={i}>
                                <label className="flex items-start gap-2 checkbox">
                                  <input
                                    type="checkbox"
                                    className="appearance-none"
                                    name="categoryId"
                                    value={cat?._id}
                                    onChange={setFilterCategoryId}
                                    checked={
                                      categoryId && categoryId.includes(cat?._id)
                                    }
                                    id="category"
                                  />
                                  <span className="checkmark"></span>
                                  {cat?.category_name}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      }
                    />
                    <Accordion
                      isActive={isActive}
                      setIsActive={setIsActive}
                      key="price_range"
                      name="price_range"
                      title="Price Range"
                      content={
                        <ul className=" lg:text-base text-sm text-gray-900">
                          <div className="flex items-center justify-between">
                            <p>{projectListData?.priceMin}</p>
                            <p>{projectListData?.priceMax}</p>
                          </div>
                          <Slider
                            getAriaLabel={() => "Price range"}
                            min={projectListData?.priceMin}
                            max={projectListData?.priceMax}
                            value={price}
                            onChange={handlePrice}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                          />
                        </ul>
                      }
                    />
                    <Accordion
                      isActive={isActive}
                      setIsActive={setIsActive}
                      key="discount_range"
                      name="discount_range"
                      title="Discount Range"
                      content={
                        <ul className="xl:space-y-2 space-y-1 lg:text-base text-sm text-gray-900">
                          <li>
                            <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-1.5">
                              <input
                                type="radio"
                                className="appearance-none"
                                name="discount"
                                onChange={() => {
                                  setDiscount("1-20");
                                }}
                                value="1-20"
                              />
                              <span className="radiocheckmark"></span>
                              <div className="text-gray-900 text-sm  gap-2 2xl:pl-6 pl-4 flex items-center justify-between w-full">
                                <p className="font-semibold">1-20 % </p>
                              </div>
                            </label>
                          </li>
                          <li>
                            <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-1.5">
                              <input
                                type="radio"
                                className="appearance-none"
                                name="discount"
                                onChange={() => {
                                  setDiscount("20-40");
                                }}
                                value="20-40"
                              />
                              <span className="radiocheckmark"></span>
                              <div className="text-gray-900 text-sm  gap-2 2xl:pl-6 pl-4 flex items-center justify-between w-full">
                                <p className="font-semibold">20-40 % </p>
                              </div>
                            </label>
                          </li>
                          <li>
                            <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-1.5">
                              <input
                                type="radio"
                                className="appearance-none"
                                name="discount"
                                onChange={() => {
                                  setDiscount("40-60");
                                }}
                                value="40-60"
                              />
                              <span className="radiocheckmark"></span>
                              <div className="text-gray-900 text-sm  gap-2 2xl:pl-6 pl-4 flex items-center justify-between w-full">
                                <p className="font-semibold">40-60 % </p>
                              </div>
                            </label>
                          </li>
                          <li>
                            <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-1.5">
                              <input
                                type="radio"
                                className="appearance-none"
                                name="discount"
                                onChange={() => {
                                  setDiscount("60-80");
                                }}
                                value="60-80"
                              />
                              <span className="radiocheckmark"></span>
                              <div className="text-gray-900 text-sm  gap-2 2xl:pl-6 pl-4 flex items-center justify-between w-full">
                                <p className="font-semibold">60-80 % </p>
                              </div>
                            </label>
                          </li>
                          <li>
                            <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-1.5">
                              <input
                                type="radio"
                                className="appearance-none"
                                name="discount"
                                onChange={() => {
                                  setDiscount("80-100");
                                }}
                                value="80-100"
                              />
                              <span className="radiocheckmark"></span>
                              <div className="text-gray-900 text-sm  gap-2 2xl:pl-6 pl-4 flex items-center justify-between w-full">
                                <p className="font-semibold">80-100 % </p>
                              </div>
                            </label>
                          </li>
                        </ul>
                      }
                    />
                  </div>
                </div>
              </div>
              {/* <Select
                styles={{
                  control: (base, state) => ({
                    ...base,
                    boxShadow: "none",
                    borderColor: "#fff",
                    backgroundColor: "transparent",
                    "&:hover": {
                      borderColor: "transparent",
                    },
                  }),
                }}
                instanceId={useId()}
                autoFocus={false}
                className="border xs:w-40 w-32 sortby border-black/70 z-50 px-2 rounded text-sm text-gray-900 bg-white"
                // value={sortBy || "all"}
                label="Sort By"
                placeholder="Sort By"
                options={filterArray}
                onChange={(e) => {
                  setSortBy(e?.value);
                }}
              ></Select> */}
              <FormControl className="xs:w-40 w-32 z-30">
                {/* <HiXMark
                  className={`${
                    sortBy == "" ? "hidden " : "block"
                  } cursor-pointer absolute top-1/2 -translate-y-1/2 z-40 right-9`}
                  onClick={() => {
                    setSortBy("createdAt:desc");
                  }}
                /> */}
                <Select
                  className="border h-10 xs:w-40 w-32 sortby border-black/70 z-30 px-2 rounded text-sm text-gray-900 bg-white"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="SortBy"
                  displayEmpty
                
                  onChange={(e) => {
                    setSortBy(e?.target?.value);
                  }}
                >
                  <MenuItem disabled value="" className="hidden">
                    Select sortBy
                  </MenuItem>
                  {filterArray?.map((size, index) => {
                    return (
                      <MenuItem
                        className="text-sm text-gray-800"
                        value={size?.value}
                        key={index}
                      >
                        {size?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <List
              projectListData={projectListData?.results}
              col={4}
              type="list"
            // isLoading={isLoading}
            />
            {!isLoading && projectListData?.totalPages > 1 && (
              <div className="pagination flex sm:gap-2.5 gap-1.5 items-centr justify-center my-2">
                <Pagination
                  count={projectListData?.totalPages}
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
