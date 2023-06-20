import Modal from "@/components/common/Modal";
import AppLayout from "@/layout";
import { useRouter } from "next/router";
import React from "react";

const PaymentCompleted = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <Modal open={true}>
        {/* <div className="follow"> */}
        <div className="modal-content xl:w-[500px] sm:w-[450px] xs:w-[350px] w-[300px] max-h-[800px] bg-white rounded sm:p-5 p-2.5">
          <div className="container mx-auto px-4 lg:py-20 py-12">
            <div className="sm:p-6 p-4 mx-auto border w-fit shadow">
              <div>
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 lg:w-16 w-14 lg:h-16 h-14 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="md:text-2xl text-xl text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p className="text-gray-600 lg:my-2 my-1">
                  Thank you for completing your secure online payment.
                </p>
                <p> Have a great day! </p>
                <div className="lg:py-10 py-7 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/my-purchase");
                    }}
                    className="px-9 lg:text-base text-sm bg-[#195f47] rounded text-white font-semibold py-2.5"
                  >
                    GO BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
};

export default PaymentCompleted;
