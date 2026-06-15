import GTMPageView from "@/Pages/Dashboard/Admin/GTMPageView";
import FloatingChatMenu from "@/Pages/Shared/FloatingChatMenu";
import Footer from "@/Pages/Shared/Footer";
import Navbar from "@/Pages/Shared/Navbar";
import NoticePopup from "@/Pages/Shared/NoticePopup";
import ScrollToTop from "@/Pages/Shared/ScrollToTop";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <ScrollToTop />
      <NoticePopup/>
      <Navbar />
      <GTMPageView></GTMPageView>
      <Outlet />
      <Footer />
      <FloatingChatMenu />
    </div>
  );
};

export default MainLayout;
