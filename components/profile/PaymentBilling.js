import React from "react";
import { FaStar } from "react-icons/fa";

const PaymentBilling = () => {
  return (
    <>
      <div className="border rounded-md lg:p-7 sm:p-5 p-3 max-w-[1000px]">
        <h2 className="lg:text-2xl sm:text-xl text-lg text-gray-900 font-semibold  tracking-wider">
          Payment Methods
        </h2>
        <div className="sm:w-32 w-28 sm:h-28 h-24 mx-auto my-4">
          <img
            className="w-full h-full mx-auto object-cover"
            src="/assets/images/payment-card.png"
            alt=""
          />
        </div>
        <h3 className="lg:text-lg xs:text-base text-sm font-semibold text-gray-900 tracking-wider text-center">
          You have no cards saved!
        </h3>
        <p className="text-gray-900 lg:text-base xs:text-sm text-xs text-center">
          Add a payment method below for a speedy checkout.
        </p>
        <div className="bg-gray-200 rounded lg:py-8 py-6 sm:px-5 px-3 flex  flex-wrap items-center lg:justify-between gap-5 my-6">
          <div className="flex items-center  md:gap-5 gap-1.5 ">
            {/* <i className="fa-solid fa-star xs:text-base text-sm text-theme"></i> */}
            <span className="xs:text-base text-sm text-theme">
              <FaStar />
            </span>
            <div className="border rounded border-black/60  overflow-hidden flex bg-white items-center lg:gap-2 gap-1">
              <input
                type="text"
                className="lg:w-56 sm:w-48 xs:w-32 w-24 lg:text-base xs:text-sm text-xs focus:outline-none lg:py-1.5 py-1 sm:px-3 px-1.5"
                placeholder="Card Number"
              />
              <input
                type="text"
                className="lg:w-28 xs:w-20 w-14  lg:text-base xs:text-sm text-xs focus:outline-none lg:py-1.5 py-1 sm:px-3 px-1.5"
                placeholder="MM/YY"
              />
              <input
                type="text"
                className="lg:w-28 sm:w-20 w-14   lg:text-base xs:text-sm text-xs focus:outline-none lg:py-1.5 py-1 sm:px-3 px-1.5"
                placeholder="CVV"
              />
            </div>
          </div>
          <div>
            <button className="bg-[#e2e9ee] lg:text-sm text-xs rounded  flex items-center gap-1 px-5 py-3 transition-all hover:bg-[#eef0ef] text-slate-400 font-semibold tracking-wider">
              <i className="fa-solid fa-plus text-slate-400"></i>Add New Card
            </button>
          </div>
        </div>
      </div>
      <div className="border rounded-md lg:p-7 sm:p-5 p-3 max-w-[1000px] md:mt-8 mt-5">
        <h2 className="text-gray-900 font-semibold tracking-wider lg:text-2xl sm:text-xl text-lg">
          Billing Info
        </h2>
        <p className="text-gray-900 pt-2.5 lg:text-base sm:text-sm text-xs">
          Entering billing information will help us accurately estimate sales
          tax on your purchases.
        </p>
        <a
          href=""
          className="text-theme lg:text-base sm:text-sm text-xs hover:text-dark-theme transition-all font-semibold tracking-wider"
        >
          Learn more about sales tax
        </a>
        <div className="sm:w-96 xs:w-80 w-full">
          <div className="md:space-y-1 space-y-0.5 py-3.5 ">
            <label
              className="sm:text-sm text-xs  text-gray-900 font-bold tracking-wider"
              htmlFor=""
            >
              Country of Residence
            </label>
            <select
              className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border border-[#899298] bg-[#efefef] focus:outline-none w-full rounded"
              name=""
              id=""
            >
              <option value="">--select a country--</option>
              <option value="">Afghanistan</option>
              <option value="">Afghanistan</option>
              <option value="">Afghanistan</option>
              <option value="">Afghanistan</option>
              <option value="">Afghanistan</option>
              <option value="">Afghanistan</option>
            </select>
          </div>
          <div className="md:space-y-1 space-y-0.5 py-3.5 ">
            <div className="flex items-center justify-between">
              <label
                className="sm:text-sm text-xs text-gray-900 font-bold tracking-wider"
                htmlFor=""
              >
                Tax ID Number (ABN, VATIN, etc.)
              </label>
              <p className="text-slate-400 sm:text-sm text-xs">Optional</p>
            </div>
            <input
              type="text"
              className="px-3 lg:py-2 py-1.5 lg:text-base text-sm border text-slate-500 placeholder:text-slate-400  border-[#899298] bg-white-300 focus:outline-none w-full rounded"
              placeholder="Enter  Tax ID Number"
            />
            <a
              href=""
              className="lg:text-base sm:text-sm text-xs text-theme text-end font-semibold tracking-wider lg:py-3.5 py-2.5 block"
            >
              + Add Entity Name and Address
            </a>
          </div>
          <button className="bg-[#e2e9ee] w-full lg:text-base xs:text-sm text-xs rounded gap-1 px-5 sm:py-3.5 py-2.5  transition-all hover:bg-[#eef0ef] text-slate-400 font-semibold tracking-wider">
            Confirm Billing Info
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentBilling;
