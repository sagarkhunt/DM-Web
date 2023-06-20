import { addRatingRequest } from "@/store/mypurchase/action";
import { Rating } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const EditRatingMdl = ({ purchaseId, open, setOpen ,ratingstar , ratingMessage}) => {
  const dispatch = useDispatch();
  const [ratingreview, setRatingReview] = useState("");
  
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div className={`purchase ${open ? "show-modal" : ""}`} open={open}>
        <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[650px] bg-white rounded sm:p-5 p-2.5">
          <div className="w-full ">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl  text-gray-900 font-bold tracking-wider">
                {ratingstar && ratingMessage ? "Edit Rating"
                  : "Add Rating"}
              </h1>
              <a className="text-end close-btn cursor-pointer block">
                <HiXMark
                  className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
                  onClick={() => setOpen(!open)}
                />
              </a>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                rating: ratingstar ?? 0,
                reviewmessage: ratingMessage ?? "",
              }}
              validationSchema={Yup.object().shape({
                // rating: Yup.number().required("Star value is required"),
                rating: Yup.number()
                  .min(1, "Please select rating star")
                  .required("Star is required"),
                reviewmessage: Yup.string()
                  .matches("^\\S", {
                    message: "Please remove extra space.",
                  })
                  .required("Message is required")
                  .min(3, "message must be contain atleast 3 character")
                  .max(1000, "message can't be more than 1000 character"),
              })}
              onSubmit={(values, { resetForm }) => {
                const data = {
                  rating: values.rating,
                  review_message: values.reviewmessage,
                };
                // setRatingReview(data);

                dispatch(
                  addRatingRequest({
                    data,
                    purchaseId,
                  })
                );
                resetForm();
                setOpen(!open);
              }}
            >
              {({ values, setFieldValue, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mt-3">
                    <Rating
                      name="hover-feedback"
                      value={values.rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setFieldValue("rating", newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      size="large"
                    />

                    {errors.rating ? (
                      <p className="text-red-600 text-sm !leading-none pb-0">
                        {errors.rating}
                      </p>
                    ) : null}
                    {/* {ratingstar == 0 ? (
                      <p className="text-red-600 text-sm !leading-none pb-0.5">
                        Star value is required*
                      </p>
                    ) : null} */}
                    {/* <a className="text-sm text-theme font-bold tracking-wider">Edit Rating</a>  */}
                  </div>
                  <div className=" mt-2">
                    <label className="text-sm text-gray-800 font-bold tracking-wide">
                      Message <span className="text-red-900">*</span>
                    </label>
                    <textarea
                      value={values.reviewmessage}
                      onChange={(e) => {
                        setFieldValue("reviewmessage", e?.target?.value);
                      }}
                      className="border border-black/30 rounded w-full max-h-[400px] focus:outline-none p-2 mt-2"
                      name="reviewmessage"
                      id=""
                      cols="30"
                      rows="2"
                    ></textarea>
                    {errors.reviewmessage ? (
                      <p className="text-red-600 text-sm !leading-none pb-0.5">
                        {errors.reviewmessage}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center  gap-3 pt-4">
                    <button
                      type="submit"
                      className="lg:text-sm    sm:text-xs text-sm text-white  border-theme hover:border-dark-theme hover:bg-dark-theme transition-all border-2 rounded w-full lg:py-2 py-1.5 px-5 bg-theme font-semibold tracking-wider"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      className="lg:text-sm    sm:text-xs text-sm text-theme hover:text-dark-theme hover:border-dark-theme border-theme hover:bg-theme-light transition-all border-2 rounded w-full lg:py-2 py-1.5 px-5 font-semibold tracking-wider"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRatingMdl;
