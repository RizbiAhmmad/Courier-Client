import Login from "@/Authentication/Login";
import SignUp from "@/Authentication/SignUp";
import Dashboard from "@/Layouts/Dashboard";
import MainLayout from "@/Layouts/Mainlayout";
import AddCategory from "@/Pages/Dashboard/Admin/AddCategory";
import AddCountry from "@/Pages/Dashboard/Admin/AddCountry";
import AddCourierRate from "@/Pages/Dashboard/Admin/AddCourierRate";
import AddCourierType from "@/Pages/Dashboard/Admin/AddCourierType";
import AllCategories from "@/Pages/Dashboard/Admin/AllCategories";
import AllCountries from "@/Pages/Dashboard/Admin/AllCountries";
import AllCourierTypes from "@/Pages/Dashboard/Admin/AllCourierTypes";
import Home from "@/Pages/Home/Home";
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
     
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [

      // {
      //   path: "users",
      //   element: <AllUsers></AllUsers>,
      // },
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
    ],
  },
]);
