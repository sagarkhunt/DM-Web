// "use client";
import Category from "@/components/common/Category";
import { verifyTokenRequest } from "@/store/auth/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loader from "@/components/common/Loader";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const { lazyPageLoading } = useSelector((store) => ({
    lazyPageLoading: store.user.lazyPageLoading,
  }));
  const isAuthentication =
  typeof window !== "undefined" && localStorage.getItem("isAuthentication");

  // useEffect(() => {
  //   console.log('ashdvjhasgdjajsdjasdjhasjdjsad')
  //   // if (change) {
  //     dispatch(verifyTokenRequest());
  //   // }
  // }, []);

  useEffect(() => {
    if (isAuthentication) {
      dispatch(verifyTokenRequest());
    }
  }, [isAuthentication]);

  return (
    <>
      {lazyPageLoading && <Loader />}
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="flex relative flex-col h-full md:pt-[155px] pt-[90px] overflow-auto">
          <div className="fixed top-0 left-0 lg:translate-y-[86px] translate-y-[80px]  w-full z-[997] ">
            <Category />
          </div>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
