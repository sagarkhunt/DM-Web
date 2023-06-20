import List from "@/components/project/List";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";

const Shope = ({
  shopeData,
  setCategoryId,
  categoryId,
  categoryList,
  search,
  onChange,
  page,
  limit,
  setPage,
  isLoading,
}) => {
  const pageName = "Professional";
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const handleCateChange = (event) => {
    setCategoryId(event?.value);
  };
  const body = {
    page: page,
    search: search,
    limit: limit,
    categoryId: categoryId ? JSON.stringify([categoryId]) : [],
    isProfessionalProject: true,
    professionalId: router?.query?._id,
  };

  useEffect(() => {
    const array = categoryList?.map((cat, index) => {
      return {
        value: cat?._id,
        label: cat?.category_name,
      };
    });
    setCategoryOptions(array);
  }, [categoryList]);

  return (
    <>
      <div className="flex items-center shop flex-wrap justify-between gap-4 py-3">
        <div className="relative sm:w-auto">
          <input
            type="search"
            onChange={onChange}
            value={search}
            className="md:w-72 sm:w-60 w-full py-1.5 pl-8 text-slate-500 placeholder:text-slate-400 pr-3 border border-[#899298] bg-white-300 rounded focus:outline-none focus:shadow md:text-base text-sm  "
            placeholder="Search Shop"
          />
          <FiSearch className="absolute top-1/2 -translate-y-1/2 left-2.5  text-gray-600" />
          {/* <i className="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 left-3 text-sm text-gray-600"></i> */}
        </div>
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
          className="text-slate-500 md:!w-72 sm:!w-60 px-2.5 border md:text-base text-sm border-[#899298] bg-white-300 rounded focus:outline-none focus:shadow"
          // value={filterCat || "all"}
          label="Catgory"
          placeholder="Select catgory"
          options={categoryOptions}
          onChange={(e) => {
            handleCateChange(e);
          }}
        ></Select>
        {/* <FormControl className="text-slate-500 md:w-72 sm:w-60 w-full py-1.5 px-2.5 border md:text-base text-sm border-[#899298] bg-white-300 rounded focus:outline-none focus:shadow">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId || ""}
            label="Catgory"
            onChange={handleCateChange}
          >
            <MenuItem className="text-sm text-gray-800" value="">
              All
            </MenuItem>
            {categoryList?.map((cat, index) => {
              return (
                <MenuItem key={index} value={cat?.id}>
                  {cat?.category_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
      </div>
      <List
        projectListData={shopeData?.project?.results}
        col={4}
        type="list"
        isLoading={isLoading}
        pageName={pageName}
        params={body}
      />

      {/* <!-- Pagination --> */}
      {!isLoading && shopeData?.project?.totalPages > 1 && (
        <div className="pagination flex sm:gap-2.5 gap-1.5 items-centr justify-center my-2">
          <Pagination
            count={shopeData?.project?.totalPages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            shape="rounded"
          />
        </div>
      )}
    </>
  );
};

export default Shope;
