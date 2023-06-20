import FollowFllowingMdl from "@/components/project/FollowFllowingMdl";
import { formateDateYear } from "@/utils/dateMixin";
import Link from "next/link";
import React, { useState } from "react";

const About = ({ aboutData }) => {
  const [openFollowFollowing, setOpenFollowFollowing] = useState(false);
  const [openMdlFollowFollowing, setOpenMdlFollowFollowing] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [tabVal, setTabVal] = useState();
  return (
    <>
      <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 lg:gap-2 gap-4 items-start">
        <div className="2xl:col-span-4 lg:col-span-3 sm:col-span-2">
          <h2 className="text-gray-900 font-bold tracking-wider lg:text-xl sm:text-lg">
            About the Creator
          </h2>
          <div className="lg:py-4 py-2.5 flex items-center lg:gap-4 gap-2.5">
            <div className="xl:w-24 lg:w-20 w-16 xl:h-24 lg:h-20 h-16 rounded-full overflow-hidden border-4 border-white">
              <img src={aboutData?.user?.profile_image} alt="" />
            </div>
            <Link
              href={"/profile/account-profile"}
              className="text-gray-800 lg:text-lg font-bold tracking-wider underline decoration-2"
            >
              {aboutData?.user?.name}
            </Link>
            {/* <a
              href=""
              className="text-gray-800 lg:text-lg font-bold tracking-wider underline decoration-2"
            >
              indieground
            </a> */}
          </div>
          <p className="max-w-2xl text-gray-900 lg:py-3 py-2 lg:text-base text-sm">
            {aboutData?.user?.userDetails?.description}
            {/* We are a team of designers, developers & photographers from Italy
            and we love to create striking graphic resources! Visit our website
            to discover more about what we do and the services we offer! */}
          </p>
        </div>
        <div className="border rounded-md shadow-md md:p-5 p-3.5">
          <div className="grid grid-cols-2">
            <div
              className="text-center text-gray-900 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setOwnerId(1);
                setTabVal(0);
                setOpenMdlFollowFollowing(!openMdlFollowFollowing);
              }}
            >
              <p className="font-bold tracking-wide lg:text-2xl md:text-xl text-lg">
                {aboutData?.user?.follower}
              </p>
              <p className="lg:text-base text-sm">followers</p>
            </div>
            <div
              className="text-center text-gray-900 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setOwnerId(1);
                setTabVal(1);
                setOpenMdlFollowFollowing(!openMdlFollowFollowing);
              }}
            >
              <p className="font-bold tracking-wide lg:text-2xl md:text-xl text-lg">
                {aboutData?.user?.following}
              </p>
              <p className="lg:text-base text-sm">following</p>
            </div>
          </div>
          <p className="flex items-center sm:justify-start justify-center text-gray-900 px-5 gap-1.5 lg:py-5 py-3.5 xl:text-lg md:text-base text-sm">
            <i className="fa-solid fa-tag rotate-90"></i>Est.{" "}
            {formateDateYear(aboutData?.user?.createdAt)}
          </p>
          <Link
            href={`${aboutData?.user?.userDetails?.website_url}`}
            className="text-gray-900 sm:text-start text-center md:text-base text-sm lg:px-5 md:px-3.5 px-1.5 block font-bold tracking-wide underline decoration-2 break-words"
          >
            {aboutData?.user?.userDetails?.website_url}
          </Link>
          {aboutData?.user?.userDetails ? (
            <ul className="lg:py-9 py-7 xl:space-y-8 space-y-6 lg:px-5 md:px-3.5 px-1.5">
              <li className="flex items-center sm:justify-start justify-center gap-2 xl:text-base md:text-sm text-xs text-gray-900">
                <i className="fa-brands fa-twitter xl:text-xl text-lg"></i>
                <Link
                  href={`${aboutData?.user?.userDetails?.twitter_url}`}
                  className="underline decoration-2 underline-offset-2 font-semibold tracking-wider"
                >
                  Twitter
                </Link>
              </li>
              <li className="flex items-center sm:justify-start justify-center gap-2 xl:text-base md:text-sm text-xs text-gray-900">
                <i className="fa-brands fa-pinterest xl:text-xl text-lg"></i>
                <Link
                  href={`${aboutData?.user?.userDetails?.pinterest_url}`}
                  className="underline decoration-2 underline-offset-2 font-semibold tracking-wider"
                >
                  Pinterest
                </Link>
              </li>
              <li className="flex items-center sm:justify-start justify-center gap-2 xl:text-base md:text-sm text-xs text-gray-900">
                <i className="fa-brands fa-square-instagram xl:text-xl text-lg"></i>
                <Link
                  href={`${aboutData?.user?.userDetails?.instagram_url}`}
                  className="underline decoration-2 underline-offset-2 font-semibold tracking-wider"
                >
                  Instagram
                </Link>
              </li>
              <li className="flex items-center sm:justify-start justify-center gap-2 xl:text-base md:text-sm text-xs text-gray-900">
                <i className="fa-brands fa-square-facebook xl:text-xl text-lg"></i>
                <Link
                  href={`${aboutData?.user?.userDetails?.facebook_url}`}
                  className="underline decoration-2 underline-offset-2 font-semibold tracking-wider"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      {openMdlFollowFollowing && (
        <FollowFllowingMdl
          ownerId={ownerId}
          open={openMdlFollowFollowing}
          tabIndex={tabVal}
          setOpen={setOpenMdlFollowFollowing}
        />
      )}
    </>
  );
};

export default About;
