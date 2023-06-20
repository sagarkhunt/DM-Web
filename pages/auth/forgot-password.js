import { forgotPasswordRequest } from "@/store/auth/actions";
import { CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store) => store.auth);

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
                  Reset your password
                </h2>
                <Formik
                  // form field validation
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                  })}
                  // form submit event
                  onSubmit={(values) => {
                    const data = {
                      email: values.email,
                    };
                    dispatch(
                      forgotPasswordRequest({
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
                            Email*
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={values.email}
                            id="email"
                            onChange={handleChange}
                            placeholder="Enter email or user name"
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
                              "Send Recovery Email"
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
                <p className="font-medium md:text-lg text-center pt-7">
                  New around here ? &nbsp;
                  <Link
                    href="/auth/login"
                    className="text-theme hover:text-black transition-all"
                  >
                    Login
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
