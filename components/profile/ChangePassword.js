import { changePasswordRequest } from "@/store/user/actions";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <div className="md:grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-3 gap-24">
        <Formik
          enableReinitialize
          // form field validation
          initialValues={{
            current_password: "",
            new_password: "",
            confirmPwd: "",
          }}
          validationSchema={Yup.object().shape({
            current_password: Yup.string()
              .required("Current Password is required")
              .min(3, "Current Password must be at 3 char long")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
            new_password: Yup.string()
              .required("New Password is required")
              .min(3, "Password must be at 3 char long")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),

            confirmPwd: Yup.string()
              .required("Verify New Password is required")
              .oneOf([Yup.ref("new_password")], "Passwords does not match"),
          })}
          // form submit event
          onSubmit={(values, { resetForm }) => {
            const data = {
              current_password: values.current_password,
              new_password: values.new_password,
            };
            dispatch(
              changePasswordRequest({
                data,
              })
            );
            resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Form onSubmit={handleSubmit} className="col-span-2 lg:col-span-1">
                <div className=" md:space-y-5 space-y-3.5">
                  <div className="md:md:space-y-1 space-y-0.5 ">
                    <label
                      className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                      htmlFor=""
                    >
                      Current Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="current_password"
                      value={values.current_password}
                      onChange={handleChange}
                      className={`${
                        errors.current_password &&
                        touched.current_password &&
                        "border-red-500"
                      } px-3 lg:py-2 py-1.5 lg:text-base text-sm border  text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded`}
                      placeholder="Current Password"
                    />

                    <div className="relative">
                      <div className="absolute right-2 top-[-25px]  lg:-translate-y-1/2 sm:-translate-y-[34%] -translate-y-[22%]">
                        {showPassword ? (
                          <AiOutlineEyeInvisible
                            size={20}
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm pt-0.5"
                          />
                        ) : (
                          <AiOutlineEye
                            size={20}
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm pt-0.5"
                          />
                        )}
                      </div>
                    </div>
                    {errors.current_password && touched.current_password ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.current_password}
                      </p>
                    ) : null}
                  </div>
                  <div className="md:md:space-y-1 space-y-0.5 ">
                    <label
                      className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                      htmlFor=""
                    >
                      New Password
                    </label>
                    <input
                      type={showPassword1 ? "text" : "password"}
                      name="new_password"
                      value={values.new_password}
                      onChange={handleChange}
                      className={`${
                        errors.new_password &&
                        touched.new_password &&
                        "border-red-500"
                      } px-3 lg:py-2 py-1.5 lg:text-base text-sm border  text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded`}
                      placeholder="New Password"
                    />
                    <div className="relative">
                      <div className="absolute right-2 top-[-25px]  lg:-translate-y-1/2 sm:-translate-y-[34%] -translate-y-[22%]">
                        {showPassword1 ? (
                          <AiOutlineEyeInvisible
                            size={20}
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="text-sm pt-0.5"
                          />
                        ) : (
                          <AiOutlineEye
                            size={20}
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="text-sm pt-0.5"
                          />
                        )}
                      </div>
                    </div>
                    {errors.new_password && touched.new_password ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.new_password}
                      </p>
                    ) : null}
                  </div>
                  <div className="md:space-y-1 space-y-0.5 ">
                    <label
                      className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                      htmlFor=""
                    >
                      verify New Password
                    </label>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      name="confirmPwd"
                      value={values.confirmPwd}
                      onChange={handleChange}
                      className={`${
                        errors.confirmPwd &&
                        touched.confirmPwd &&
                        "border-red-500"
                      } px-3 lg:py-2 py-1.5 lg:text-base text-sm border  text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded`}
                      placeholder="verify New Password"
                    />
                    <div className="relative">
                      <div className="absolute right-2 top-[-25px]  lg:-translate-y-1/2 sm:-translate-y-[34%] -translate-y-[22%]">
                        {showPassword2 ? (
                          <AiOutlineEyeInvisible
                            size={20}
                            onClick={() => setShowPassword2(!showPassword2)}
                            className="text-sm pt-0.5"
                          />
                        ) : (
                          <AiOutlineEye
                            size={20}
                            onClick={() => setShowPassword2(!showPassword2)}
                            className="text-sm pt-0.5"
                          />
                        )}
                      </div>
                    </div>
                    {errors.confirmPwd && touched.confirmPwd ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.confirmPwd}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className={`${
                      loading ? "bg-dark-theme" : ""
                    } bg-theme 2xl:text-lg lg:text-base xs:text-sm text-xs text-white font-bold tracking-wide lg:py-3.5 py-2.5 xl:px-10 lg:px-7 px-5 rounded`}
                    disabled={loading}
                  >
                    Change Password
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ChangePassword;
