import { roleUpdateRequest, verifyTokenRequest } from "@/store/auth/actions";
import { cartCountRequest } from "@/store/cart/actions";
import { listProjectsCateoryRequest } from "@/store/category/actions";
import { valueSearch } from "@/store/project/actions";
import { dropdownValueSearch } from "@/store/project/actions";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId } from "react";
import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaSearch } from "react-icons/fa";
import { HiOutlineShoppingBag, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Navbar() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [showHeaderCategory, setShowHeaderCategory] = useState(false);
  const [filterCat, setFilterCat] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    dispatch(
      listProjectsCateoryRequest({
        params: { type: "projects" },
      })
    );
  }, []);

  useEffect(() => {
    if (router.pathname === "/") {
      dispatch(valueSearch(''));
    }
  }, [])

  

  useEffect(() => {
    if (router.pathname === "/") {
      dispatch(dropdownValueSearch({ value: '', label: 'All Items' }));
    }
  }, [])
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFilterSearch(e?.target?.value);
    }

  };

  const clear=(e)=>{
    if(e?.target?.value == ""){
      dispatch(valueSearch(''));
      router.push("/project/list");
    }
  }

  useEffect(() => {
    if (filterCat || filterSearch) {
      console.log("🚀 ~ file: Navbar.js:52 ~ useEffect ~ filterCat:", filterCat)
      router.push(
        `/project/list/${filterCat}${filterSearch ? "?search=" + filterSearch : ""
        }`
      );
    }
  }, [filterCat, filterSearch]);

  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  const closeToggle = () => {
    setShowMe(false);
  };
  const isAuthentication =
    typeof window !== "undefined" && localStorage.getItem("isAuthentication");

  // const userImage =
  //   typeof window !== "undefined" && localStorage.getItem("user_image");

  const [authFlag, setAuthFlag] = useState(false);

  const [showMeSubMenu, setShowMeSubMenu] = useState(false);
  const [toggleSubMenu, setToggleSubMenu] = useState();
  const subMenu = (e, index) => {
    // e.preventdefault();
    setToggleSubMenu(index);
    setShowMeSubMenu(!showMeSubMenu);
  };

  /**
   * check authentictions
   */
  useEffect(() => {
    if (isAuthentication) {
      setAuthFlag(true);
    } else {
      setAuthFlag(false);
    }
  }, [isAuthentication]);

  /* Get responses of api call */
  const {
    roleFlag,
    userImage,
    change,
    categoryProjectListData,
    userData,
    cartListData,
    cartAddData,
    cartCountTotal,
    searchValue,
    searchDropdownValue
  } = useSelector((store) => ({
    roleFlag: store?.auth?.verifyTokenData?.is_professional,
    userImage: store?.auth?.verifyTokenData?.profile_image_path,
    userData: store?.auth?.verifyTokenData,
    change: store?.auth?.roleUpdateData,
    categoryProjectListData: store?.category?.categoryProjectListData,
    cartListData: store?.cart?.cartListData,
    cartAddData: store?.cart?.cartAddData,
    cartCountTotal: store?.cart?.cartCountTotal,
    searchValue: store?.project?.searchValue,
    searchDropdownValue: store?.project?.searchDropdownValue
  }));
  /**
   * log out
   */
  const logout = async () => {
    return MySwal.fire({
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#088178",
      // customClass: {
      //   confirmButton: "",
      //   cancelButton: "",
      // },
      // buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        Cookies.remove("token");
        localStorage.clear();
        // router.push("/");
        window.location.href = "/";
      }
    });
  };
  /**
   * Role update
   */
  const switchRole = () => {
    dispatch(roleUpdateRequest());
  };
  useEffect(() => {
    if (change) {
      dispatch(verifyTokenRequest());
    }
  }, [change]);

  useEffect(() => {
    const array = categoryProjectListData?.map((cat, index) => {
      return {
        value: cat?._id,
        label: cat?.category_name,
      };
    });
    setCategoryOptions(array);

  }, [categoryProjectListData]);

  useEffect(() => {
    dispatch(cartCountRequest());
  }, [cartAddData]);
  /**
   * go to admin professional role dashboard
   */
  const redirectToAdmin = () => {
    const isAuthAccessToken =
      typeof window !== "undefined" && localStorage.getItem("access");

    window.location.href = `${process.env.DESIGNER_MARKETPLACE_ADMIN_URL}/login/?token=${isAuthAccessToken}`;
  };

  return (
    <>
      {/* HEADER-START  */}
      <div className="absolute w-full top-0 left-0 z-[998] ">
        <div className="container mx-auto px-4  bg-white ">
          <div className="relative grid grid-cols-6 py-5 items-center">
            {/* <div className="col-span-2"> */}
            <div
              className="block lg:hidden text-xl"
              id="toggle"
              onClick={toggle}
            >
              {/* <i className="fa-solid fa-bars"></i> */}
              <FaBars />
            </div>
            <div className="lg:flex justify-between items-center bg-gray-300 hidden border border-transparent hover:border-gray-400 transition-all ease-in-out xl:px-5 pl-5 pr-1 rounded-full col-span-2">
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  value={searchValue}
                  className="block p-3 px-4 w-full z-20 text-sm focus:outline-none text-gray-900 bg-transparent"
                  placeholder="Search project name, category, tag..."
                  onKeyDown={handleSearch}
                  onChange={(e) => {
                    clear(e);
                    dispatch(valueSearch(e?.target?.value));
                  }}
                />
                
                <FaSearch className="absolute text-sm top-1/2 -left-1.5 !text-gray-400 -translate-y-1/2" />
              </div>

              <div className="flex-shrink-0 text-sm font-bold text-gray-800 relative dropdown bg-transparent ">
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
                  defaultValue={searchDropdownValue}
                  className="border-l-2 pl-4 text-sm text-gray-800 !font-medium  bg-transparent"
                  value={searchDropdownValue}
                  label="All Items"
                  placeholder="All Items"
                  options={categoryOptions}
                  onChange={(e) => {
                    //c setFilterCat(e?.value);
                    console.log(e);
                    dispatch(

                      dropdownValueSearch(e)
                    );
                    setFilterCat(e?.value)
                  }}
                ></Select>
              </div>
            </div>
            {/* </div> */}
            <div className="col-span-2  sm:col-span-1 sm:absolute left-1/2 top-5 sm:-translate-x-1/2 mx-auto xl:z-[99999] cursor-pointer">
              {/* <Link href={`/`} className="cursor-pointer"> */}
              <h2 className="cursor-pointer">
                <a
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  {/* DM */}
                  <Image
                    src="/assets/DM-Logo.png"
                    alt="lazy-loader"
                    className="object-cover lg:w-48 sm:w-40 xs:w-full  lg:h-12 mx-auto"
                    width={720}
                    height={720}
                  />
                </a>
              </h2>
              {/* </Link> */}
            </div>
            {/* MENU MAIN */}
            <div className=" col-span-3 xs:col-span-2 flex items-center justify-end xl:gap-4 lg:gap-5 gap-3 text-sm font-bold sm:col-span-5 lg:col-span-4">
              {/* toggle black layer  */}

              <div
                className={`${!showMe
                  ? "fixed -translate-x-full lg:static lg:translate-x-0   lg:transition-none delay-500"
                  : "fixed"
                  } lg:flex lg:flex-row flex-col lg:static   lg:h-auto h-screen  overflow-y-auto lg:overflow-y-auto  lg:snap-none top-0 left-0 z-[90] lg:items-center xl:gap-9 lg:gap-5 w-full bg-black/20 lg:bg-transparent shadow-md lg:shadow-none justify-end`}
                id="sider"
              >
                {/* toggle white menu */}
                <div
                  className={`${!showMe
                    ? "-translate-x-full lg:translate-x-0 transition-all ease-linear"
                    : "translate-x-0"
                    } duration-500 transition-all lg:duration-200 ease-linear lg:flex lg:flex-row flex-col items-center xl:gap-9 bg-white lg:bg-transparent lg:gap-5 px-5 lg:px-0 py-5 lg:py-0 sm:w-1/2 xs:w-2/3 w-10/12 lg:w-auto space-y-7 lg:space-y-0 `}
                >
                  <div
                    className="lg:hidden flex justify-end text-theme text-2xl"
                    id="close"
                    onClick={closeToggle}
                  >
                    <HiXMark />
                  </div>
                  {/* TOGGLE-MENU (In mobile view) */}
                  <ul className="lg:flex   items-center xl:gap-7 gap-5 text-black/80 space-y-6 lg:space-y-0 border-b lg:border-none pb-5 lg:pb-0">
                    {categoryProjectListData?.length ? (
                      <>
                        <ul className="lg:hidden space-y-6 lg:space-y-0 pb-5 lg:pb-0">
                          {categoryProjectListData?.map((cat, index) => {
                            return (
                              <div key={index}>
                                {cat?.sub_cat?.length ? (
                                  <div>
                                    <li
                                      className="flex flex-wrap justify-between items-center"
                                      id="dropdownmegamenu"
                                      onClick={(e) => {
                                        subMenu(e, index)
                                      }}
                                    >
                                      {cat?.category_name}
                                      <div>
                                        <FaChevronDown className="text-theme font-bold" />
                                      </div>
                                      {showMeSubMenu}
                                      <ul
                                        className={`w-full space-y-4 p-3 border-t mt-2  ${index == toggleSubMenu
                                          ? ""
                                          : "hidden"
                                          }`}
                                        id="megamenulist"
                                      >
                                        {cat?.sub_cat?.map((sub_cat, index) => {
                                          return (
                                            <div key={index}>
                                              <li
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  setFilterCat(sub_cat?._id);
                                                  closeToggle();
                                                }}
                                              >
                                                {/* <Link href={`/project/list/${sub_cat?._id}`}> */}
                                                {/* <span href={`/project/list/${sub_cat?._id}`}> */}
                                                {sub_cat?.category_name}
                                                {/* </span> */}
                                                {/* </Link> */}
                                              </li>
                                            </div>
                                          );
                                        })}
                                        {/* <li>
                                <a href="">Textures</a>
                              </li>
                              <li>
                                <a href="">Brushes & More</a>
                              </li>
                              <li>
                                <a href="">Wallpaper</a>
                              </li>
                              <li>
                                <a href="">Patterns</a>
                              </li>
                              <li>
                                <a href="">Backgrounds</a>
                              </li> */}
                                      </ul>
                                    </li>
                                  </div>
                                ) : (
                                  <>
                                    <li
                                      key={cat?.id}
                                      className="flex flex-wrap justify-between items-center"
                                      id="dropdownmegamenu"
                                      onClick={() => {
                                        setFilterCat(cat?._id);
                                        closeToggle();
                                      }}
                                    >
                                      {cat?.category_name}
                                    </li>
                                  </>
                                )}
                              </div>
                            );
                          })}
                          {/* <li className="flex justify-between items-center">
                      <a href="">Fonts</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Photos</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Illustrations</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Icons</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Templates & Themes</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Mockups</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">Brushes & More</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">3D</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li>
                    <li className="flex justify-between items-center">
                      <a href="">More</a>
                      <i className="fa-solid fa-chevron-down text-theme font-bold"></i>
                      <FaChevronDown className="text-theme font-bold" />
                    </li> */}
                        </ul>
                      </>
                    ) : null}
                    {/* main menu */}
                    {/* <li>
                      <a
                        href=""
                        className="hover:underline hover:underline-offset-4 decoration-2 transition"
                      >
                        Free Downloads
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        className="hover:underline hover:underline-offset-4 decoration-2 transition"
                      >
                        Enterprise
                      </a>
                    </li>
                    <li>
                      <a
                        href=" "
                        className="hover:underline hover:underline-offset-4 decoration-2 transition"
                      >
                        Contribute
                      </a>
                    </li> */}
                  </ul>
                  {/* login & join  */}
                  {authFlag ? (
                    <>
                      {roleFlag ? (
                        <button
                          type="button"
                          onClick={redirectToAdmin}
                          className={`${loading ? "bg-dark-theme" : ""
                            } text-sm tracking-wide bg-theme inline-block text-white px-4 py-1.5 rounded-md hover:bg-dark-theme transition`}
                          disabled={loading}
                        >
                          Go To Dashboard
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={switchRole}
                          className={`${loading ? "bg-dark-theme" : ""
                            } text-sm tracking-wide bg-theme inline-block text-white px-4 py-1.5 rounded-md hover:bg-dark-theme transition`}
                        >
                          Switch Professional
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-black/80 border-b lg:border-none pb-5 lg:pb-0">
                      <Link
                        href="/auth/signup"
                        className="border-r border-black pr-3 hover:underline hover:underline-offset-4 decoration-2 transition"
                      >
                        Join
                      </Link>
                      <Link
                        href="/auth/login"
                        className="pl-3 hover:underline hover:underline-offset-4 decoration-2 transition"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                  {/* <button className="bg-theme inline-block text-white px-4 py-1.5 rounded-md hover:bg-dark-theme transition">
                  Pricing
                </button> */}
                </div>
              </div>

              {authFlag && (
                <div className="relative group">
                  <div className="rounded-full cursor-pointer overflow-hidden  sm:w-10 w-8  sm:h-10 h-8 lg:min-w-[40px]">
                    {userImage ? (
                      <img
                        src={userImage}
                        width={720}
                        height={720}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                    <h1>{userImage}</h1>
                  </div>
                  <div className="absolute z-[999] group-hover:block top-10 full hidden bg-white shadow-lg -right-6">
                    <ul className=" py-3   text-gray-700 font-normal">
                      <Link href="/profile/account-profile?index=likes">
                        <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                          My Profile
                        </li>
                      </Link>
                      <Link href="/my-purchase">
                        <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                          My Purchase
                        </li>
                      </Link>
                      <Link href="/profile/account-profile?index=likes">
                        <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                          My Likes
                        </li>
                      </Link>
                      <Link href="/profile/account-profile?index=collection">
                        <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                          My Collection
                        </li>
                      </Link>
                      <Link href="/profile/profile-settings">
                        <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                          Settings
                        </li>
                      </Link>
                      {/* {roleFlag ? (
                      <li className="py-1.5 px-7 hover:bg-theme-light/50 whitespace-nowrap">
                        <a href="#">My Projects</a>
                      </li>
                    ) : (
                      ""
                    )} */}
                    </ul>
                    <div
                      onClick={logout}
                      className="py-2.5 px-7 text-gray-700 cursor-pointer font-normal block border-t-2  hover:bg-theme-light/50 whitespace-nowrap"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
              <div
                className="w-9 h-9 min-w-[36px] cursor-pointer rounded-full transition hover:bg-theme-light border border-transparent hover:border-[#088178]/20 flex items-center justify-center relative"
                onClick={() => {
                  router.push("/cart");
                }}
              >
                <HiOutlineShoppingBag size={22} className="text-lg" />
                <div className="absolute -top-1.5 -right-1 w-5 h-5 border rounded-full border-white bg-theme text-white p-1 flex items-center justify-center">
                  <p className="text-xs">
                    {cartCountTotal?.totalCartItems || 0}
                    {/* || userData?.cartTotal */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HEADER-END  */}
    </>
  );
}

export default Navbar;
