import {
  addCommentRequest,
  commentListRequest,
  deleteCommentRequest,
  editCommentRequest,
} from "@/store/project/actions";
import { weekDayFormate } from "@/utils/dateMixin";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Comments = ({ projectId }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState(null);
  const [commentsId, setCommentsId] = useState(null);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(4);
  const [open, setOpen] = useState();
  const isAuthentication =
    typeof window !== "undefined" && localStorage.getItem("isAuthentication");
  const {
    commentListRecord,
    addCommentData,
    editCommentData,
    deleteCommentData,
  } = useSelector((store) => ({
    commentListRecord: store?.project?.commentListData,
    addCommentData: store?.project?.addCommentData,
    editCommentData: store?.project?.editCommentData,
    deleteCommentData: store?.project?.deleteCommentData,
  }));

  const toggleReadMore = (prev) => {
    setShowMore((prev) =>
      prev < commentListRecord?.results?.length ? prev + 3 : 4
    );
    // setShowMore(prev => prev < reviewsListData?.results?.length ? (prev + 3 ): (prev -3 ? (showMore > 3 ? (prev-3) : (2)): 3) )
  };

  const togglecomment = (e, commentId, index) => {
    setCommentsId(commentId);
    // commentId ? setOpen(true) : null
  };
  /**
   * comment delete
   */
  const deleteComment = async (e, commentId) => {
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
        text: "You want to delete this comment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#088178",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCommentRequest({ commentId }));
        }
      });
  };
  /* comment list api */
  useEffect(() => {

    // if (projectId) {
    dispatch(
      commentListRequest({
        params: {
          page: page,
          projectId: projectId,
        },
        projectId,
      })
    );
    // }
  }, [projectId, addCommentData, editCommentData, deleteCommentData]);

  return (
    <div className="content">
      {isAuthentication ? (
        <div className="bg-[#d9d9d7]/40 border-gray-600/20 border rounded xl:p-10 sm:p-7 p-5">
          <Formik
            initialValues={{
              comments: "",
              // notification: false,
            }}
            validationSchema={Yup.object().shape({
              comments: Yup.string()
                .required("comment is required")
                .matches("^\\S", {
                  message: "Please remove extra space.",
                })
                .min(3, "comments must be contain atleast 3 character")
                .max(1000, "comments can't be more than 1000 character"),
            })}
            onSubmit={(values, { resetForm }) => {
              const data = {
                comment: values.comments,
                // notification: values.notification,
              };
              setComments(data);
              dispatch(
                addCommentRequest({
                  data,
                  projectId,
                })
              );

              resetForm();
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              setFieldValue,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <textarea
                  className="border-gray-600/30 p-2 border rounded bg-white w-full resize-none focus:outline-none "
                  name="comments"
                  value={values.comments}
                  onChange={(e) => {
                    setCount(e?.target?.value?.length);
                    setFieldValue("comments", e?.target?.value);
                  }}
                  cols="30"
                  rows="6"
                ></textarea>
                {errors.comments ? (
                  <p className="text-red-600 text-sm !leading-none pb-0.5">
                    {errors.comments}*
                  </p>
                ) : null}
                <p className="text-gray-900 xl:text-base text-sm">
                  {count}/1000
                </p>
                <div className="pt-5 flex flex-wrap xs:flex-nowrap items-center justify-between">
                  <button
                    onClick={() => {
                      setCount(0)
                    }}
                    type="submit"
                    className="bg-theme  transition-all hover:bg-dark-theme rounded lg:px-5 sm:px-4 px-3 lg:py-2.5 py-2 text-white font-bold  tracking-wider sm:text-sm text-xs"
                  >
                    Post a Comment
                  </button>
                  {/* <label className="flex  items-start  sm:text-start  gap-2    xl:text-base sm:text-sm text-xs checkbox text-gray-900">
                  <input
                    type="checkbox"
                    className="appearance-none"
                    value={values.notification}
                    name="notification"
                    onChange={handleChange}
                    id="business-coach"
                  />
                  <span className="checkmark"></span>
                  <p className="pt-1 xl:pt-0">Receive comment notifications</p>
                </label> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>You must be signed in to post a comment.</div>
      )}
      <div>
        <div className="xl:pt-10 pt-6 space-y-5">
          {commentListRecord?.results?.length > 0 ? (
            <>
              {commentListRecord?.results?.slice(0, showMore)?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex  lg:gap-5 gap-3.5 ">
                      <div className="xl:w-12 w-10 xl:h-12 h-10">
                        <img
                          src={item?.user?.profile_image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 xl:text-base text-sm font-bold tracking-wider">
                          {item?.user?.name}
                        </p>
                      </div>
                      <div className="flex  xl:gap-4 md:gap-3 gap-2">
                        <div className="bg-[#949291] w-0.5 mt-2 h-0.5 rounded-full"></div>
                        <p className="text-gray-800 xl:text-sm text-xs font-semibold tracking-wider">
                          {weekDayFormate(item?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-900 xl:pt-1 pt-2 xl:opentext-base text-sm">
                      {item?.comment}
                    </p>
                    {item.is_own ? (
                      <>
                        <div className="flex items-center gap-4 text-gray-400 text-sm mt-1.5">
                          <button
                            onClick={(e) => {
                              setOpen(index);
                              togglecomment(e, item?._id, index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              setOpen(false);
                              deleteComment(e, item?._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        <div
                          className={`${open === index ? "block" : "hidden"}`}
                        >
                          <Formik
                            enableReinitialize
                            initialValues={{
                              comment: item?.comment || values.comment,
                            }}
                            validationSchema={Yup.object().shape({
                              comment: Yup.string()
                                .required("comment is required")
                                .matches("^\\S", {
                                  message: "Please remove extra space.",
                                })
                                .min(
                                  3,
                                  "comments must be contain atleast 3 character"
                                )
                                .max(
                                  1000,
                                  "comments can't be more than 1000 character"
                                ),
                            })}
                            onSubmit={(values, { resetForm }) => {
                              const data = {
                                comment: values.comment,
                              };
                              dispatch(
                                editCommentRequest({
                                  commentsId,
                                  data,
                                })
                              );
                              resetForm();
                              setOpen(!open);
                            }}
                          >
                            {({
                              handleChange,
                              values,
                              handleSubmit,
                              errors,
                            }) => (
                              <Form onSubmit={handleSubmit}>
                                <textarea
                                  className="w-full text-gray-800 p-3 resize-none border  border-black/30  rounded-sm h-24 overflow-y-auto focus:outline-none  "
                                  onChange={handleChange}
                                  id=""
                                  name="comment"
                                  value={values?.comment}
                                  col={10}
                                  row={8}
                                ></textarea>
                                {errors.comment ? (
                                  <p className="text-red-600 text-sm !leading-none pb-0.5">
                                    {errors.comment}*
                                  </p>
                                ) : null}
                                <div className="flex gap-3 pt-2">
                                  <button
                                    type="submit"
                                    className="bg-theme px-7 py-2 border-2 border-theme y-2 text-white hover:bg-dark-theme transition-all  font-semibold tracking-wide rounded"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="reset"
                                    className="bg-theme-light  px-7 border-2 hover:border-dark-theme transition-all hover:text-dark-theme border-theme  py-2 text-theme font-semibold tracking-wide rounded"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              {commentListRecord?.results?.length > 4 ? (
                <a
                  onClick={() => {
                    toggleReadMore();
                  }}
                  className="text-theme pt-5 cursor-pointer block font-bold tracking-wide hover:text-dark-theme transition-all "
                >
                  Show&nbsp;
                  {showMore < commentListRecord?.results?.length
                    ? "More"
                    : "Less"}
                </a>
              ) : (
                " "
              )}
              {/* {showMore <= 4 ? null : (
                <a
                  onClick={() => {
                    toggleReadMore();
                  }}
                  className="text-theme pt-5 cursor-pointer block font-bold tracking-wide hover:text-dark-theme transition-all "
                >
                  Show&nbsp;
                  {showMore > commentListRecord?.results?.length
                    ? "More"
                    : "Less"}
                </a>
              )} */}
            </>
          ) : (
            <div className="text-theme text-center pt-4 font-bold text-lg">No comment found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
