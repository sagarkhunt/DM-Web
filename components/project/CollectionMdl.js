import {
  addToCollectionRequest,
  createCollectionRequest,
  listCollectionRequest,
} from "@/store/collection/actions";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import ThemeSwitch from "../common/ThemeSwitch";

const CollectionMdl = ({ open, setOpen, projectId, pageName, params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [error, setError] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  /* Create Collection */
  const createCollection = () => {
    if (collectionName) {
      dispatch(
        createCollectionRequest({
          collection_name: collectionName,
          isPublic: isPublic,
          projectId: projectId,
          pageType: pageName,
          params,
        })
      );
    } else {
      setError(true);
    }
  };

  /* Get responses of api call */
  const {
    collectionListData,
    collectionCreateData,
    collectionAddData,
    isLoading,
  } = useSelector((store) => ({
    collectionListData: store?.collection?.collectionListData,
    isLoading: store?.collection?.loading,
    collectionCreateData: store?.collection?.collectionCreateData,
    collectionAddData: store?.collection?.collectionAddData,
  }));

  /* collection list api */
  useEffect(() => {
    if (open && collectionAddData) {
      setCollectionName("");
      setIsPublic(false);
      dispatch(listCollectionRequest({}));
    }
  }, [open, collectionAddData, collectionCreateData?.id]);

  const addToCollection = (id) => {
    if (id && projectId) {
      dispatch(
        addToCollectionRequest({
          id: id,
          projectId: projectId,
          pageType: pageName,
          params,
        })
      );
    }
  };

  // useEffect(() => {
  //   if (open) {
  //     dispatch(getProjectListRequest());
  //   }
  // }, [open]);

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
    <div>
      <Modal open={open} handleModal={() => setOpen(!open)}>
        {/* <div
        className={`collection ${open ? "show-modal" : ""}`}
        // onClose={setOpen}
      > */}
        <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[650px] bg-white rounded sm:p-5 p-2.5">
          <div className="w-full">
            <a className="close-btn cursor-pointer block">
              <HiXMark
                className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
                onClick={() => setOpen(!open)}
              />
            </a>
            <h2 className="text-center md:text-xl text-lg font-semibold tracking-wider text-gray-900">
              Save for Later
            </h2>
            <div
              className={`items-center xl:gap-5 gap-2 pt-2.5 xl:pb-5 pb-3 border-b ${toggle ? "hidden" : "sm:grid grid-cols-2"
                }`}
            >
              <button
                onClick={() => {
                  setToggle(!toggle);
                }}
                className="text-white hover:bg-dark-theme transition-all font-semibold xl:text-sm text-xs tracking-wider bg-theme px-2.5 py-1.5 rounded"
              >
                <i className="fa-solid fa-plus"></i> Create new Collection
              </button>
              <button
                onClick={() => {
                  router.push("/profile/account-profile?index=collection");
                }}
                className="text-theme hover:text-dark-theme transition-all font-semibold xl:text-sm text-xs tracking-wider px-2.5 mt-2 sm:mt-0 py-1.5"
              >
                View All Collections
              </button>
            </div>
            <div className={`pt-2 border-b ${toggle ? "" : "hidden"}`}>
              <div className="sm:text-sm text-xs flex items-end justify-between  font-semibold tracking-wide">
                <label className="" htmlFor="">
                  New Collection Name
                </label>
                <button
                  onClick={() => {
                    router.push("/profile/account-profile?index=collection");
                  }}
                  className="text-theme hover:text-dark-theme transition-all font-semibold xl:text-sm text-xs tracking-wider px-2.5 mt-2 sm:mt-0 py-1.5"
                >
                  View All Collections
                </button>
              </div>
              <input
                placeholder="Collection Name"
                type="text"
                value={collectionName}
                onChange={(e) => {
                  setError(false);
                  setCollectionName(e?.target?.value);
                }}
                className="focus:outline-none border border-black/60 py-1 px-3 mt-0.5 rounded w-full"
              />
              {error ? (
                <p className="text-red-500">Collection name is required</p>
              ) : (
                ""
              )}
              <div className="xl:py-2 py-1.5 flex flex-wrap justify-between items-center">
                <p className=" font-bold tracking-wide md:text-base text-sm">
                  <ThemeSwitch
                    checked={isPublic}
                    onChange={(e) => {
                      setIsPublic(e?.target?.checked);
                    }}
                  />
                  <i className="fa-solid fa-toggle-on"></i>Make collection
                  public
                </p>
                <div className="flex items-center gap-1 mt-2 xs:mt-0">
                  <button
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    className="text-theme font-bold tracking-wide  rounded  transition-all text-sm px-4 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      createCollection();
                    }}
                    className="text-white font-bold tracking-wide bg-theme rounded hover:bg-dark-theme transition-all text-sm px-4 py-1.5"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[370px] min-h-[370px] md:space-y-4 space-y-3 xl:py-5 py-3.5 overflow-y-auto">
              {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <CircularProgress size={35} color="success" />
                </div>
              ) : (
                <>
                  {collectionListData?.map((item, i) => {
                    {console.log(item,'=====')}
                    return (
                      <div
                      className="flex gap-3 items-center pr-8"
                      key={item?._id}
                      onClick={() => {
                        addToCollection(item?._id, projectId);
                      }}
                      >
                        <div className="xl:w-28 w-24 xl:h-20 h-16">
                          <img
                            className="w-full h-full object-cover"
                            src={item?.projectList[0]?.webp_banner_file}
                            alt=""
                          />
                        </div>
                        <div className="grow flex items-center justify-between cursor-pointer">
                          <p className="xl:text-base text-sm text-theme">
                            {item?.collection_name}
                          </p>
                          {item?.projectList.some(
                            (el) => el._id === projectId
                          ) ? (
                            <FaBookmark color="#088178" size={20} />
                          ) : (
                            <FaRegBookmark size={20} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="px-5 pt-5 ">
              <button
                type="button"
                className="w-full sm:text-base text-sm close-btn rounded  hover:bg-theme-light lg:py-2 py-1.5 font-semibold tracking-wider text-theme border-2 border-theme hover:text-dark-theme hover:border-dark-theme transition-all"
                id="btn-close"
                onClick={() => setOpen(!open)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Modal>
    </div>
  );
};

export default CollectionMdl;
