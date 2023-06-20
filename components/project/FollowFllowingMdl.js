import { followFollowingListRequest } from "@/store/professionalprofile/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import Followers from "./Followers";
import Following from "./Following";

const FollowFllowingMdl = ({ open, setOpen, ownerId, tabIndex }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tab = ["Followers", "Following"];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);
  const [tabcurrent, setTabCurrent] = useState(tabIndex);

  const followFollowingListData = useSelector(
    (store) => store?.professionalprofile?.follwFollowingList
  );

  const handleChangeTab = (val) => {
    if (tabcurrent != val) {
      setPage(1);
      setTabCurrent(val);
    }
  };
  useEffect(() => {
    const body = {
      page: page,
      search: search,
      limit: limit,
      type: tabcurrent === 0 ? "followers" : "following",
    };
    if (router?.query?._id || ownerId) {
      dispatch(
        followFollowingListRequest({
          body,
          id: router?.query?._id ?? ownerId,
        })
      );
    }
  }, [router?.query?._id, search, page, tabcurrent, ownerId]);
  
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
    //    <!-- Followers & Following modal -->
    <Modal open={open} handleModal={() => setOpen(!open)}>
      {/* <div className="follow"> */}
      <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[800px] bg-white rounded sm:p-5 p-2.5">
        <div className="w-full">
          <a className="text-end close-btn cursor-pointer block">
            <HiXMark
              className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
              onClick={() => setOpen(!open)}
            />
          </a>

          <div className="py-1 border-b flex profile lg:gap-9 xs:gap-6 gap-4 font-bold lg:text-base text-sm flex-wrap items-center justify-center">
            {tab?.map((item, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  className={`${
                    index === tabcurrent ? "active " : ""
                  }text-gray-900 border-b-4 border-transparent py-1 px-1"`}
                  onClick={() => handleChangeTab(index)}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="py-5 w-full">
            <div
              className={`${tabcurrent !== 0 ? "hidden" : ""} follow-content`}
            >
              <Followers
                page={page}
                setPage={setPage}
                followersListData={followFollowingListData}
              />
            </div>
            <div
              className={`${tabcurrent !== 1 ? "hidden" : ""} follow-content`}
            >
              <Following
                page={page}
                setPage={setPage}
                followersListData={followFollowingListData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Modal>
  );
};

export default FollowFllowingMdl;
