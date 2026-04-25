/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/R-logo.jpg";
import { AuthContext } from "@/provider/AuthProvider";
import { FaUser } from "react-icons/fa";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [scrolled, setScrolled] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
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

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      return Swal.fire("Error", "Enter tracking number", "error");
    }

    setIsTracking(true);
    try {
      await axiosPublic.get(`/track/${trackingNumber}`);
      setIsOpen(false);
      navigate(`/track/${trackingNumber}`);
      setTrackingNumber("");
    } catch (error) {
      Swal.fire("Not Found", "Tracking ID not found", "error");
    } finally {
      setIsTracking(false);
    }
  };

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/why-choose-us", label: "Why Choose Us" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  const links = user
    ? [...baseLinks, { href: "/dashboard", label: "Dashboard" }]
    : baseLinks;

  // Update active link on route change
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // Handle scroll logic for Home page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Only handle section highlighting on the Home page
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
  }, [location.pathname, links]);

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
      <div className="mx-auto max-w-8xl px-4 sm:px-8">
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
              SNS International
            </h1>
          </div>

          {/* 🖥 Desktop Menu (Middle) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-6 px-8 py-2 rounded-full backdrop-blur-sm border border-transparent transition-all">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className={`relative font-bold text-lg transition-all duration-300 ${
                    activeLink === link.href
                      ? "text-orange-400"
                      : scrolled
                        ? "text-gray-950 hover:text-orange-400"
                        : "text-gray-900 hover:text-orange-500"
                  }`}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400 rounded-full animate-in fade-in zoom-in duration-300"></span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section: Tracking + Auth grouped together */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Tracking */}
            <div className="flex items-center">
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Tracking ID"
                className="h-11 w-40 rounded-l-xl border border-gray-200 px-4 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50/50"
              />
              <button
                onClick={handleTrack}
                disabled={isTracking}
                className="h-11 px-5 rounded-r-xl text-xs font-bold text-white bg-linear-to-r from-yellow-400 to-orange-500 hover:shadow-lg hover:shadow-orange-500/20 shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isTracking ? "..." : "Track"}
              </button>
            </div>

            {/* Auth buttons */}
            {user ? (
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-linear-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:shadow-red-500/20 transition-all active:scale-95"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md hover:shadow-orange-500/20 transition-all active:scale-95"
              >
                <FaUser className="mr-1" /> Login
              </button>
            )}
          </div>

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
          className={`md:hidden absolute top-16 left-0 w-full bg-linear-to-b from-yellow-400 to-orange-400 backdrop-blur-xl transition-all duration-500 ease-in-out transform ${
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

            {/* Mobile Tracking */}
            <div className="w-full flex flex-col gap-2">
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Tracking number"
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-orange-400"
              />
              <button
                onClick={handleTrack}
                disabled={isTracking}
                className="w-full h-10 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-yellow-400 to-orange-500 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isTracking ? "Tracking..." : "Track"}
              </button>
            </div>

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
