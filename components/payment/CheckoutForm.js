import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-completed`,
      },
      redirect: "if_required",
    });

    if (error) {
      setLoading(false);

      setErrorMessage(error.message);
    } else {
      setLoading(false);
      router.push("/payment-completed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} onClick={() => setLoading(true)}>
        {loading ? <CircularProgress size={15} color="inherit" /> : "Submit"}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
