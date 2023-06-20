import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import {
  HiXMark,
  HiOutlineDocumentText,
  HiOutlineFolder,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { filePreviewRequest } from "@/store/project/actions";
import { CircularProgress } from "@mui/material";

const FilePreviewMdl = ({ open, setFilePreview, projectId }) => {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const { isLoading, filePreviewList } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    filePreviewList: store?.project?.listFilePreviewData,
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  /* collection list api */
  useEffect(() => {
    if (open && projectId) {
      dispatch(
        filePreviewRequest({
          projectId,
        })
      );
    }
  }, [open, projectId]);

  return (
    <div>
      <Modal open={open} handleModal={() => setFilePreview(!open)}>
        <div className="modal-content relative xl:w-[800px] lg:w-[750px] md:w-[600px] sm:w-[500px] xs:w-[360px] w-[320px] max-h-[90vh] overflow-y-auto bg-white rounded sm:py-5 xl:px-12 md:p-5 p-2.5">
          <div className="w-full ">
            <a className="close-btn   cursor-pointer  py-2 ">
              <HiXMark
                className="text-2xl ml-auto text-gray-800 font-bold"
                onClick={() => setFilePreview(!open)}
              />
            </a>
            <h2 className=" lg:text-3xl sm:text-2xl text-xl font-semibold tracking-wider text-gray-800  pb-6">
              Explore Product
            </h2>
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress size={35} color="success" />
              </div>
            ) : (
              <>
                {filePreviewList?.fileCount?.length ? (
                  <div
                    style={{
                      display: 'grid', gridTemplateColumns: `repeat(
                        ${windowWidth > 1140
                        ? ` ${filePreviewList?.fileCount?.length >= 5
                          ? 5
                          : filePreviewList?.fileCount?.length
                        }`
                        : ` ${filePreviewList?.fileCount?.length >= 3
                          ? 3
                          : filePreviewList?.fileCount?.length
                        }`
                        }
                        , minmax(0, 100%))`
                    }}
                    className={`  
                     border border-black/50 rounded-md overflow-hidden`}
                  >
                    {filePreviewList?.fileCount?.map((item, index) => {
                      return (
                        <>
                          <div
                            className=" sm:text-xl text-lg text-center sm:p-3 p-2 border"
                            key={index}
                          >
                            <p className="text-gray-800 xl:pb-0.5">
                              {item?.count}
                            </p>
                            <p className="text-gray-800 lg:text-lg xs:text-base text-sm break-words uppercase font-bold tracking-wider !leading-none">
                              {item?.ext}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : null}

                {filePreviewList?.folderStructure?.length ? (
                  <div className="xl:mt-7 mt-5 rounded-md border border-black/50 xl:p-6 sm:p-4 p-2.5 h-[380px] overflow-y-auto text-gray-800 xl:text-2xl sm:text-xl text-lg">
                    {filePreviewList?.folderStructure?.map((item, index) => {
                      return (
                        <>
                          {item?.type == "folder" ? (
                            <>
                              <h2
                                key={index}
                                className="font-semibold flex items-center gap-2"
                              >
                                <HiOutlineFolder className="text-2xl font-bold" />
                                {item?.name}
                              </h2>
                              {item?.children?.length ? (
                                <div className="xl:px-5 sm:px-3.5 px-3 sm:py-1.5 py-1 order-first">
                                  {item?.children?.map(
                                    (itemchildren, index) => {
                                      return (
                                        <>
                                          {itemchildren?.type == "folder" ? (
                                            <>
                                              <h2
                                                key={index}
                                                className="font-semibold flex items-center gap-2"
                                              >
                                                <HiOutlineFolder className="text-2xl font-bold" />
                                                {itemchildren?.name}
                                              </h2>
                                              {itemchildren?.children
                                                ?.length ? (
                                                <div className="xl:px-5 px-3.5  sm:py-1.5 py-1">
                                                  {itemchildren?.children?.map(
                                                    (
                                                      itemsuperchildren,
                                                      index
                                                    ) => {
                                                      return (
                                                        <>
                                                          {itemsuperchildren?.type ==
                                                            "folder" ? (
                                                            <>
                                                              <h2
                                                                key={index}
                                                                className="font-semibold flex items-center gap-2"
                                                              >
                                                                <HiOutlineFolder className="text-2xl font-bold" />
                                                                {
                                                                  itemsuperchildren?.name
                                                                }
                                                              </h2>
                                                              {itemsuperchildren
                                                                ?.children
                                                                ?.length ? (
                                                                <div className="px-3.5 py-1">
                                                                  {itemsuperchildren?.children?.map(
                                                                    (
                                                                      itemsubchildren,
                                                                      index
                                                                    ) => {
                                                                      return (
                                                                        <>
                                                                          {itemsubchildren?.type ==
                                                                            "folder" ? (
                                                                            <h2
                                                                              key={index}
                                                                              className="font-semibold flex items-center gap-2"
                                                                            >
                                                                              <HiOutlineFolder className="text-2xl font-bold" />
                                                                              {
                                                                                itemsubchildren?.name
                                                                              }
                                                                            </h2>
                                                                          ) : (
                                                                            <h2
                                                                              key={
                                                                                index
                                                                              }
                                                                              className="flex items-center gap-1 xs:text-xl text-lg"
                                                                            >
                                                                              <HiOutlineDocumentText className="w-6 min-w-[24px]" />
                                                                              {
                                                                                itemsubchildren?.name
                                                                              }
                                                                            </h2>
                                                                          )}
                                                                        </>
                                                                      );
                                                                    }
                                                                  )}
                                                                </div>
                                                              ) : null}
                                                            </>
                                                          ) : (
                                                            <>
                                                              <h2
                                                                className="flex items-center gap-1 xs:text-xl text-lg"
                                                                key={index}
                                                              >
                                                                {" "}
                                                                <HiOutlineDocumentText className="w-6 min-w-[24px]" />
                                                                {
                                                                  itemsuperchildren?.name
                                                                }
                                                              </h2>
                                                            </>
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              ) : null}
                                            </>
                                          ) : (
                                            <>
                                              <h2
                                                className="flex items-center gap-1 xs:text-xl text-lg"
                                                key={index}
                                              >
                                                {" "}
                                                <HiOutlineDocumentText className="w-6 min-w-[24px]" />
                                                {itemchildren?.name}
                                              </h2>
                                            </>
                                          )}
                                        </>
                                      );
                                    }
                                  )}
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <h2
                                className="flex items-center gap-1"
                                key={index}
                              >
                                {" "}
                                <HiOutlineDocumentText className="w-7 min-w-[28px]" />
                                {item?.name}
                              </h2>
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                ) : null}
                <div className="text-end pt-5">
                  <button
                    type="button"
                    className=" sm:text-base text-sm close-btn rounded  hover:bg-theme-light px-10 lg:py-2 py-1.5 font-semibold tracking-wider text-theme border-2 border-theme hover:text-dark-theme hover:border-dark-theme transition-all"
                    id="btn-close"
                    onClick={() => setFilePreview(!open)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FilePreviewMdl;
