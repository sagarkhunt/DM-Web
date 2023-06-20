import { loginRequest, socialLoginRequest } from "@/store/auth/actions";
import { Form, Formik } from "formik";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { useScript } from "@/utils/useScript";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { uniqueId } from "@/utils/uId";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const uId = uniqueId();
  const [user, setUser] = useState("");

  const [showpassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);

  /**handle response on google login */
  const handleCallbackResponse = (res) => {
    const response = jwtDecode(res.credential);
    setUser(response);
  };

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

  // const googleLoginPopUp = () => {
  // };
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "807821559046-qrd9dv24jrlt3ne4dfm4875fpj0ei7tj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signSocialIn"),
      {
        theme: "outline",
        width: "100%",
      }
    );
  });
  const Eye = () => {
    setShowPassword(!showpassword);
  };
  return (
    <>
      <section className="h-screen flex flex-col gap-10 justify-between">
        <div className="h-full ">
          <div>
            <h2 className="font-bold text-3xl xs:py-10 py-8 px-10">
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
          <div className="container xl:px-36 px-4 mx-auto lg:py-10 py-5">
            <div className="md:grid grid-cols-2 gap-8 items-center">
              <div className="md:block hidden">
                <h1 className="2xl:text-4xl lg:text-3xl text-2xl font-medium !leading-snug pb-10 px-6">
                  Welcome back to the world’s marketplace for design
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
                  Designer Marketplace
                </h2>
                <Formik
                  // form field validation
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                  // form submit event
                  onSubmit={(values) => {
                    const data = {
                      email: values.email,
                      password: values.password,
                      uid: uId?.uid ?? "",
                    };
                    dispatch(
                      loginRequest({
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
                      <Form className="space-y-5" onSubmit={handleSubmit}>
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
                              errors.email && touched.email && "border-red-500"
                            } w-full p-2 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                          />
                          {errors.email && touched.email ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <label
                              htmlFor=""
                              className="text-sm text-gray-900 font-medium"
                            >
                              Password <span className="text-red-600">*</span>
                            </label>
                            <label
                              htmlFor=""
                              className="text-sm text-theme font-medium"
                            >
                              <Link href="/auth/forgot-password">
                                Forgot Password?
                              </Link>
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type={showpassword ? "text" : "password"}
                              name="password"
                              onChange={handleChange}
                              placeholder="Enter password"
                              className={`${
                                errors.password &&
                                touched.password &&
                                "border-red-500"
                              } w-full p-2 pr-8 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                            />
                            <button
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                              type="button"
                              onClick={Eye}
                            >
                              {showpassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          {errors.password && touched.password ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.password}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <button
                            type="submit"
                            className={`${
                              loading ? "bg-dark-theme" : ""
                            } relative w-full text-lg bg-theme transition-all flex justify-center items-center text-white font-bold sm:py-3 py-2.5 rounded`}
                            disabled={loading}
                          >
                            {loading ? (
                              <CircularProgress size={15} color="inherit" />
                            ) : (
                              "Log In"
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
                {/* <button
                  className="flex items-center justify-center gap-3 w-full xl:py-3.5 sm:py-3 py-2.5 text-center font-medium hover:bg-theme/10 transition-all duration-500 text-theme border-2 border-theme rounded"
                  onClick={googleLoginPopUp}
                >
                  <div className="w-4 h-4">
                    <Image
                      src="/assets/images/google.png"
                      width={720}
                      height={720}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  Log In Using Google
                </button> */}
                <div className="flex justify-center">
                  <div
                    id="signSocialIn"
                    className="flex items-center justify-center gap-3 w-full xl:py-3.5 sm:py-3 py-2.5 text-center font-medium transition-all duration-500 text-theme"
                  >
                    Log In Using Google
                  </div>
                </div>

                <p className="font-medium md:text-lg text-center pt-7">
                  New around here ? &nbsp;
                  <Link
                    href="/auth/signup"
                    className="text-theme hover:text-black transition-all"
                  >
                    Sign up !
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

export default Login;
