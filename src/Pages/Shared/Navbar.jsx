/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/R-logo.jpg";
import { AuthContext } from "@/provider/AuthProvider";
import { FaUser } from "react-icons/fa";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { user, logOut } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get("/users")
        .then((res) => {
          const currentUser = res.data.find((u) => u.email === user.email);
          setRole(currentUser?.role || "user");
        })
        .catch(() => setRole("user"));
    }
  }, [user]);

  // Login / Logout
  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };
  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const links = user
    ? [...baseLinks, { href: "/dashboard", label: "Dashboard" }]
    : baseLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname !== "/") return;

      const scrollPosition = window.scrollY;

      links.forEach((link) => {
        if (!link.href.startsWith("#")) return;

        const section = document.querySelector(link.href);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop - 100 &&
            scrollPosition < sectionTop + sectionHeight - 100
          ) {
            setActiveLink(link.href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    setActiveLink(href);
    setIsOpen(false);

    // Page route navigation
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Section scroll navigation (like #services)
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/*  Logo & Name */}
          <div
            onClick={() => handleLinkClick("/", { preventDefault: () => {} })}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <h1 className="text-2xl font-extrabold text-orange-400 tracking-wide hover:text-orange-500 transition-colors">
              XCARGO
            </h1>
          </div>

          {/* 🖥 Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 bg-white/10 border border-gray-900 px-8 py-3 rounded-3xl backdrop-blur-md">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`relative font-semibold transition-all duration-300 ${
                  activeLink === link.href
                    ? "text-orange-400"
                    : scrolled
                      ? "text-gray-900 hover:text-orange-400"
                      : "text-gray-900 hover:text-orange-500"
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400 rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/*  Call Button (Desktop Only) */}
          {/* <div className="hidden md:flex items-center">
            <button
              
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-linear-to-r from-yellow-400 to-orange-400 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Login
            </button>
          </div> */}

          {/* Auth buttons (Desktop only) */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="hidden md:flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-linear-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="hidden md:flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-linear-to-r from-yellow-400 to-orange-400 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              <FaUser className="mr-1" /> Login
            </button>
          )}

          {/*  Mobile Hamburger */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg focus:outline-none text-black"
            >
              <div
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : "mb-1.5"
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isOpen ? "opacity-0" : "mb-1.5"
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/*  Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-linear-to-b from-yellow-500 to-orange-500 backdrop-blur-xl transition-all duration-500 ease-in-out transform ${
            isOpen
              ? "translate-y-0 opacity-100 max-h-150 py-6"
              : "-translate-y-10 opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col items-center space-y-5 px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className={`font-semibold text-lg transition-colors duration-300 ${
                  activeLink === link.href
                    ? "text-sky-300"
                    : "text-white hover:text-sky-200"
                }`}
              >
                {link.label}
              </a>
            ))}
            {/* <button
              
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Login
            </button> */}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-3"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md flex items-center justify-center mt-3"
              >
                <FaUser className="mr-2" /> Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
