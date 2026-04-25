import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { GradientText } from "@/components/ui/GradientText";
import { FaPaperPlane } from "react-icons/fa";
import { FiTruck, FiShoppingCart, FiTarget } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const pushGTM = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  // Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (
        await axiosPublic.get("/categories", {
          params: { status: "active" },
        })
      ).data,
  });

  // Fetch Courier Rates
  const { data: courierRates = [] } = useQuery({
    queryKey: ["courierRates", activeTab],
    enabled: !!activeTab && activeTab !== "Track",
    queryFn: async () => {
      const res = await axiosPublic.get("/courierRates", {
        params: {
          categoryId: activeTab,
          status: "active",
        },
      });
      return res.data;
    },
  });

  const availableCountries = courierRates
    .filter((rate) => rate.categoryId === activeTab)
    .map((rate) => ({
      _id: rate.countryId,
      name: rate.variations?.[0]?.countryName,
    }));

  // remove duplicate
  const uniqueCountries = [
    ...new Map(availableCountries.map((c) => [c._id, c])).values(),
  ];

  const bangladesh = {
    _id: "BD",
    name: "Bangladesh",
  };

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]._id);
    }
  }, [categories, activeTab]);

  const categoryName = categories.find((c) => c._id === activeTab)?.name || "";

  return (
    <section className="relative min-h-screen bg-linear-to-br from-yellow-50 via-white to-purple-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex mt-4 items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-100">
               <FiTruck size={14} />
               Premium Logistics Partner
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-[1.15] tracking-tight">
              <GradientText
                className="inline-block pb-1"
                colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
                animationSpeed={3}
              >
                Freight Forwarding & Global Courier <br className="hidden md:block"/> Solutions from Bangladesh
              </GradientText>
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
              SNS International provides seamless logistics coordination with global partners like <span className="font-bold text-black italic underline decoration-yellow-400">DHL, FedEx, UPS, and Aramex</span>. Ensuring your goods reach any destination safely, efficiently, and on time.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
               <div className="flex flex-col">
                  <div className="flex text-yellow-400 gap-0.5 mb-1">
                     {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
                  </div>
                  <p className="text-sm font-bold text-gray-900">1000+ Happy Clients</p>
               </div>
               
               <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
               
               <div className="flex flex-col">
                  <p className="text-2xl font-black text-indigo-950 leading-none mb-1">2017</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Established Since</p>
               </div>
            </div>
          </div>

          {/* RIGHT CARD */}
         <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-center w-full">
            {/* Tabs */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl mb-8 relative">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setActiveTab(cat._id);
                    setFromCountry("");
                  }}
                  className={`relative flex items-center justify-center gap-2 flex-1 px-4 py-3 cursor-pointer transition-all duration-300 z-10 ${
                    activeTab === cat._id
                      ? "text-indigo-950 font-bold"
                      : "text-gray-500 hover:text-gray-700 font-semibold"
                  }`}
                >
                  {activeTab === cat._id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-20 flex items-center gap-2">
                    {cat.name === "Import" && <FiTruck className={activeTab === cat._id ? "text-yellow-500" : ""} />}
                    {cat.name === "Export" && <FiShoppingCart className={activeTab === cat._id ? "text-yellow-500" : ""} />}
                    <span>{cat.name}</span>
                  </div>
                </div>
              ))}

              <div
                onClick={() => setActiveTab("Track")}
                className={`relative flex items-center justify-center gap-2 flex-1 px-4 py-3 cursor-pointer transition-all duration-300 z-10 ${
                  activeTab === "Track"
                    ? "text-indigo-950 font-bold"
                    : "text-gray-500 hover:text-gray-700 font-semibold"
                }`}
              >
                {activeTab === "Track" && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-20 flex items-center gap-2">
                  <FiTarget className={activeTab === "Track" ? "text-yellow-500" : ""} />
                  <span>Track</span>
                </div>
              </div>
            </div>

            {/* Import / Export Section */}
            {activeTab && activeTab !== "Track" && (
              <div className="space-y-5">
                <SelectBox
                  label="Select Country"
                  value={fromCountry}
                  onChange={setFromCountry}
                  options={uniqueCountries}
                />

                <SelectBox
                  label="Receive In"
                  value={bangladesh._id}
                  disabled
                  options={[bangladesh]}
                />

                <button
                  onClick={() => {
                    if (!activeTab || !fromCountry) {
                      return Swal.fire(
                        "Error",
                        "Please select category & country",
                        "error",
                      );
                    }

                    pushGTM({
                      event: "start_shipping",
                      shipping: {
                        categoryId: activeTab,
                        categoryName,
                        countryId: fromCountry,
                      },
                    });

                    navigate("/ShippingWizard", {
                      state: {
                        categoryId: activeTab,
                        countryId: fromCountry,
                      },
                    });
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 
                  bg-linear-to-b from-yellow-400 to-orange-500 
                  hover:scale-105 hover:shadow-lg 
                  text-white font-semibold py-3 rounded-xl 
                  transition-all duration-300"
                >
                  Continue <FaPaperPlane />
                </button>
              </div>
            )}

            {/* Track Section */}
            {activeTab === "Track" && (
              <div className="space-y-4">
                <Input
                  label="Tracking Number"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={setTrackingNumber}
                />

                <button
                  onClick={async () => {
                    if (!trackingNumber) {
                      return Swal.fire(
                        "Error",
                        "Enter tracking number",
                        "error",
                      );
                    }
                    pushGTM({
                      event: "track_order",
                      tracking_number: trackingNumber,
                    });

                    try {
                      const res = await axiosPublic.get(
                        `/track/${trackingNumber}`,
                      );
                     navigate(`/track/${trackingNumber}`);
                    } catch (error) {
                      Swal.fire("Not Found", "Tracking ID not found", "error");
                    }
                  }}
                  className="w-full bg-linear-to-r from-yellow-400 to-orange-500 
                  hover:scale-105 hover:shadow-lg 
                  text-white py-3 rounded-xl"
                >
                  Track Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ label, placeholder, value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
};

const SelectBox = ({ label, options = [], value, onChange, disabled }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="mt-2 w-full bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {!disabled && <option value="">Select Country</option>}
      {options.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
);

export default Banner;
