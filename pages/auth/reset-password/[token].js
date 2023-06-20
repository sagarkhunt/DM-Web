import { resetPasswordRequest } from "@/store/auth/actions";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showpassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const { loading } = useSelector((store) => store.auth);

  /** passworf show/hide */
  const Eye = () => {
    setShowPassword(!showpassword);
  };
  /** confirm pass show/hide */
  const EyeConf = () => {
    setShowPasswordConf(!showPasswordConf);
  };
  return (
    <>
      <section className="h-screen  flex flex-col gap-10 justify-between">
        <div className="h-full">
          <div>
            <h2 className="font-bold text-3xl xs:py-10 py-8 px-10">
              <Link href="/">DM</Link>
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
                  Set New Password
                </h2>
                <Formik
                  // form field validation
                  initialValues={{
                    password: "",
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string()
                      .required("Password is required")
                      .min(3, "Password must be at 3 char long")
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                      ),

                    confirmPwd: Yup.string()
                      .required("Confirm Password is required")
                      .oneOf([Yup.ref("password")], "Passwords does not match"),
                  })}
                  // form submit event
                  onSubmit={(values) => {
                    const data = {
                      password: values.password,
                      token: router?.query?.token,
                    };
                    dispatch(
                      resetPasswordRequest({
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
                          <div className="flex justify-between items-center">
                            <label
                              htmlFor=""
                              className="text-sm text-gray-900 font-medium"
                            >
                              New Password
                              <span className="text-red-600">*</span>
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type={showpassword ? "text" : "password"}
                              name="password"
                              placeholder="Enter new password"
                              onChange={handleChange}
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

                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <label
                              htmlFor=""
                              className="text-sm text-gray-900 font-medium"
                            >
                              Confirm Password
                              <span className="text-red-600">*</span>
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type={showPasswordConf ? "text" : "password"}
                              name="confirmPwd"
                              placeholder="Enter confirm password"
                              onChange={handleChange}
                              className={`${
                                errors.confirmPwd &&
                                touched.confirmPwd &&
                                "border-red-500"
                              } w-full p-2 pr-8 border-black rounded-sm border focus:outline-none focus:shadow focus:shadow-theme`}
                            />
                            <button
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                              type="button"
                              onClick={EyeConf}
                            >
                              {showpassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          {errors.confirmPwd && touched.confirmPwd ? (
                            <p className={"text-red-500 mb-0 error-form"}>
                              {errors.confirmPwd}
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
                              "Set Password"
                            )}
                          </button>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
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
