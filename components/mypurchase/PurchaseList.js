import { purchaseListRequest } from "@/store/mypurchase/action";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../project/List";
import Accordion from "@/components/common/Accordion";
import { FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material";
import { listCateoryUserWiseRequest } from "@/store/category/actions";

const PurchaseList = ({ page, limit, search, sortBy, onChange }) => {
  const [togglefilter, setToggleFilter] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [categoryId, setCategoryId] = useState([]);
  const [discount, setDiscount] = useState();
  const [buttonHide, setButtonHide] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const { purchaselistdata, addRatingData , collectionCreateData,
    collectionAddData,} = useSelector((store) => ({
    purchaselistdata: store?.mypurchase?.purchaselistdata,
    addRatingData: store?.mypurchase?.addRatingData,
    collectionCreateData: store?.collection?.collectionCreateData,
      collectionAddData: store?.collection?.collectionAddData,
  }));

  useEffect(() => {
    dispatch(
      purchaseListRequest({
        params: {
          page: page,
          limit: limit,
          search: search,
          sortBy: sortBy,
          price: price[1] > 0 ? price.join("-") : "",
          category: JSON.stringify(categoryId),
        },
      })
    );
  }, [addRatingData, search, categoryId, price , collectionCreateData,
    collectionAddData]);

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
    // setPage(1);
    setCategoryId([]);
    setPrice([0, 0]);
    // setSearch("");
    setDiscount();
    setToggleFilter(false);
    setButtonHide(false);
    // router.push("/pr oject/list");
  };

  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const valuetext = (value) => {
    return `${value}°C`;
  };
  const { categoryListUserWiseData } = useSelector((store) => ({
    categoryListUserWiseData: store?.category?.categoryListUserWiseData,
  }));

  useEffect(() => {
    dispatch(
      listCateoryUserWiseRequest({
        params: {
          type: "my-purchase",
        },
      })
    );
  }, []);
  useEffect(() => {
    if (
      categoryId?.length > 0 ||
      price[0] != 0 ||
      price[1] != 0 ||
      typeof discount != "undefined"
    ) {
      setButtonHide(true);
    } else {
      setButtonHide(false);
    }
  }, [categoryId, price, discount]);

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
      <div className="flex items-center gap-4 justify-between xl:py-6 py-7 sm:px-4">
        <div className="relative " ref={divRef}>
          <button
            className="md:px-6 px-5 md:py-2.5 py-2 hover:bg-theme-light transition-all text-sm text-theme border-2 font-semibold rounded tracking-wider border-theme"
            onClick={() => {
              setToggleFilter(!togglefilter);
            }}
          >
            Filter
          </button>
          {buttonHide ? (
            <button
              className="md:px-6 px-5 md:py-2.5 py-2 ml-1 hover:bg-theme-light transition-all text-sm text-theme border-2 font-semibold rounded tracking-wider border-theme"
              id="filter"
              onClick={() => {
                clearFilter(!togglefilter);
              }}
            >
              Clear
            </button>
          ) : (
            ""
          )}
          <div
            className={`absolute  shadow rounded top-full z-[90] left-0 w-64 ${
              togglefilter ? "" : "hidden"
            }`}
          >
            <div className=" !w-full container mx-auto whitespace-nowrap bg-white">
              <Accordion
                isActive={isActive}
                setIsActive={setIsActive}
                key="categories"
                name="categories"
                title="Categories"
                content={
                  <ul className="xl:space-y-2 space-1 lg:text-base text-sm text-gray-900">
                    {categoryListUserWiseData?.map((cat, i) => {
                      return (
                        <li key={cat?.id}>
                          <label className="flex items-start gap-2 checkbox">
                            <input
                              type="checkbox"
                              className="appearance-none"
                              name="categoryId"
                              value={cat?.id}
                              onChange={setFilterCategoryId}
                              checked={
                                categoryId && categoryId.includes(cat?.id)
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
                      <p>{purchaselistdata?.data?.priceMin}</p>
                      <p>{purchaselistdata?.data?.priceMax}</p>
                    </div>
                    <Slider
                      // onChangeCommitted={handlePrice}
                      getAriaLabel={() => "Price range"}
                      min={purchaselistdata?.data?.priceMin}
                      max={purchaselistdata?.data?.priceMax}
                      value={price}
                      onChange={handlePrice}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </ul>
                }
              />
            </div>
          </div>
        </div>
        <div className="relative sm:w-auto">
          <input
            type="search"
            className="md:w-72 sm:w-60 w-full py-2 pl-8 text-slate-500 placeholder:text-slate-400 pr-3 border border-[#899298] bg-white-300 rounded focus:outline-none focus:shadow md:text-base text-sm  "
            placeholder="Search Shop"
            onChange={onChange}
          />
          <FaSearch className=" absolute top-1/2 -translate-y-1/2 left-3 text-sm text-gray-600" />
        </div>
      </div>
      {console.log(purchaselistdata?.data?.results)}
      <List
        projectListData={purchaselistdata?.data?.results}
        col={4}
        type="purchase"
      />
    </>
  );
};

export default PurchaseList;
