import store from "@/store/store";
import { lazyLoadingPageRequest } from "@/store/user/actions";
import { Router } from "next/router";
import NProgress from "nprogress";

export default function nProgress() {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
    store.dispatch(lazyLoadingPageRequest({ loading: true }));
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
    store.dispatch(lazyLoadingPageRequest({ loading: false }));
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
    store.dispatch(lazyLoadingPageRequest({ loading: false }));
  });
}
