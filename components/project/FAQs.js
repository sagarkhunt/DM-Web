import React from "react";

const FAQs = () => {
  return (
    <div className="content text-gray-900 " id="faqs">
      <p className="text-sm font-bold tracking-wider ">
        Frequently Asked Questions
      </p>
      <h3 className="font-semibold lg:text-base xs:text-sm text-xs tracking-wider pt-4">
        How do I contact support?
      </h3>
      <p className="pt-1 lg:text-base xs:text-sm text-xs">
        If you need help, please use the "Contact Support" button on this page.
        For specific product-related questions, contacting the Shop Owner
        directly is recommended. You can also send a message to the Shop Owner
        directly from their shop profile. For anything else (licensing, billing,
        etc), please visit our Help Center.
      </p>
      <h3 className="font-semibold  lg:text-base xs:text-sm text-xs tracking-wider pt-4">
        How can I unzip product files?
      </h3>
      <p className="pt-2 lg:text-base xs:text-sm text-xs">
        <span>PC:</span> To extract a single file or folder, double-click the
        compressed folder to open it. Then, drag the file or folder from the
        compressed folder to a new location. To extract the entire contents of
        the compressed folder, right-click the folder, click Extract All, and
        then follow the instructions.
      </p>
      <p className="py-4 lg:text-base xs:text-sm text-xs">
        <span>Mac:</span> Double click the .zip file, then search for the
        product folder or product file.
      </p>
      <p className="lg:text-base xs:text-sm text-xs">
        If you continue to have trouble, check out this help file for more tips.
      </p>
    </div>
  );
};

export default FAQs;
