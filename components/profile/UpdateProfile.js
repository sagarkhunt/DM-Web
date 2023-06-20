import {
  accountDeactiveRequest,
  getProfessionRequest,
  profileImageDeleteRequest,
  profileImageRequest,
} from "@/store/user/actions";
import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenRequest } from "@/store/auth/actions";
import { listProjectsCateoryRequest } from "@/store/category/actions";
import { companySize } from "@/utils/companysize";
import { Field } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";


export const UpdateProfile = ({ formiArgs }) => {
  const {   values, setFieldValue, errors, touched, handleChange } = formiArgs;
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [showprofileimage, setShowProfileImage] = useState(null);
  const [professionOptions, setProfessionOptions] = useState([]);

  const [age, setAge] = useState("");
  const [profession, setprofession] = useState("");

  const handleChanges = (event) => {
    setAge(event.target.value);
  };

  const profileImage = useSelector(
    (store) => store?.auth?.verifyTokenData?.profile_image_path
  );
  const {
    profileImageUpdate,
    profileImageDelete,
    professionOptionList,
    loading,
    loadingDel,
  } = useSelector((store) => ({
    loading: store?.user?.loading,
    loadingDel: store?.user?.loadingDel,
    profileImageUpdate: store?.user?.profileImageUpdate,
    profileImageDelete: store?.user?.profileImageDelete,
    professionOptionList: store?.user?.professionListData,
  }));
  const MySwal = withReactContent(Swal);
  const [filterCat, setFilterCat] = useState("");
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setShowProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  /** image update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile_image", imageFile);

    dispatch(
      profileImageRequest({
        data: formData,
      })
    );
  };

  useEffect(() => {
    dispatch(
      listProjectsCateoryRequest({
        params: { type: "projects" },
      })
    );
  }, []);
  // useEffect(() => {
  //   const array = professionOptionList?.map((el, index) => {
  //     return {
  //       value: el?._id,
  //       label: el?.profession_name,
  //     };
  //   });
  //   setProfessionOptions(array);
  // }, [professionOptionList]);

  useEffect(() => {
    if (profileImageUpdate || profileImageDelete) {
      // setShowProfileImage(null)
      dispatch(verifyTokenRequest());
    }
  }, [profileImageUpdate, profileImageDelete]);

  useEffect(() => {
    const data = {
      limit: 12,
      search: "",
    };
    dispatch(getProfessionRequest(data));
  }, []);

  /**
   * user image delete
   */
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(profileImageDeleteRequest());
  };

  const deactiveAccount = async (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      // buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(accountDeactiveRequest());
          Cookies.remove("token");
          localStorage.clear();
          router.push("/");
        }
      });
  };

  return (
    <>
      <div className="md:grid grid-cols-3 xl:gap-24 lg:gap-14 gap-7">
        {/* <!-- profile details --> */}
        <div className="col-span-2">
          <h2 className="xs:text-xl text-lg  text-gray-900 font-bold tracking-wide">
            My Profile
          </h2>
          <p className="text-sm font-semibold tracking-wider text-gray-900 py-4">
            Upload Image
          </p>
          <div className="flex gap-4 items-center">
            <div className="sm:w-20 w-16 relative cursor-pointer sm:h-20 h-16">
              <label htmlFor="profileImage">
                <img
                  className="w-full h-full cursor-pointer object-cover"
                  src={
                    showprofileimage ??
                    profileImage ??
                    `../assets/images/user.png`
                  }
                  alt=""
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="appearance-none hidden"
                  // hidden
                  id="profileImage"
                />
                <div className="absolute cursor-pointer top-0.5 right-0.5 w-6 h-6 rounded-full bg-theme text-white flex items-center justify-center border-2 shadow">
                  <FaPencilAlt size={10} />
                </div>
              </label>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-white hover:bg-dark-theme hover:border-dark-theme transition-all bg-theme border-2 border-theme font-bold tracking-wide sm:text-sm text-xs rounded px-3 py-1"
                >
                  {loading ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="text-theme hover:bg-theme-light  transition-all  border-2 border-theme font-bold tracking-wide sm:text-sm text-xs rounded px-3 py-1"
                >
                  {loadingDel ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
              {/* <p className="pt-1.5 xl:text-base sm:text-sm text-xs">JPG, GIF or PNG, < 5 MB. </p> */}
            </div>
          </div>

          <div className="lg:pt-8 pt-6 pb-10 border-b space-y-4 border-black/80">
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border border-[#899298] text-slate-500 placeholder:text-slate-400 bg-white-300 focus:outline-none w-full rounded"
                placeholder="Full Name"
                autoFocus
              />
              {errors.name && touched.name ? (
                <p className={"text-red-500 mb-0 error-form"}>{errors.name}</p>
              ) : null}
            </div>

            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                type="text"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <p className={"text-red-500 mb-0 error-form"}>{errors.email}</p>
              ) : null}
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <label
                  className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                  htmlFor=""
                >
                  Website URL
                </label>
                <p className="text-slate-400 sm:text-sm text-xs">Optional</p>
              </div>
              <input
                type="text"
                name="website_url"
                value={values.website_url}
                onChange={handleChange}
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Website URL"
              />
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <label
                  className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                  htmlFor=""
                >
                  Bio
                </label>
                <p className="text-slate-400 sm:text-sm text-xs">Optional</p>
              </div>
              <textarea
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="description"
                onChange={handleChange}
                value={values.description}
                name="description"
                id=""
                rows="3"
              ></textarea>
              {errors.description && touched.description ? (
                <p className={"text-red-500 mb-0 error-form"}>
                  {errors.description}
                </p>
              ) : null}
              {/* <p className="text-slate-400  lg:text-base text-sm !mt-0">
                300 character limit
              </p> */}
            </div>
            <div>
              <label className="flex items-start gap-2 lg:text-base xs:text-sm text-xs text-slate-500 checkbox">
                <input
                  type="checkbox"
                  checked={values.public_profile}
                  onChange={handleChange}
                  name="public_profile"
                  className="appearance-none"
                  id="level"
                />
                <span className="checkmark"></span>Show Likes, Comments,
                Recommendations, Following, and Collection activity on public
                profile
              </label>
            </div>
          </div>

          {/* <!-- Additional Information --> */}
          <div className="md:py-12 py-8 profile">
            <h2 className="text-gray-900 text-lg font-semibold tracking-wide">
              Additional Information
            </h2>
            <p className="text-gray-900 sm:py-3 py-2 lg:text-base text-sm">
              Help us optimize your Designer Market Place experience by filling
              in the optional information below.
            </p>
            {/* <div className="md:space-y-1 space-y-0.5 py-3.5">
              <div className="flex items-center justify-between">
                <label
                  className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                  htmlFor=""
                >
                  Location
                </label>
                <p className="text-slate-400 text-sm">Optional</p>
              </div>
              <input
                type="text"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Location"
              />
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  name=""
                  id="level"
                />
                <span className="checkmark"></span>Show location on profile
              </label>
            </div> */}
            <div className="md:space-y-1 space-y-0.5 py-3.5">
              <div className="flex items-center justify-between">
                <label
                  className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                  htmlFor=""
                >
                  Profession
                </label>
                <p className="text-slate-400 sm:text-sm text-xs">Optional</p>
              </div>
              <FormControl fullWidth className="relative">
                {/* <InputLabel id="demo-simple-select-label" className="text-sm">Company Size</InputLabel> */}
                <HiXMark className={`${values.profession == "" ? 'hidden ' : 'block'} cursor-pointer absolute top-1/2 -translate-y-1/2 z-40 right-9`}
                  onClick={(e) => {
                    setFieldValue(values.profession = "");
                  }}
                />
                <Select
                  className="px-3 !w-full lg:text-base text-sm !border !border-[#899298] !bg-[#efefef] focus:outline-none rounded"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.profession}
                  label="profession"
                  displayEmpty
                  onChange={(e) => {
                    setFieldValue("profession", e?.target?.value);
                  }}
                >
                  <MenuItem disabled value="" className="hidden">Profession</MenuItem>
                  {professionOptionList?.map((el, index) => {
                    return (
                      <MenuItem
                        className="text-sm text-gray-800"
                        value={el?._id}
                        key={index}
                      >
                        {el?.profession_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <p className="text-gray-900 font-semibold xs:text-base text-sm tracking-wider py-2">
              I use Designer Market Place for...
            </p>
            <div className="md:space-y-1 space-y-0.5 pb-1">
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  checked={values.full_time_job}
                  onChange={handleChange}
                  name="full_time_job"
                  id="level"
                />
                <span className="checkmark"></span>My full-time job
              </label>
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  checked={values.part_time_job}
                  onChange={handleChange}
                  name="part_time_job"
                  id="level"
                />
                <span className="checkmark"></span>My part-time side business
              </label>
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  checked={values.school}
                  onChange={handleChange}
                  name="school"
                  id="level"
                />
                <span className="checkmark"></span>School
              </label>
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  checked={values.freelance_work}
                  onChange={handleChange}
                  name="freelance_work"
                  className="appearance-none"
                  id="level"
                />
                <span className="checkmark"></span>My freelance work
              </label>
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  checked={values.non_profit_or_charity}
                  onChange={handleChange}
                  name="non_profit_or_charity"
                  id="level"
                />
                <span className="checkmark"></span>A non-profit or charity
              </label>
              <label className="flex items-center lg:items-start gap-2 lg:text-base text-sm text-slate-500 checkbox">
                <input
                  type="checkbox"
                  className="appearance-none"
                  checked={values.personal_projects}
                  onChange={handleChange}
                  name="personal_projects"
                  id="level"
                />
                <span className="checkmark"></span>Personal Projects
              </label>
            </div>
            {values.full_time_job && (
              <div className="md:space-y-1 space-y-0.5 py-4">
                <div className="flex items-center justify-between">
                  <label
                    className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                    htmlFor=""
                  >
                    Company Size
                  </label>
                  <p className="text-slate-400 sm:text-sm text-xs">Optional</p>
                </div>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Company Size</InputLabel> */}
                  <HiXMark className={`${values.company_size == "" ? 'hidden ' : 'block'} cursor-pointer absolute top-1/2 -translate-y-1/2 z-40 right-9`}
                    onClick={() => {
                      setFieldValue(values.company_size = "")
                    }}
                  />
                  <Select
                    className="px-3  !w-full lg:text-base text-sm !border !border-[#899298] !bg-[#efefef] focus:outline-none rounded"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.company_size}
                    label="company_size"
                    displayEmpty
                    onChange={(e) => {
                      setFieldValue("company_size", e?.target?.value);
                    }}
                  >
                    <MenuItem disabled value="" className="hidden">Company size</MenuItem>
                    {companySize?.map((size, index) => {
                      return (
                        <MenuItem
                          className="text-sm text-gray-800"
                          value={size?.value}
                          key={index}
                        >
                          {size?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            )}

            <p className="text-gray-900 font-semibold xs:text-base text-sm tracking-wide py-2.5">
              Are you interested in speaking to us to help improve Designer
              Market Place in the future?
            </p>
            <label className="radio-btn flex xs:text-base text-sm items-end text-gray-900 gap-4 text-start relative cursor-pointer pl-2.5 pb-1">
              <Field
                type="radio"
                value="yes"
                onChange={handleChange}
                name="market_in_future"
                className="appearance-none"
              />
              <span className="radiocheckmark !top-[3px]"></span>
              Yes
            </label>
            <label className="radio-btn flex xs:text-base text-sm items-center text-gray-900 gap-4 text-start relative cursor-pointer pl-2.5">
              <Field
                type="radio"
                value="no"
                onChange={handleChange}
                name="market_in_future"
                className="appearance-none"
              />
              <span className="radiocheckmark !top-[3px]"></span>
              No
            </label>
          </div>
        </div>
        {/* <!-- Social Profiles (Optional) --> */}
        <div className="pt-8 md:pt-0">
          <h2 className="lg:text-xl text-lg text-gray-900 font-bold tracking-wider">
            Social Profiles (Optional)
          </h2>
          <div action="" className="md:space-y-4 space-y-2.5 xs:py-4 py-3">
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Facebook
              </label>
              <input
                type="text"
                value={values.facebook_url}
                onChange={handleChange}
                name="facebook_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Facebook username"
              />
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Twitter
              </label>
              <input
                type="text"
                value={values.twitter_url}
                onChange={handleChange}
                name="twitter_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Twitter username"
              />
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Pinterest
              </label>
              <input
                type="text"
                value={values.pinterest_url}
                onChange={handleChange}
                name="pinterest_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Pinterest username"
              />
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Instagram
              </label>
              <input
                type="text"
                value={values.instagram_url}
                onChange={handleChange}
                name="instagram_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Instagram username"
              />
            </div>
            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Dribbble
              </label>
              <input
                type="text"
                value={values.dribbble_url}
                onChange={handleChange}
                name="dribbble_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="Dribbble username"
              />
            </div>

            <div className="md:space-y-1 space-y-0.5">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                LinkedIn
              </label>
              <input
                type="text"
                value={values.linkedin_url}
                onChange={handleChange}
                name="linkedin_url"
                className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
                placeholder="LinkedIn username"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-theme lg:text-base text-sm border border-theme text-white font-semibold tracking-wider hover:bg-dark-theme hover:border-dark-theme lg:py-3 xs:py-2.5 py-2 lg:px-7 xs:px-5 px-3.5 lg:my-3 xs:my-2 rounded"
      >
        Update Setting
      </button>
      <br></br>
      <button
        type="button"
        onClick={deactiveAccount}
        className="sm:text-sm text-xs mt-8 text-white font-bold tracking-wider rounded bg-red-400 hover:bg-red-800 transition-all px-3.5 py-1.5"
      >
        Deactivate account
      </button>
    </>
  );
};
