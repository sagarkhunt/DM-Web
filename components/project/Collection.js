import { listProjectRequest } from "@/store/project/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./List";
import { uniqueId } from "@/utils/uId";

const Collection = () => {
  const dispatch = useDispatch();
  const UID = uniqueId();
  /* Get responses of api call */
  const {
    projectListData,
    collectionCreateData,
    collectionAddData,
    cartAddData,
    projectFavData,
    userData,
  } = useSelector((store) => ({
    projectListData: store?.project?.projectListData,
    collectionCreateData: store?.collection?.collectionCreateData,
    cartAddData: store?.cart?.cartAddData,
    projectFavData: store?.project?.projectFavData,
    userData: store?.auth?.verifyTokenData,
    collectionAddData: store?.collection?.collectionAddData,
  }));

  /* cart list api */
  useEffect(() => {
    dispatch(
      listProjectRequest({
        params: {
          page: 1,
          limit: 4,
          type: "collection",
          uid: UID?.uid,
        },
      })
    );
  }, [collectionCreateData, cartAddData, projectFavData, collectionAddData]);
  return (
    <div className="container xl:px-24 px-4 mx-auto">
      <h2 className=" sm:text-lg  text-gray-900 font-bold tracking-wide">
        {userData ? "Products you've collected" : "Top collected Projects"}
      </h2>
      <List
        projectListData={projectListData?.results}
        col={4}
        type="collection"
      />
    </div>
  );
};

export default Collection;
