import Loader from "@/components/common/Loader";
import { listCheckoutRequest } from "@/store/cart/actions";
import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../../components/payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const checkout = () => {
  const stripePromise = loadStripe(process?.env?.STRIPE_PUBLISHABLE_KEY);

  const router = useRouter();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  /* Get responses of api call */
  const { checkoutListData, isLoading } = useSelector((store) => ({
    checkoutListData: store?.cart?.checkoutListData,
    isLoading: store?.cart?.loading,
  }));

  /* cart list api */

  useEffect(() => {
    // if (router?.query?.projectId !== undefined) {
    dispatch(
      listCheckoutRequest({
        projectId:
          router?.query?.projectId === undefined
            ? ""
            : router?.query?.projectId,
      })
    );
    // }
  }, [router?.query?.projectId]);
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: `${checkoutListData?.stripe_client_secret}`,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <main>
      {isLoading && <Loader />}
      <section className=" h-screen relative overflow-y-auto pb-[100px] flex flex-col">
        <div className="h-full">
          <div className="flex justify-between items-center border-b py-6 xl:px-11 px-4 cursor-pointer">
            <h2
              onClick={() => {
                router.push("/");
              }}
              className="text-2xl font-bold"
            >
              DM
            </h2>
            <p className="text-gray-900 md:text-sm text-xs flex items-center gap-1 font-semibold tracking-wider">
              <FaLock className="md:text-base text-sm"></FaLock>
              Secure Checkout
            </p>
          </div>
          <div className="container xl:px-24 px-4 mx-auto py-10 !relative">
            <div className="flex flex-wrap items-center justify-between  pb-6">
              <div className="flex  items-end md:gap-6 sm:gap-5 gap-3 ">
                <h2 className="text-gray-900 lg:text-2xl sm:text-xl font-semibold tracking-wide">
                  Checkout
                </h2>
                <a
                  onClick={() => {
                    router.push("/cart");
                  }}
                  className="text-theme font-semibold lg:text-base sm:text-sm text-xs tracking-wider cursor-pointer hover:text-dark-theme transition-all  "
                >
                  Back to Cart
                </a>
              </div>
            </div>
            <div className="relative w-full h-full">
              {checkoutListData ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-5 lg:gap-8 md:gap-5 gap-3 items-start !relative  ">
                  <div className="md:col-span-2 sm:col-span-3 border-b border-black/30">
                    {(checkoutListData?.projects || []).map((item, i) => {
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
                                    {item?.created_by?.name}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="text-end">
                            {/* <HiOutlineXMark
                            onClick={() => {
                              projectRemoveFromCart(item?.project?.id);
                            }}
                            style={{ strokeWidth: "3" }}
                            size={22}
                            className="block    text-end absolute top-2.5 right-0 cursor-pointer"
                          /> */}
                            <p className="inline-block sm:mt-3 md:mt-0 text-gray-900 font-bold xl:text-base lg:text-sm md:text-xs xs:text-sm text-xs bg-theme-light tracking-wide rounded py-0.5 lg:px-2.5 md:px-2 px-2.5">
                              ${item?.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border rounded sm:col-span-2 md:col-span-1 lg:p-5 md:p-3.5 sm:p-2.5 p-3.5 sm:sticky top-0 xl:space-y-5 md:space-y-3.5 space-y-2">
                    <div className="flex items-end text-gray-800 justify-between">
                      <p className=" xl:text-base text-sm">Subtotal</p>
                      <p className="font-bold 2xl:text-base lg:text-sm text-xs tracking-wide">
                        ${checkoutListData?.sub_total} USD
                      </p>
                    </div>
                    <div className="flex  text-gray-800 justify-between">
                      <p className="!leading-none xl:text-base text-sm">
                        Platform Fee
                      </p>
                      <p className="font-bold  2xl:text-base lg:text-sm text-xs tracking-wide">
                        ${checkoutListData?.platform_fee} USD
                      </p>
                    </div>
                    <div className=" text-gray-800 items-end flex justify-between">
                      <p className="xl:text-base text-sm">GST/VAT Tax</p>
                      <p className="font-bold 2xl:text-base lg:text-sm text-xs tracking-wide">
                        $0 USD
                      </p>
                    </div>
                    {/* <div className=" text-gray-800 flex justify-between items-end">
                    <p className="xl:text-base text-sm">
                      <i className="fa-solid fa-location-dot md:text-sm "></i>{" "}
                      India
                    </p>
                    <a
                      onClick={() => {
                        setIsEdit(!isEdit);
                      }}
                      className="font-bold tracking-wide cursor-pointer text-theme lg:text-sm text-xs"
                    >
                      Edit Billing Info
                    </a>
                  </div> */}
                    <div className=" text-gray-800 lg:text-sm text-xs flex justify-between">
                      <p className="font-bold tracking-wide ">
                        Estimated Total
                      </p>
                      <div className="text-end">
                        <p className="font-bold tracking-wide">
                          ${checkoutListData?.total_amount} USD
                        </p>
                        {/* <p className="text-gray-400 pt-0.5 lg:text-sm text-xs">
                        Members save 20%
                      </p> */}
                      </div>
                    </div>
                    {/* <div>
                    <a href="" className="text-theme md:text-sm text-xs">
                      Promo code
                    </a>
                    <div className="flex lg:gap-2 gap-1 md:py-2 py-1.5">
                      <input
                        type="text"
                        className="bg-white-300 xl:text-base md:text-sm text-xs  w-full 2xl:py-2 py-1.5 lg:px-2.5 px-1.5 text-gray-800 rounded border border-black/20  focus:outline-none"
                        placeholder="Enter promo code"
                      />
                      <button className="border-2 border-theme 2xl:text-base lg:text-sm text-xs font-bold tracking-wide text-theme hover:text-dark-theme hover:border-dark-theme hover:bg-theme-light transition-all 2xl:py-2 py-1.5 px-4 rounded">
                        Apply
                      </button>
                    </div>
                    <p className="text-gray-800 lg:text-xs text-[10px] tracking-wider">
                      Promo and coupon codes are limited to one time use and are
                      not valid on membership credits or gift cards.{" "}
                      <a href="" className="underline">
                        Learn more
                      </a>
                    </p>
                  </div> */}
                    {checkoutListData?.stripe_client_secret ? (
                      // <Elements stripe={stripePromise}>
                      //   <CheckoutForm />
                      // </Elements>
                      <div className="stripe">
                        <Elements stripe={stripePromise} options={options}>
                          <CheckoutForm />
                        </Elements>
                      </div>
                    ) : (
                      ""
                      // <button
                      //   type="button"
                      //   onClick={() => {
                      //     setShowStripe(!showStripe);
                      //   }}
                      //   className="border-2 border-theme bg-theme 2xl:text-base lg:text-sm text-xs  font-bold tracking-wide text-white hover:border-dark-theme hover:bg-dark-theme transition-all w-full py-2.5 rounded-sm"
                      // >
                      //   Pay with Credit Card/PayPal
                      // </button>
                    )}
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
          </div>
        </div>
      </section>
      <div className="fixed bottom-0 left-0 bg-gray-200 py-5 w-full flex gap-8 text-sm font-semibold justify-center items-center">
        <a href="">Terms</a>
        <a href="">Cookie Policy</a>
        <a href="">Privacy Policy</a>
      </div>
      <section></section>

      <div className={`billing ${isEdit ? "" : "hidden"}`}>
        <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[650px] bg-white rounded sm:p-5 p-2.5">
          <div className="w-full">
            <a className="close-btn cursor-pointer block">
              <HiXMark
                className="fa-solid fa-xmark text-2xl  text-gray-600 ml-auto"
                onClick={() => setIsEdit(false)}
              />
            </a>
            <h2 className="text-center md:text-xl text-lg font-semibold tracking-wider text-gray-900">
              Billing info
            </h2>
            <form
              action=""
              className="lg:space-y-5 sm:space-y-3 space-y-2 lg:pt-5 md:pt-3.5 py-3.5"
            >
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="xs:text-sm text-xs text-gray-800 font-semibold tracking-wider "
                  >
                    Entity Name
                  </label>
                  <p className="lg:text-sm text-xs text-gray-400 font-bold tracking-wide">
                    Optional
                  </p>
                </div>
                <input
                  type="text"
                  className="focus:outline-none md:text-base text-sm text-gary-800 bg-white-300 px-2 py-1.5 border border-black/50 rounded w-full"
                  placeholder=" Enter Entity Name"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="xs:text-sm text-xs text-gray-800 font-semibold tracking-wider"
                  >
                    Address
                  </label>
                  <p className="lg:text-sm text-xs text-gray-400 font-bold tracking-wide">
                    Optional
                  </p>
                </div>
                <input
                  className="focus:outline-none md:text-base text-sm text-gary-800 bg-white-300 px-2 py-1.5 border border-black/50 rounded w-full"
                  placeholder="Enter Address"
                  name=""
                  id=""
                />
              </div>
              <div className="space-y-0.5">
                <label
                  htmlFor=""
                  className="xs:text-sm text-xs text-gray-800 font-semibold tracking-wider"
                >
                  Country of Residence
                </label>
                <select
                  name=""
                  id=""
                  className="focus:outline-none md:text-base text-sm text-gary-800 bg-white-300 px-2 py-1.5 border border-black/50 rounded w-full"
                >
                  <option value="">India</option>
                  <option value="">Canada</option>
                  <option value="">USA</option>
                </select>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="xs:text-sm text-xs text-gray-800 font-semibold tracking-wider"
                  >
                    Tax ID Number (ABN, VATIN, etc.)
                  </label>
                  <p className="lg:text-sm text-xs text-gray-400 font-bold tracking-wide">
                    Optional
                  </p>
                </div>
                <input
                  className="focus:outline-none md:text-base text-sm text-gary-800 bg-white-300 px-2 py-1.5 border border-black/50 rounded w-full"
                  placeholder="Enter Tax ID Number"
                  name=""
                  id=""
                />
              </div>
            </form>
            <button className="text-white bg-theme border-2 mt-4 md:text-base text-sm  border-theme rounded-sm w-full font-semibold tracking-wider hover:bg-dark-theme hover:border-dark-theme transition-all  py-2.5 xs:px-7 px-5">
              Confirm Billing Info
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default checkout;
