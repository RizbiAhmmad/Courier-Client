import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { GradientText } from "@/components/ui/GradientText";
import { FaPaperPlane } from "react-icons/fa";
import { FiTruck, FiShoppingCart, FiTarget } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-indigo-900">Ship Worldwide</span>
              <br />
              <GradientText
                className="block"
                colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
                animationSpeed={5}
              >
                Fast & Secure
              </GradientText>
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              Affordable courier solutions for import & export shipments.
            </p>
          </div>

          {/* RIGHT CARD */}
         <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-center w-full">
            {/* Tabs */}
            <div className="flex justify-between border-b mb-6">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setActiveTab(cat._id);
                    setFromCountry("");
                  }}
                  className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition ${
                    activeTab === cat._id
                      ? "border-b-2 border-yellow-500 text-black font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {cat.name === "Import" && <FiTruck />}
                  {cat.name === "Export" && <FiShoppingCart />}
                  <span>{cat.name}</span>
                </div>
              ))}

              <div
                onClick={() => setActiveTab("Track")}
                className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition ${
                  activeTab === "Track"
                    ? "border-b-2 border-yellow-500 text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                <FiTarget />
                <span>Track</span>
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
                      navigate("/track-result", { state: res.data });
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
