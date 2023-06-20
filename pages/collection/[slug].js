import Collections from "@/components/collection/Collections";
import List from "@/components/project/List";
import AppLayout from "@/layout";
import {
  cleartState,
  deleteCollectionRequest,
  getCollectionRequest,
  updateCollectionRequest,
} from "@/store/collection/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheck, FaChevronLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ThemeSwitch from "../../components/common/ThemeSwitch";

const index = () => {
  const dispatch = useDispatch();
  const [collectionData, setcollectionData] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  /* Get responses of api call */
  const {
    isLoading,
    userData,
    getCollectionData,
    collectionUpdateData,
    collectionDeleteData,
    collectionAddData,
    loadCollection,
    cartAddData,
  } = useSelector((store) => ({
    isLoading: store?.project?.loading,
    userData: store?.auth?.verifyTokenData,
    getCollectionData: store?.collection?.getCollectionData,
    loadCollection: store?.collection?.loading,
    collectionUpdateData: store?.collection?.collectionUpdateData,
    collectionDeleteData: store?.collection?.collectionDeleteData,
    collectionAddData: store?.collection?.collectionAddData,
    cartAddData: store?.cart?.cartAddData,
  }));
  /* set data of collection */
  useEffect(() => {
    setCollectionName(getCollectionData?.collection_name);
    setIsPublic(getCollectionData?.isPublic);
    setcollectionData(getCollectionData);
  }, [getCollectionData]);
  useEffect(() => {
    setCollectionName(getCollectionData?.collection_name);
    setIsPublic(getCollectionData?.isPublic);
    setcollectionData(collectionUpdateData);
  }, [collectionUpdateData]);

  /* redirect to collection list after delete */
  // useEffect(() => {
  //   if (Object.keys(collectionDeleteData).length) {
  //     dispatch(cleartState());
  //     router.push(`/profile/account-profile?index=collection`);
  //   }
  // }, [collectionDeleteData]);

  /* collection list api */
  useEffect(() => {
    if (router?.query?.slug || collectionUpdateData) {
      dispatch(getCollectionRequest({ collectionId: router?.query?.slug }));
    }
  }, [
    router?.query?.slug,
    collectionAddData,
    // collectionDeleteData,
    cartAddData,
    collectionUpdateData,
  ]);

  /* Update collection api call */
  const updateCollection = () => {
    dispatch(
      updateCollectionRequest({
        id: getCollectionData?._id,
        data: {
          collection_name: collectionName,
          isPublic: isPublic,
        },
      })
    );
    setIsEdit(false);
  };

  /* Delete collection api call */
  const deleteCollection = () => {
    Swal.fire({
      title: "Are you sure want to delete collection ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#088178",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteCollectionRequest({
            router,
            id: router?.query?.slug,
          })
        );
      }
    });
  };
  return (
    <AppLayout>
      <section className="pt-7">
        <div className="container xl:px-24 px-4 mx-auto">
          <div className="flex items-center justify-between">
            <a
              onClick={() =>
                router.push("/profile/account-profile?index=collection")
              }
              className="text-theme hover:text-dark-theme transition-all xl:text-base text-sm flex items-center gap-1 font-semibold cursor-pointer"
            >
              <FaChevronLeft />
              Back to Collection
            </a>
            {collectionData?.user === userData?._id && (
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  !collectionData ? "hidden" : ""
                }`}
                onClick={() => deleteCollection()}
              >
                <div className=" text-theme rounded-full transition hover:bg-theme-light border border-transparent flex items-center justify-center relative">
                  <FaTrashAlt />
                </div>
                <a className="text-theme whitespace-nowrap hover:border-theme border-b-2  transition-all  duration-700 border-white font-bold tracking-wide">
                  Delete collection
                </a>
              </div>
            )}
          </div>
          <div
            hidden={!collectionData}
            className="py-5  border-b   text-center  "
          >
            <h2 className="lg:text-2xl text-xl font-bold tracking-wide">
              {isEdit && userData?._id === collectionData?.user ? (
                <input
                  placeholder="Collection Name"
                  type="text"
                  defaultValue={collectionName}
                  onChange={(e) => {
                    setCollectionName(e?.target?.value);
                  }}
                  className="focus:outline-none border border-black/60 py-1 px-3 mt-0.5 rounded"
                />
              ) : (
                collectionName
              )}
            </h2>
            <div className="flex items-center justify-center gap-2 xs:text-sm text-xs text-gray-900 font-semibold tracking-wider sm:py-3.5 xs:py-3 py-2">
              <p className="flex items-center  gap-2">
                <i className="fa-solid fa-circle w-1 h-1"></i>
                {collectionData?.projects
                  ? Object.keys(collectionData?.projects).length
                  : 0}
                &nbsp; Projects
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 xs:text-sm text-xs text-gray-900 font-semibold tracking-wider">
              {isEdit && userData?._id === collectionData?.user ? (
                <>
                  <div>
                    <p hidden={!isEdit} className="flex items-center  gap-1">
                      Private
                      <ThemeSwitch
                        checked={isPublic}
                        onChange={(e) => {
                          setIsPublic(e?.target?.checked);
                        }}
                      />
                      Public
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateCollection();
                    }}
                    className="text-theme border-2 border-theme rounded px-4 bg-theme-light flex items-center gap-1 md:text-base text-sm font-semibold justify-center py-1 cursor-pointer"
                  >
                    <FaCheck />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="flex items-center  gap-1">
                    {collectionData?.isPublic ? "Public" : "Private"}
                  </p>
                  <p
                    onClick={() => {
                      setIsEdit(true);
                    }}
                    className={`text-theme border-2 border-theme rounded px-4 bg-theme-light flex items-center gap-1 md:text-base text-sm font-semibold justify-center py-1 cursor-pointer ${
                      userData?._id === collectionData?.user ? "" : "hidden"
                    }`}
                  >
                    <FaEdit />
                    Edit
                  </p>
                </>
              )}
            </div>
          </div>
          <List
            projectListData={getCollectionData?.projectList}
            col={4}
            type="collection"
            collectionId={
              userData?._id === collectionData?.user && collectionData?._id
            }
            isLoading={isLoading}
          />
        </div>
      </section>
      <section className="pt-10 pb-20">
        <div className="container xl:px-24 px-4 mx-auto">
          <h2 className="text-gray-900 font-semibold lg:text-2xl text-xl xl:pb-3.5 pb-2.5">
            More Collections
          </h2>
          <Collections
            collectionListData={getCollectionData?.moreCollections}
            isLoading={loadCollection}
          />
        </div>
      </section>
    </AppLayout>
  );
};

export default index;
