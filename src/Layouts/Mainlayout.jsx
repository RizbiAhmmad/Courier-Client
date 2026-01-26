// import Footer from "@/Shared/Footer";
// import ScrollToTop from "@/Shared/ScrollToTop";
import Navbar from "@/Pages/Shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <div className="">
          {/* <ScrollToTop /> */}
            {!noHeaderFooter && <Navbar />}
      <Outlet />
      {/* {!noHeaderFooter && <Footer />} */}
        </div>
    );
};

export default MainLayout;