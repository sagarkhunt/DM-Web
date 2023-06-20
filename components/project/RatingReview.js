import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "./Comments";
import FAQs from "./FAQs";
import FAQsMdl from "./FAQsMdl";
import Reviews from "./Reviews";
import { commentListRequest } from "@/store/project/actions";

const RatingReview = ({ projectId }) => {

  const [open, setOpen] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  const dispatch = useDispatch();

  const [tabindex, setTabIndex] = useState(0);
  const tabHandler = (index) => {
    setTabIndex(index);
  };

  const { projectDetailsData, commentListData } = useSelector((store) => ({
    projectDetailsData: store?.project?.projectDetailsData,
    commentListData: store?.project?.commentListData,
  }))


  return (
    <>
      <section className="py-14 review">
        <div className="container xl:px-24 px-4 mx-auto">
          {/* <button className="bg-gray-1000 mb-4 text-white font-semibold tracking-wider py-2 px-4 text-sm rounded-sm">
            Report this Product
          </button> */}
          <div className="py-1.5 border-b flex flex-wrap items-center justify-between">
            <div className="font-semibold profile flex lg:text-base text-sm items-center sm:gap-10 gap-5  tracking-wide">
              <button
                className={`${tabindex === 0 ? "active" : ""
                  } text-gray-900 links`}
                onClick={() => tabHandler(0)}
              >
                Review ({projectDetailsData?.total_review})
              </button>
              <button
                className={`${tabindex === 1 ? "active" : ""
                  } text-gray-900 links`}
                onClick={() => tabHandler(1)}
              >
                Comments ({commentListData?.totalResults || projectDetailsData?.total_comments})
              </button>
              {/* <button
                className={`${
                  tabindex === 2 ? "active" : ""
                } text-gray-900 links`}
                onClick={() => tabHandler(2)}
              >
                FAQs
              </button> */}
            </div>
            <div>
              <p className="lg:text-base text-sm sm:block hidden">
                Need Help?&nbsp;
                <button
                  className="text-theme cursor-pointer hover:text-dark-theme font-medium"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  Contact Support
                </button>
              </p>
            </div>
          </div>
          <div className="py-9 w-full max-w-[800px]">
            {tabindex === 0 ? (
              <>
                <Reviews projectId={projectId} />
              </>
            ) : tabindex === 1 ? (
              <>
                <Comments projectId={projectId} setTotalComment={setTotalComment} />
              </>
            ) : (
              <>
                <FAQs />
                {/* <div className="content text-gray-900 " id="faqs">
                  <p className="text-sm font-bold tracking-wider ">
                    Frequently Asked Questions
                  </p>
                  <h3 className="font-semibold lg:text-base xs:text-sm text-xs tracking-wider pt-4">
                    How do I contact support?
                  </h3>
                  <p className="pt-1 lg:text-base xs:text-sm text-xs">
                    If you need help, please use the "Contact Support" button on
                    this page. For specific product-related questions,
                    contacting the Shop Owner directly is recommended. You can
                    also send a message to the Shop Owner directly from their
                    shop profile. For anything else (licensing, billing, etc),
                    please visit our Help Center.
                  </p>
                  <h3 className="font-semibold  lg:text-base xs:text-sm text-xs tracking-wider pt-4">
                    How can I unzip product files?
                  </h3>
                  <p className="pt-2 lg:text-base xs:text-sm text-xs">
                    <span>PC:</span> To extract a single file or folder,
                    double-click the compressed folder to open it. Then, drag
                    the file or folder from the compressed folder to a new
                    location. To extract the entire contents of the compressed
                    folder, right-click the folder, click Extract All, and then
                    follow the instructions.
                  </p>
                  <p className="py-4 lg:text-base xs:text-sm text-xs">
                    <span>Mac:</span> Double click the .zip file, then search
                    for the product folder or product file.
                  </p>
                  <p className="lg:text-base xs:text-sm text-xs">
                    If you continue to have trouble, check out this help file
                    for more tips.
                  </p>
                </div> */}
              </>
            )}
          </div>
        </div>
      </section>
      <FAQsMdl open={open} setOpen={setOpen} />
    </>
  );
};

export default RatingReview;
