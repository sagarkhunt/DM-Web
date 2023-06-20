import NodataFound from "@/components/common/NodataFound";
import Categories from "@/components/home/Categories";
import List from "@/components/project/List";
import AppLayout from "@/layout";
import { getProjectListRequest } from "@/store/homepage/actions";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pageName = 'Home'
  const [filterCat, setFilterCat] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  /* Get responses of api call */
  const {
    isLoading,
    categoryProjectList,
    categoryProjectListData,
  } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    categoryProjectList: store?.homepage?.projectListData,
    categoryProjectListData: store?.category?.categoryProjectListData,
  }));

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilterSearch(e?.target?.value);
    }
  };

  useEffect(() => {
    if (filterCat || filterSearch) {
      router.push(
        `/project/list/${filterCat}${
          filterSearch ? "?search=" + filterSearch : ""
        }`
      );
    }
  }, [filterCat, filterSearch]);
  /**
   * use effect for project list
   */
  useEffect(() => {
    dispatch(getProjectListRequest());
  }, []);

  useEffect(() => {
    const array = categoryProjectListData?.map((cat, index) => {
      return {
        value: cat?.id,
        label: cat?.category_name,
      };
    });
    setCategoryOptions(array);
  }, [categoryProjectListData]);

  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        <section className="lg:py-15 sm:py-9 pt-10">
          <div className="container mx-auto px-4">
            <h1 className="font-extrabold 2xl:text-8xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl text-center 2xl:max-w-4xl xl:max-w-2xl lg:max-w-lg md:max-w-sm max-w-xs mx-auto text-gray-900 !leading-tight">
              Bring your creative ideas to life.
            </h1>
            <div className="lg:max-w-2xl max-w-lg mx-auto 2xl:py-4 py-3 ">
              <div className="flex items-center  bg-gray-300 border border-transparent hover:border-gray-400 transition-all px-5 rounded-lg">
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    onKeyDown={handleSearch}
                    className="block 2xl:p-5 xl:py-4 md:py-3 py-2.5 px-5 pl-4 w-full z-20 text-sm focus:outline-none text-gray-900 bg-transparent"
                    placeholder="Search millions of photos, fonts, graphics, and more..."
                    required
                  />
                  <FaSearch className="absolute text-sm top-1/2 -left-1.5 !text-gray-400 -translate-y-1/2" />
                  {/* <i className="fa-solid fa-magnifying-glass absolute text-sm top-1/2 -left-1.5 !text-gray-400 -translate-y-1/2"></i> */}
                </div>
                <div className="flex-shrink-0 cursor-pointer text-sm font-bold text-gray-800 relative dropdown">
                  <Select
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        boxShadow: "none",
                        borderColor: "transparent",
                        backgroundColor: "transparent",
                        "&:hover": {
                          borderColor: "transparent",
                        },
                      }),
                    }}
                    instanceId={useId()}
                    autoFocus={false}
                    className="border-l-2 z-50 cursor-pointer pl-4 text-sm text-gray-800 bg-transparent"
                    // value={filterCat || "all"}
                    label="All Items"
                    placeholder="All Items"
                    options={categoryOptions}
                    onChange={(e) => {
                      setFilterCat(e?.value);
                    }}
                  ></Select>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-wrap  justify-center items-center lg:gap-4 sm:gap-2.5 gap-2">
            {categoryListData?.map((cat, index) => {
              return (
                <button
                  onClick={() => {
                    setFilterCat(cat?.id);
                  }}
                  key={cat?.id}
                  className="xl:px-5 px-4 xl:py-3.5 md:py-2.5 py-2 icon-header border hover:border-black transition-all ease-in-out duration-700 md:rounded-2xl rounded-lg text-sm flex items-center lg:gap-2 gap-1.5"
                >
                  {cat?.category_name}
                </button>
              );
            })}
          </div> */}
          </div>
        </section>

        {/* <!-- BANNER-END --> */}
        {/* <!-- TRANDING-CATEGORIES-START --> */}
        <section className="py-10">
          <div className="container 2xl:px-24 px-4 mx-auto relative">
            <h2 className="xl:text-2xl mb-2 md:text-xl text-lg text-gray-900 font-bold">
              Browse Trending Categories
            </h2>
            <Categories type="trending" />
          </div>
        </section>
        {/* <!-- TRANDING-CATEGORIES-END --> */}
        {/* <!-- FONTS-START --> */}
        <section>
          {categoryProjectList?.length > 0 ? (
            (categoryProjectList || []).map((items, index) => {
              return (
                <section key={index} className="pb-5 my-3">
                  <div className="container 2xl:px-24 px-4 mx-auto">
                    <div className="flex justify-between items-center">
                      <h2 className="xl:text-2xl md:text-xl text-lg text-gray-900 font-bold">
                        Popular {items.category_name}
                      </h2>
                      <a
                        onClick={() => {
                          setFilterCat(items?._id);
                        }}
                        className="flex border-b-2 pb-0.5 duration-500 border-transparent hover:border-theme items-center gap-2 text-theme font-bold sm:text-sm text-xs hover:text-gray-900 transition-all cursor-pointer"
                      >
                        Explore {items.category_name}
                        <FaChevronRight size={12} />
                      </a>
                    </div>
                    <List
                      projectListData={items.projects}
                      col={4}
                      type="list"
                      isLoading={isLoading}
                      pageName={pageName}
                    />
                  </div>
                </section>
              );
            })
          ) : (
            <NodataFound />
          )}
        </section>
      </AppLayout>
    </>
  );
}

export default Home;
