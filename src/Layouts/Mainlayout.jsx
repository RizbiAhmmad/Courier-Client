import Footer from "@/Pages/Shared/Footer";
import Navbar from "@/Pages/Shared/Navbar";
import ScrollToTop from "@/Pages/Shared/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <div className="">
          <ScrollToTop />
            {!noHeaderFooter && <Navbar />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
        </div>
    );
};

export default MainLayout;