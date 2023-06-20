import store from "@/store/store";
import React from "react";
import "../styles/style.css";
import "../styles/globals.css";
import "../public/assets/font/stylesheet.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import nProgress from "@/utils/nProgress";
// import "nprogress/nprogress.css";
nProgress();
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            background: "#000",
            color: "#fff",
            zIndex: 9999,
          },
        }}
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
