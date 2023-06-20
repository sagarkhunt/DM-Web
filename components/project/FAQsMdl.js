import { Form, Formik } from "formik";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import Modal from "../common/Modal";

const FAQsMdl = ({ open, setOpen }) => {
  return (
    <>
      <div>
        {/* <div className={`faqs ${open ? "show-modal" : ""}`}> */}
        <Modal open={open} handleModal={() => setOpen(!open)}>
          <div className="modal-content xl:w-[650px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[650px] bg-white rounded sm:p-5 xs:p-3.5 p-3">
            <div className="w-full">
              <a className="text-end close-btn cursor-pointer block">
                <HiXMark
                  className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
                  onClick={() => setOpen(!open)}
                />
              </a>
              <h2 className="xl:text-2xl md:text-xl text-lg font-semibold tracking-wider py-2 text-gray-900">
                Ask a question
              </h2>
              <p className="text-gray-400 text-sm xl:pt-3 pb-1">
                Select the type of question you'd like to ask below so we can
                better help you. You can also review our license FAQ and our
                refund policy.
              </p>
            </div>
            <Formik>
              <Form className="space-y-2">
                <select className="w-full focus:outline-none text-sm py-1.5 rounded text-gray-600 bg-transparent">
                  <option>Ask our support team a license question.</option>
                  <option>Ask our support team a license question.</option>
                  <option>Ask our support team a license question.</option>
                  <option>Ask our support team a license question.</option>
                  <option>Ask our support team a license question.</option>
                  <option>Ask our support team a license question.</option>
                </select>
                <textarea className="overflow-auto focus:outline-none max-h-[350px] px-2 py-1.5 border border-black/50 rounded w-full"></textarea>
                <button
                  type="submit"
                  className="bg-[#e2e9ee] text-gray-600 lg:text-base text-sm lg:px-6 px-5 py-2 rounded mt-2 font-semibold tracking-wide"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </Modal>
        {/* </div> */}
      </div>
    </>
  );
};

export default FAQsMdl;
