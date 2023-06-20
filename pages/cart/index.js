import Loader from "@/components/common/Loader";
import Collection from "@/components/project/Collection";
import Favourite from "@/components/project/Favourite";
import AppLayout from "@/layout";
import {
  addToCartRequest,
  cartCountRequest,
  listCartRequest,
} from "@/store/cart/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  /* Get responses of api call */
  const { cartListData, cartAddData, isLoading } = useSelector((store) => ({
    cartListData: store?.cart?.cartListData,
    isLoading: store?.cart?.loading,
    cartAddData: store?.cart?.cartAddData,
  }));

  const projectRemoveFromCart = (projectId) => {
    Swal.fire({
      title: "Are you sure want to remove from cart ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#088178",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addToCartRequest({ projectId: projectId }));
      }
    });
  };

  /* cart list api */
  useEffect(() => {
    dispatch(listCartRequest({}));
    dispatch(cartCountRequest());
  }, [cartAddData]);
  return (
    <>
      {isLoading && <Loader />}
      <AppLayout>
        <section className="py-10">
          <div className="container xl:px-24 px-4 mx-auto">
            <div className="flex flex-wrap items-center justify-between  pb-3">
              <div className="flex  items-end md:gap-6 sm:gap-5 gap-3">
                <h2 className="text-gray-900 lg:text-2xl sm:text-xl font-semibold tracking-wide">
                  Your Cart
                </h2>
              </div>
            </div>
            {cartListData?.totalCartItems ? (
              <div className="grid md:grid-cols-3 sm:grid-cols-5 lg:gap-8 md:gap-5 gap-3 items-start relative">
                <div className="md:col-span-2 sm:col-span-3 border-b border-black/30">
                  {(cartListData?.data || []).map((item, i) => {
                    return (
                      <div
                        key={item?.project?.id}
                        className="flex items-center xl:gap-6 lg:gap-4  gap-2.5 xl:pb-6 pb-3.5 xl:py-6 py-3.5 relative  border-t border-black/30"
                      >
                        <div
                          className="lg:w-[150px] md:w-[120px] w-[90px] lg:min-w-[150px] md:min-w-[120px] min-w-[80px] lg:h-[95px] md:h-[70px] h-[
                   50px] rounded-md overflow-hidden md:p-1 shadow-md"
                        >
                          <img
                            src={item?.project?.webp_banner_file_path}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-between grow items-center">
                          <Link
                            href={`/project/project-details/${item?.project?.id}`}
                          >
                            <div>
                              <p className="text-gray-900 lg:text-base md:text-sm text-xs font-semibold tracking-wider ">
                                {item?.project?.project_name}
                              </p>
                              <p className="text-gray-900 lg:text-sm md:text-xs text-[10px]">
                                by &nbsp;
                                <span className="font-semibold tracking-wider text-theme">
                                  {item?.project?.created_by?.name}
                                </span>
                              </p>
                            </div>
                          </Link>
                          <div className="text-end">
                            <HiOutlineXMark
                              onClick={() => {
                                projectRemoveFromCart(item?.project?.id);
                              }}
                              style={{ strokeWidth: "3" }}
                              size={22}
                              className="block    text-end absolute top-2.5 right-0 cursor-pointer"
                            />
                            <p className="inline-block sm:mt-3 md:mt-0 text-gray-900 font-bold xl:text-base lg:text-sm md:text-xs xs:text-sm text-xs bg-theme-light tracking-wide rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                              ${item?.project?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border rounded sm:col-span-2 md:col-span-1  lg:p-5 md:p-3.5 sm:p-2.5 p-3.5 sm:sticky top-0 xl:space-y-5 md:space-y-3.5 space-y-2">
                  <div className="flex items-end text-gray-800 justify-between">
                    <p className=" tracking-wide font-bold lg:text-lg md:text-base text-sm">
                      {cartListData?.totalCartItems} Item
                    </p>
                    <p className=" tracking-wide font-bold  2xl:text-base lg:text-sm text-xs">
                      ${cartListData?.totalCartAmount} USD
                    </p>
                  </div>
                  <div className="flex items-end text-gray-800 justify-between">
                    <p className=" xl:text-base text-sm">Subtotal</p>
                    <p className="font-bold 2xl:text-base lg:text-sm text-xs tracking-wide">
                      ${cartListData?.totalCartAmount} USD
                    </p>
                  </div>
                  <div className="flex  text-gray-800 justify-between">
                    <p className="!leading-none xl:text-base text-sm">
                      Platform Fee&nbsp;({cartListData?.projectCommission}%)
                    </p>
                    <p className="font-bold   2xl:text-base lg:text-sm text-xs tracking-wide">
                      ${cartListData?.commissionAmount} USD
                    </p>
                  </div>
                  <div className="flex  text-gray-800 justify-between">
                    <p className="!leading-none xl:text-base text-sm">
                      Final Amount
                    </p>
                    <p className="font-bold   2xl:text-base lg:text-sm text-xs tracking-wide">
                      ${cartListData?.amountAfterCommission} USD
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (localStorage.getItem("access")) {
                        router.push("/cart/checkout");
                      } else {
                        router.push("/auth/login");
                      }
                    }}
                    className="w-full lg:text-base md:text-sm text-xs py-2 text-white font-bold tracking-wide bg-theme border-theme border hover:bg-dark-theme hover:border-dark-theme transition-all rounded"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-results flex items-center flex-col justify-center">
                <div className="no-results-image mx-auto">
                  <img
                    className="mx-auto"
                    width="300"
                    height="175"
                    alt="No results were found."
                    src="/cart.png"
                  />
                </div>
                <p className="text-center py-6">Your Cart is Empty.</p>
              </div>
            )}
          </div>
        </section>
        <section className="2xl:pt-16 sm:pt-10 pt-8">
          <Favourite />
        </section>
        <section className="2xl:pt-16 sm:pt-10 pt-8">
          <Collection />
        </section>
      </AppLayout>
    </>
  );
};

export default index;
