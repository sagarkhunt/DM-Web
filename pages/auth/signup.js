// "use client";
import { signUpRequest, socialLoginRequest } from "@/store/auth/actions";
import { uniqueId } from "@/utils/uId";
import { useScript } from "@/utils/useScript";
import { CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();
  const uId = uniqueId();
  const router = useRouter();
  const [user, setUser] = useState("");

  const { loading } = useSelector((store) => store.auth);

  /**handle response on google login */
  const handleCallbackResponse = (res) => {
    const response = jwtDecode(res.credential);
    setUser(response);
  };

  const [showpassword, setShowPassword] = useState(false);

  // Social login user api calling
  useEffect(() => {
    if (user != "") {
      const data = {
        email: user?.email,
        name: `${user?.given_name} ${user?.family_name}`,
        profile_image: user?.picture,
        google_id: user?.sub,
        uid: uId?.uid,
        // socialType: "google",
      };
      dispatch(
        socialLoginRequest({
          data,
          router,
        })
      );
    }
  }, [user]);
  /**
   * open google sign in pop-up
   */
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "807821559046-qrd9dv24jrlt3ne4dfm4875fpj0ei7tj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signSocialIn"),
      {
        width: "100%",
      }
    );
  });
  const Eye = () => {
    setShowPassword(!showpassword);
  };
  return (
    <>
      <section className="h-full  flex flex-col gap-10 justify-between">
        <div className="h-full">
          <div>
            <h2 className="font-bold text-3xl lg:py-10 py-8 px-10">
              <Link href="/">
                <Image
                  src="/assets/DM-Logo.png"
                  alt="lazy-loader"
                  className="object-cover lg:w-48 w-40 h-9 lg:h-12"
                  width={720}
                  height={720}
                />
              </Link>
            </h2>
          </div>
          <div className="container xl:px-32 px-4 mx-auto  py-5">
            <div className="md:grid grid-cols-2 gap-8 items-start">
              <div className="md:block hidden py-10">
                <h1 className="2xl:text-4xl lg:text-3xl text-2xl font-medium !leading-snug pb-10 px-6">
                  Discover digital assets created by talented artists around the
                  world.
                </h1>
                <div>
                  <Image
                    src="/assets/images/login.webp"
                    width={720}
                    height={720}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>
              <div className="md:max-w-md h-full">
                <h2 className="font-medium text-gray-900 sm:text-2xl text-xl py-2">
                  Sign up for Designer Marketplace
                </h2>
                <Formik
                  // form field validation
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    acceptTerms: false,
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string()
                      .matches(
                        /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/,
                        "Please enter your full name with both words separated by a space."
                      )
                      .required("Full name is required")
                      .min(3, "Must be exactly 3 digits")
                      .max(30, "Must be exactly 30 digits"),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    password: Yup.string()
                      .required("Password is required")
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                      ),
                    acceptTerms: Yup.bool().oneOf(
                      [true],
                      "Accept Ts & Cs is required"
                    ),
                  })}
                  // form submit event
                  onSubmit={(values) => {
                    const data = {
                      name: values.name,
                      // userName: values.userName,
                      email: values.email,
                      password: values.password,
                      acceptTerms: values.acceptTerms,
                      uid: uId?.uid ?? "",
                    };
                    dispatch(
                      signUpRequest({
                        data,
                        router,
                      })
                    );
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <>
                      <Form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-0.5">
                          <label
                            htmlFor=""
                            className="text-sm text-gray-900 font-medium"
                          >
                            Full name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            className={`${
                              errors.name && touched.name && "border-red-500"
                            } w-full p-2 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            autoFocus
                          />
                          {errors.name && touched.name ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.name}
                            </p>
                          ) : null}
                        </div>
                        <div className="space-y-0.5">
                          <label
                            htmlFor=""
                            className="text-sm text-gray-900 font-medium"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={values.email}
                            id="email"
                            onChange={handleChange}
                            placeholder="Enter email"
                            className={`${
                              errors.name && touched.name && "border-red-500"
                            } w-full p-2 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                          />
                          {errors.email && touched.email ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div className="space-y-0.5">
                          <label
                            htmlFor=""
                            className="text-sm text-gray-900 font-medium"
                          >
                            Password <span className="text-red-600">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showpassword ? "text" : "password"}
                              name="password"
                              onChange={handleChange}
                              placeholder="Enter password"
                              className={`${
                                errors.name && touched.name && "border-red-500"
                              } w-full p-2 pr-8 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                            />
                            <button
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                              type="button"
                              onClick={Eye}
                            >
                              {showpassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {/* <a href="">
                              <i className="fa-solid fa-eye absolute top-1/2 right-3 -translate-y-1/2"></i>
                            </a> */}
                          </div>
                          {errors.password && touched.password ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.password}
                            </p>
                          ) : null}
                          <p className="xs:text-sm text-xs text-[#6e777d] font-medium">
                            At least 8 characters. Must include at least one:
                            uppercase letter, lowercase letter, number, and
                            symbol.
                          </p>
                        </div>
                        <div className="lg:space-y-4 space-y-2">
                          <label htmlFor="" className="py-3.5">
                            *Required Fields
                          </label>
                          <div>
                            <label className="flex items-start lg:text-base md:text-sm xs:text-base text-sm gap-2  checkbox text-gray-900 ">
                              <input
                                type="checkbox"
                                // className="appearance-none"
                                className={`appearance-none ${
                                  errors.acceptTerms ? "text-red-600" : ""
                                }`}
                                onChange={handleChange}
                                name="acceptTerms"
                                id="acceptTerms"
                              />
                              <span className="checkmark"></span>
                              <p>
                                I agree to the
                                <a
                                  className="text-theme
                                   font-medium"
                                >
                                  Terms of Service
                                </a>
                                and
                                <a className="text-theme font-medium">
                                  Privacy Policy
                                </a>
                              </p>
                            </label>
                            {errors.acceptTerms && touched.acceptTerms ? (
                              <p className={"text-red-500 mb-0 error-form"}>
                                {errors.acceptTerms}
                              </p>
                            ) : null}
                            {/* <div className="invalid-feedback text-red-600">
                              {errors.acceptTerms}
                            </div> */}
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className={`${
                              loading ? "bg-dark-theme" : ""
                            } relative w-full text-lg bg-theme transition-all flex justify-center items-center text-white font-bold sm:py-3 py-2.5 rounded`}
                          >
                            {loading ? (
                              <CircularProgress size={15} color="inherit" />
                            ) : (
                              "Create Account"
                            )}
                          </button>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
                <p className="relative text-center after:content-[''] after:absolute after:top-1/2 after:-z-10 after:left-0 after:w-full after:h-px after:bg-gray-400/50 my-6">
                  <span className="bg-white text-gray-400 font-light px-4 z-10">
                    OR
                  </span>
                </p>
                <div className="flex justify-center">
                  <div
                    id="signSocialIn"
                    className="flex items-center justify-center gap-3 w-full xl:py-3.5 sm:py-3 py-2.5 text-center font-medium  transition-all duration-500 text-theme"
                  >
                    Log In Using Google
                  </div>
                </div>
                {/* <button
                  id="signSocialIn"
                  className="flex items-center justify-center gap-3 w-full xl:py-3.5 sm:py-3 py-2.5 text-center font-medium hover:bg-theme/10 transition-all duration-500 text-theme border-2 border-theme rounded"
                >
                  <div className="w-4 h-4">
                    <Image
                      src="/assets/images/google.png"
                      className="w-full h-full object-cover"
                      width={720}
                      height={720}
                      alt=""
                    />
                  </div>
                  Log In Using Google
                </button> */}
                <p className="font-medium md:text-lg text-center pt-7">
                  Have an account? &nbsp;
                  <Link
                    href="/auth/login"
                    className="text-theme hover:text-black transition-all"
                  >
                    Log In!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 py-5 w-full flex gap-8 text-sm font-semibold justify-center items-center">
          <a href="">Terms</a>
          <a href="">Cookie Policy</a>
          <a href="">Privacy Policy</a>
        </div>
      </section>
    </>
  );
};

export default Signup;
