import React from "react";

const EmailPreferences = () => {
  return (
    <div>
      <p className="text-gray-900 md:text-base text-sm">
        Please note, it may take up to 24 hours for your subscription
        preferences to take effect.
      </p>

      <div className="border rounded-md lg:p-7 sm:p-5 p-3 max-w-[1000px] md:mt-6 mt-4">
        <div className="sm:flex flex-wrap items-center justify-between">
          <h2 className="text-gray-900 font-semibold tracking-wider lg:text-2xl sm:text-xl text-lg">
            Notifications
          </h2>
          <div className="flex items-center justify-end mt-2 sm:mt-0  gap-1">
            <button className="lg:text-sm text-xs text-theme font-bold tracking-wider hover:text-dark-theme border-2 border-theme hover:border-dark-theme rounded hover:bg-theme-light transition-all lg:py-1.5 py-1 lg:px-3 px-2.5">
              Select All
            </button>
            <button className="lg:text-sm text-xs text-theme font-bold tracking-wider hover:text-dark-theme border-2 border-theme hover:border-dark-theme rounded hover:bg-theme-light transition-all lg:py-1.5 py-1 lg:px-3 px-2.5">
              Deselect All
            </button>
          </div>
        </div>
        <div className="space-y-2 py-5">
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>Someone follows you
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>Someone mentions you
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>Someone sends you a message
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>You have products to review
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>Products you've purchased are
            updated
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>You left products in your cart
          </label>
          <label className="flex items-start gap-2 text-slate-500 checkbox md:text-base text-sm">
            <input
              type="checkbox"
              className="appearance-none"
              name=""
              id="level"
            />
            <span className="checkmark"></span>Someone makes a purchase using
            your partner code
          </label>
        </div>
        <button className="bg-theme rounded  border lg:text-sm text-xs border-theme text-white  font-bold tracking-wider hover:bg-dark-theme hover:border-dark-theme transition-all lg:py-3 xs:py-2.5 py-2 lg:px-6 xs:px-4 px-3.5 mt-2">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default EmailPreferences;
