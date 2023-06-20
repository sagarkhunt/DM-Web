import { listFavProjectRequest } from "@/store/project/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./List";
import { uniqueId } from "@/utils/uId";

const Favourite = () => {
  const dispatch = useDispatch();
  const UID = uniqueId()
  /* Get responses of api call */
  const {
    favProjectListData,
    projectFavData,
    cartAddData,
    collectionCreateData,
    userData,
  } = useSelector((store) => ({
    favProjectListData: store?.project?.favProjectListData,
    projectFavData: store?.project?.projectFavData,
    cartAddData: store?.cart?.cartAddData,
    collectionCreateData: store?.collection?.collectionCreateData,
    userData: store?.auth?.verifyTokenData,
  }));

  /* cart list api */
  useEffect(() => {
    dispatch(
      listFavProjectRequest({
        params: {
          page: 1,
          limit: 4,
          type: "favourite",
          uid: UID?.uid,
        },
      })
    );
  }, [projectFavData, cartAddData, collectionCreateData]);

  return (
    <div className="container xl:px-24 px-4 mx-auto">
      <h2 className=" sm:text-lg  text-gray-900 font-bold tracking-wide">
        {userData ? "Products you've liked" : "Top Liked Projects"}
      </h2>
      <List
        projectListData={favProjectListData?.results}
        col={4}
        type="favourite"
      />
    </div>
  );
};

export default Favourite;
