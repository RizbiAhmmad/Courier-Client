import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaReceipt,
  FaThList,
  FaUsers,
} from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdInventory, MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAuth from "@/Hooks/useAuth";

<style>
  {`
    .scrollWhite::-webkit-scrollbar {
      width: 6px;
    }
    .scrollWhite::-webkit-scrollbar-thumb {
      background: white;
      border-radius: 10px;
    }
    .scrollWhite::-webkit-scrollbar-track {
      background: transparent;
    }
  `}
</style>;

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userRole, setUserRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      axiosPublic
        .get("/users/role", { params: { email: user.email } })
        .then((response) => {
          setUserRole(response.data.role);
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [axiosPublic, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!userRole) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="w-full text-4xl text-black focus:outline-none"
        >
          {!isSidebarOpen ? (
            <MdOutlineDashboardCustomize />
          ) : (
            <LuLayoutDashboard />
          )}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        {/* <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-100 text-black transition-all duration-300 flex flex-col justify-between`}
        > */}

        <div
          className={`${
            isSidebarOpen ? "w-60" : "w-0 md:w-60"
          } bg-black text-white md:bg-gray-100 md:text-black transition-all duration-300 flex flex-col justify-between`}
        >
          <ul
            onClick={toggleSidebar}
            className="scrollWhite p-6 space-y-2 text-md h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth"
          >
            {/* Admin Menu */}
            {userRole === "admin" && (
              <>
                <li>
                  <NavLink to="/" className="flex items-center py-2 space-x-3">
                    <FaHome /> <span>Home</span>
                  </NavLink>
                </li>

                {/* Users */}
                <li className=" pt-4 pb-1 text-xs font-semibold md:text-gray-500 uppercase">
                  USERS
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className="px-2 flex items-center py-2 space-x-3"
                  >
                    <FaUsers /> <span>Users</span>
                  </NavLink>
                </li>

                {/* Courier*/}
                <li className=" pt-4 pb-1 text-xs font-semibold md:text-gray-500 uppercase">
                  Courier Management
                </li>
               
                <li>
                  <NavLink
                    to="/dashboard/allCategories"
                    className="flex px-2 items-center py-2 space-x-3"
                  >
                    <FaListAlt /> <span>Categories</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allCourierTypes"
                    className="flex px-2 items-center py-2 space-x-3"
                  >
                    <FaThList /> <span>Courier Type</span>
                  </NavLink>
                </li>

                {/* Profile */}
                <li className="pt-4 pb-1 text-xs font-semibold md:text-gray-500 uppercase">
                  ACCOUNT
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center px-2 py-2 space-x-3"
                  >
                    <CgProfile /> <span>Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* User Menu */}
            {userRole === "user" && (
              <>
                <li>
                  <NavLink to="/" className="flex items-center py-2 space-x-3">
                    <FaHome /> <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myOrders"
                    className="flex items-center py-2 space-x-3"
                  >
                    <FaReceipt /> <span>My Orders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center py-2 space-x-3"
                  >
                    <CgProfile /> <span>Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {user && (
            <div className="p-4 mb-4 text-center text-blue-800 bg-gray-100 rounded-lg shadow">
              <h1 className="text-xl font-semibold">
                Hey, {user.displayName || "User"}! Welcome to your Dashboard.
              </h1>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
