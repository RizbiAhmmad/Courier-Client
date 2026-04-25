import Login from "@/Authentication/Login";
import SignUp from "@/Authentication/SignUp";
import Dashboard from "@/Layouts/Dashboard";
import MainLayout from "@/Layouts/Mainlayout";
import BlogDetails from "@/Pages/Blogs/BlogDetails";
import Blogs from "@/Pages/Blogs/Blogs";
import AddBlog from "@/Pages/Dashboard/Admin/AddBlog";
import AddCategory from "@/Pages/Dashboard/Admin/AddCategory";
import AddCountry from "@/Pages/Dashboard/Admin/AddCountry";
import AddCourierRate from "@/Pages/Dashboard/Admin/AddCourierRate";
import AddCourierType from "@/Pages/Dashboard/Admin/AddCourierType";
import AddExpense from "@/Pages/Dashboard/Admin/AddExpense";
import AddExpenseCategory from "@/Pages/Dashboard/Admin/AddExpenseCategory";
import AllBlogs from "@/Pages/Dashboard/Admin/AllBlogs";
import AllCategories from "@/Pages/Dashboard/Admin/AllCategories";
import AllCountries from "@/Pages/Dashboard/Admin/AllCountries";
import AllCourierRates from "@/Pages/Dashboard/Admin/AllCourierRates";
import AllCourierTypes from "@/Pages/Dashboard/Admin/AllCourierTypes";
import AllExpense from "@/Pages/Dashboard/Admin/AllExpense";
import AllExpenseCategory from "@/Pages/Dashboard/Admin/AllExpenseCategory";
import AllShipments from "@/Pages/Dashboard/Admin/AllShipments";
import AllUsers from "@/Pages/Dashboard/Admin/AllUsers";
import ExpenseReport from "@/Pages/Dashboard/Admin/ExpenseReport";
import GTMSettings from "@/Pages/Dashboard/Admin/GTMSettings";
import NoticeSettings from "@/Pages/Dashboard/Admin/NoticeSettings";
import Profile from "@/Pages/Dashboard/Admin/Profile";
import SalesReport from "@/Pages/Dashboard/Admin/SalesReport";
import ShippingWizard from "@/Pages/Dashboard/Shipping/ShippingWizard";
import MyOrders from "@/Pages/Dashboard/User/MyOrders";
import AboutPage from "@/Pages/Home/AboutPage";
import ContactPage from "@/Pages/Home/ContactPage";
import Home from "@/Pages/Home/Home";
import TrackResult from "@/Pages/Home/TrackResult";
import ServicesPage from "@/Pages/Services/ServicesPage";
import WhyChooseUsPage from "@/Pages/Home/WhyChooseUsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/ShippingWizard",
        element: <ShippingWizard></ShippingWizard>,
      },
      {
        path: "/track/:trackingId",
        element: <TrackResult />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogDetails/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/why-choose-us",
        element: <WhyChooseUsPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
       {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "addCategory",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "allCategories",
        element: <AllCategories></AllCategories>,
      },
      {
        path: "addCourierType",
        element: <AddCourierType></AddCourierType>,
      },
      {
        path: "allCourierTypes",
        element: <AllCourierTypes></AllCourierTypes>,
      },
      {
        path: "addCountry",
        element: <AddCountry></AddCountry>,
      },
      {
        path: "allCountries",
        element: <AllCountries></AllCountries>,
      },
      {
        path: "addCourierRate",
        element: <AddCourierRate></AddCourierRate>,
      },
      {
        path: "allCourierRates",
        element: <AllCourierRates></AllCourierRates>,
      },
      {
        path: "allShipments",
        element: <AllShipments></AllShipments>,
      },
      {
        path: "shipmentReport",
        element: <SalesReport></SalesReport>,
      },
      {
        path: "addblog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "allBlogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "gtmSettings",
        element: <GTMSettings />,
      },
       {
        path: "popupSettings",
        element: <NoticeSettings />,
      },
       {
        path: "addExpenseCategory",
        element: <AddExpenseCategory />,
      },
      {
        path: "allExpenseCategories",
        element: <AllExpenseCategory />,
      },
      {
        path: "addExpense",
        element: <AddExpense />,
      },
      {
        path: "allExpense",
        element: <AllExpense />,
      },
      {
        path: "ExpenseReport",
        element: <ExpenseReport />,
      },
      {
        path: "myOrders",
        element: <MyOrders />,
      },

    ],
  },
]);
