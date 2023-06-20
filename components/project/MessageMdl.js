import { ErrorMessage, Form, Formik } from "formik";
import classNames from "classnames";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendMessageToOwnerRequest } from "@/store/project/actions";

const MessageMdl = ({ open, setOpen, ownerId }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={`message ${open ? "show-modal" : ""}`} onClose={setOpen}>
        <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[650px] bg-white rounded sm:p-5 p-2.5">
          <div className="w-full">
            <a className="text-end close-btn cursor-pointer block">
              <HiXMark
                className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
                onClick={() => setOpen(!open)}
              />
            </a>
            <h2 className=" md:text-xl text-lg font-semibold tracking-wider text-gray-900">
              Send a Private Message
            </h2>
            <Formik
              // form field validation
              enableReinitialize={true}
              initialValues={{
                subject: "",
                message: "",
              }}
              validationSchema={Yup.object().shape({
                subject: Yup.string().required().label("Subject"),
                message: Yup.string().required().label("Message"),
              })}
              // form submit event
              onSubmit={(values) => {
                const data = {
                  ownerId: ownerId,
                  subject: values.subject,
                  message: values.message,
                };
                dispatch(
                  sendMessageToOwnerRequest({
                    data,
                  })
                );
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <Form
                  className="lg:space-y-4 sm:space-y-3 space-y-2 lg:pt-5 md:pt-3.5 pt-2"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-0.5">
                    <label
                      htmlFor=""
                      className="text-sm text-gray-800 font-semibold tracking-wider"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      value={values.subject}
                      name="subject"
                      onChange={handleChange}
                      className={classNames(
                        "focus:outline-none px-2 py-1.5 border border-black/50 rounded w-full",
                        {
                          "is-invalid": errors.subject,
                        }
                      )}
                    />

                    <ErrorMessage
                      className="invalid-feedback"
                      name="subject"
                      component="p"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label
                      htmlFor=""
                      className="text-sm  text-gray-800 font-semibold tracking-wider"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id=""
                      cols="30"
                      rows="5"
                      onChange={handleChange}
                      className={classNames(
                        "focus:outline-none max-h-[350px] px-2 py-1.5 border border-black/50 rounded w-full",
                        {
                          "is-invalid": errors.message,
                        }
                      )}
                    ></textarea>
                    <ErrorMessage
                      className="invalid-feedback"
                      name="message"
                      component="p"
                    />
                  </div>
                  <button className="text-white bg-theme border-2 border-theme rounded-sm font-semibold tracking-wider hover:bg-dark-theme hover:border-dark-theme transition-all text-sm py-1 xs:px-7 px-5">
                    Send Message
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageMdl;
