import GTMPageView from "@/Pages/Dashboard/Admin/GTMPageView";
import FloatingChatMenu from "@/Pages/Shared/FloatingChatMenu";
import Footer from "@/Pages/Shared/Footer";
import Navbar from "@/Pages/Shared/Navbar";
import NoticePopup from "@/Pages/Shared/NoticePopup";
import ScrollToTop from "@/Pages/Shared/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div className="">
      <ScrollToTop />
      <NoticePopup/>
      {!noHeaderFooter && <Navbar />}
      <GTMPageView></GTMPageView>
      <Outlet />
      {!noHeaderFooter && <Footer />}
      <FloatingChatMenu />
    </div>
  );
};

export default MainLayout;
