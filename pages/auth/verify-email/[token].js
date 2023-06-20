import { verifyEmailRequest } from "@/store/auth/actions";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function VerifyEmail() {
  // const { token } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  /**
   * Sweetalert
   */
  const MySwal = withReactContent(Swal);
  /**
   * email verify state
   */
  const emailVerifyState = useSelector(
    (store) => store?.auth?.emailVerifyState
  );
  /**
   * use effect email verify
   */
  useEffect(() => {
    if (router?.query?.token) {
      dispatch(
        verifyEmailRequest({
          data: { token: router?.query?.token },
          router,
        })
      );
    }
  }, [router?.query?.token]);
  /**
   * @param { openPopup}
   */
  /**
   * open pop-up for verify email
   */
  useEffect(() => {
    if (emailVerifyState) {
      openPopup();

      setTimeout(
        function () {
          router.push("/auth/login");
        }.bind(this),
        3000
      );
    }
  }, [emailVerifyState]);
  /**
   * pop up show function for email verify.
   */
  function openPopup() {
    MySwal.fire({
      title: "Your email has been verified. Thanks!",
      icon: "success",
      showConfirmButton: false,
      showCancelButton: false,
      timer: 3000,
      // confirmButtonText: "OK",
      // confirmButtonColor: "#088178",
      allowOutsideClick: false,

      // customClass: {
      //   confirmButton: "btn btn-primary",
      //   cancelButton: "btn btn-danger ms-1",
      // },
      // buttonsStyling: false,
    });
    // .then(function (result) {
    //   if (result.value) {
    //     router.push("/auth/login");
    //   }
    // });
  }

  return <></>;
}

export default VerifyEmail;
