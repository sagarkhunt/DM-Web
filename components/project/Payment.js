import { numberWithCommas } from "@/utils/numberWithCommas";
import { CircularProgress, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Payment = ({ projectDetailData, isLoading, setProjectId }) => {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const [downloadedBtn, setDownloadBtn] = useState(false);
  let [downloadText, setDownloadText] = useState(false);
  /**
   *
   * @param {downloadZip} projectId
   */
  const downloadZip = async (projectId) => {
    setDownloading(true);
    const url = `${process.env.DESIGNER_MARKETPLACE_API_URL}/projects/download/${projectId}`;
    const authToken =
      typeof window !== "undefined" && localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // extract body as Blob
        } else if (response?.status === 401) {
          router.push("/auth/login");
        } else {
          setDownloading(false);
          setDownloadBtn(true);
          throw new Error("Network response was not ok.");
        }
      })
      .then(async (data) => {
        if (data?.data) {
          const link = document.createElement("a");
          link.href = data?.data;
          link.setAttribute("download", "Test.zip");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
        setDownloading(false);
        setDownloadBtn(true);
      })

      .catch((error) => {
        setDownloading(false);
        setDownloadBtn(true);
      });
  };

  useEffect(() => {
    if (projectDetailData) {
      setDownloadText(projectDetailData?.downloaded);
    }
  }, [projectDetailData]);

  useEffect(() => {
    if (downloadedBtn) {
      setDownloadText(true);
      setDownloadBtn(false);
    }
  }, [downloadedBtn]);

  const uid = typeof window !== "undefined" && localStorage.getItem("userID");

  return (
    <>
      <div className="lg:space-y-5 space-y-3">
        <div className="xl:p-6 lg:p-4 md:p-3 p-5 border rounded-md">
          <div className="flex items-center lg:text-base text-sm tracking-wide font-semibold justify-between text-gray-900">
            <p>Price</p>
            <p>${numberWithCommas(projectDetailData?.price)} USD</p>
          </div>

          <div className="flex items-center space-y-1.5 lg:text-base text-sm tracking-wide font-semibold justify-between text-gray-900">
            <p>Project Type</p>
            <p>{projectDetailData?.price_type}</p>
          </div>
          {projectDetailData?.price_type === "free" ||
          projectDetailData?.is_purchased ||
          projectDetailData?.created_by?._id === uid ? (
            <button
              onClick={() => {
                downloadZip(projectDetailData?._id);
              }}
              type="button"
              className="border-2 rounded-md hover:bg-dark-theme mt-1.5 transition-all hover:border-dark-theme bg-theme tracking-wider 2xl:text-lg lg:text-base text-sm border-theme text-white py-2 w-full font-semibold "
            >
              {downloading && <CircularProgress size={15} color="inherit" />}
              {downloadText ? "Download Again" : "Download"}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setProjectId(projectDetailData?._id);
                }}
                className="border-2 rounded-md  tracking-wider 2xl:text-lg lg:text-base text-sm hover:bg-theme-light transition-all border-theme text-theme py-2 w-full font-semibold my-2"
                disabled={projectDetailData?.is_cart ? true : false}
              >
                {isLoading ? (
                  <CircularProgress size={15} color="success" />
                ) : projectDetailData?.is_cart ? (
                  "Added to Cart"
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                onClick={() => {
                  if (localStorage.getItem("access")) {
                    router.push(
                      `/cart/checkout?projectId=${projectDetailData?._id}`
                    );
                  } else {
                    router.push("/auth/login");
                  }
                }}
                className="border-2 rounded-md hover:bg-dark-theme  transition-all hover:border-dark-theme bg-theme tracking-wider 2xl:text-lg lg:text-base text-sm border-theme text-white py-2 w-full font-semibold "
              >
                Buy Now
              </button>
            </>
          )}
          <div className="lg:pt-6 pt-4">
            <div className="flex items-center lg:text-base text-sm justify-between text-gray-900">
              <p className="font-semibold">
                License
                <a href="">
                  <i className="fa-solid fa-circle-question px-1.5 text-gray-600 lg:text-sm text-xs"></i>
                </a>
              </p>
              <p>Personal license</p>
            </div>
            <div className=" lg:pt-4 pt-3">
              <label className="radio-btn flex gap-4 text-start relative cursor-pointer lg:pb-4 pb-2.5">
                <div className="text-gray-900 lg:text-sm text-xs gap-2 2xl:pl-0 pl-2 flex items-center justify-between w-full">
                  <p>Personal</p>
                  <p className="font-semibold">
                    ${numberWithCommas(projectDetailData?.price)} USD
                  </p>
                </div>
              </label>
            </div>
            <div className="flex gap-7 items-center justify-between text-gray-900 pt-1">
              <p className="font-semibold 2xl:text-base text-sm tracking-wider">
                Reviews
              </p>
              <div className="flex items-center flex-wrap justify-end gap-1">
                <div className="flex items-center gap-0.5 text-yellow-500 lg:text-sm text-xs">
                  {projectDetailData && projectDetailData?.total_avg_rating ? (
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      value={projectDetailData?.total_avg_rating}
                      readOnly
                      size="small"
                    />
                  ) : (
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      value={0}
                      readOnly
                      size="small"
                    />
                  )}
                </div>
                <p className="lg:text-sm text-xs">
                  {projectDetailData?.total_review} Reviews
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-900 lg:pt-2.5 pt-1.5">
              <p className="font-semibold 2xl:text-base lg:text-sm text-xs tracking-wider">
                Categories
              </p>
              <p className="lg:text-sm text-xs">
                {projectDetailData?.category?.category_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
