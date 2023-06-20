import ChangePassword from "@/components/profile/ChangePassword";
import EmailPreferences from "@/components/profile/EmailPreferences";
import PaymentBilling from "@/components/profile/PaymentBilling";
import { UpdateProfile } from "@/components/profile/UpdateProfile";
import AppLayout from "@/layout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequest } from "@/store/user/actions";
import Loader from "@/components/common/Loader";

const ProfileSetting = () => {
  const [tabindex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { profileDetails, isLoading } = useSelector((store) => ({
    profileDetails: store?.auth?.verifyTokenData,
    isLoading: store?.auth?.loading,
  }));
  const tabHandler = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        {/* <!--ACCOUNT SETTING-START  --> */}
        <section className="sm:py-10 py-6">
          <div className="container xl:px-24 px-4 mx-auto">
            <h2 className="text-gray-900 font-semibold lg:text-2xl text-xl ">
              Account Settings
            </h2>
            {/* <!-- Tabs --> */}
            <div className="py-1 border-b flex profile lg:gap-9 md:gap-6 gap-4 font-bold lg:text-base text-sm flex-wrap items-center  mt-5">
              <button
                className={`${tabindex === 0 ? "active" : ""
                  } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler(0)}
              >
                Profile Settings
              </button>
              <button
                className={`${tabindex === 1 ? "active" : ""
                  } text-gray-900 border-b-4 border-transparent py-1 px-1`}
                onClick={() => tabHandler(1)}
              >
                Change Password
              </button>
              {/* <button
              className={`${
                tabindex === 2 ? "active" : ""
              } text-gray-900 border-b-4 border-transparent py-1 px-1`}
              onClick={() => tabHandler(2)}
            >
              Payment & Billing
            </button>
            <button
              className={`${
                tabindex === 3 ? "active" : ""
              } text-gray-900 border-b-4 border-transparent py-1 px-1`}
              onClick={() => tabHandler(3)}
            >
              Email Preferences
            </button> */}
            </div>
            <div className="md:py-9 py-7 w-full ">
              {/* <!-- profile --> */}
              <div
                className={`${tabindex != 0 ? "hidden" : ""} account-content`}
              >
                <Formik
                  enableReinitialize
                  // form field validation userDetails
                  initialValues={{
                    email: profileDetails?.email ?? "",
                    name: profileDetails?.name ?? "",
                    website_url: profileDetails?.userDetails?.website_url ?? "",
                    description: profileDetails?.userDetails?.description ?? "",
                    public_profile:
                      profileDetails?.userDetails?.public_profile ?? false,
                    city: profileDetails?.userDetails?.city ?? "",
                    // show_location:
                    //   profileDetails?.userDetails?.show_location ?? "",
                    profession: profileDetails?.userDetails?.profession ?? "",
                    full_time_job:
                      profileDetails?.userDetails?.full_time_job ?? false,
                    part_time_job:
                      profileDetails?.userDetails?.part_time_job ?? false,
                    school: profileDetails?.userDetails?.school ?? false,
                    freelance_work:
                      profileDetails?.userDetails?.freelance_work ?? false,
                    non_profit_or_charity:
                      profileDetails?.userDetails?.non_profit_or_charity ??
                      false,
                    personal_projects:
                      profileDetails?.userDetails?.personal_projects ?? false,
                    company_size:
                      profileDetails?.userDetails?.company_size ?? "",
                    market_in_future: profileDetails?.userDetails
                      ?.market_in_future
                      ? "yes"
                      : "no",
                    facebook_url:
                      profileDetails?.userDetails?.facebook_url ?? "",
                    twitter_url: profileDetails?.userDetails?.twitter_url ?? "",
                    pinterest_url:
                      profileDetails?.userDetails?.pinterest_url ?? "",
                    instagram_url:
                      profileDetails?.userDetails?.instagram_url ?? "",
                    dribbble_url:
                      profileDetails?.userDetails?.dribbble_url?? "",
                    linkedin_url:
                      profileDetails?.userDetails?.linkedin_url ?? "",
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string()
                      .matches(
                        /^([A-Za-zÀ-ÖØ-öø-ÿ]+\s){1,2}([A-Za-zÀ-ÖØ-öø-ÿ]+)$/,
                        "Full name is not valid only three space allow"
                      )
                      .required("Full name is required")
                      .min(3, "Must be exactly 3 digits")
                      .max(30, "Must be exactly 30 digits"),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    bio: Yup.string().min(20).max(300).label("Bio"),
                  })}
                  // form submit event
                  onSubmit={(values) => {
                    const data = {
                      ...values,
                    };
                    dispatch(
                      updateProfileRequest({
                        data,
                        // router,
                      })
                    );
                  }}
                >
                  {(formiArgs) => {
                    const {
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange,
                      handleSubmit,
                    } = formiArgs;

                    return (
                      <Form onSubmit={handleSubmit}>
                        <UpdateProfile formiArgs={formiArgs} />
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              {/* <!-- Change password --> */}
              <div
                className={`${tabindex != 1 ? "hidden" : ""} account-content`}
              >
                <ChangePassword />
              </div>

              {/* <!-- payment & billing --> */}
              {/* <div className={`${tabindex != 2 ? "hidden" : ""} account-content`}>
              <PaymentBilling />
            </div> */}

              {/* <!-- email --> */}
              {/* <div className={`${tabindex != 3 ? "hidden" : ""} account-content`}>
              <EmailPreferences />
            </div> */}
            </div>
          </div>
        </section>
        {/* <!--ACCOUNT SETTING-END  --> */}
      </AppLayout>
    </>
  );
};

export default ProfileSetting;
