import { GradientText } from "@/components/ui/GradientText";
import { FaCheckCircle, FaBox, FaPaperPlane } from "react-icons/fa";
import { FiTruck, FiShoppingCart, FiTarget } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-yellow-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-8 py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-indigo-900">Shop Globally</span>
              <br />
              <GradientText
                className="block"
                colors={["#ec4899", "#8b5cf6", "#22d3ee"]}
                animationSpeed={5}
              >
                Ship Seamlessly
              </GradientText>
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              Shop the world. Ship with ease. Unlock a world of possibilities
              with convenient, reliable & affordable services.
            </p>

            {/* FEATURES */}
            <div className="mt-6 flex flex-wrap gap-6">
              {["Shopping", "Shipping", "Cross Border"].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FaCheckCircle className="text-yellow-400" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl mt-10 p-6 md:p-12">
              {/* TABS */}
              <div className="flex justify-between border-b mb-6">
                {[
                  { icon: <FiTruck />, label: "Import" },
                  { icon: <FiShoppingCart />, label: "Export" },
                  { icon: <FiTarget />, label: "Track" },
                ].map((tab, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer ${
                      i === 0
                        ? "border-b-2 border-yellow-400 text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </div>
                ))}
              </div>

              {/* FORM */}
              <div className="space-y-4">
                <Input
                  label="Sender / From"
                  placeholder="Search by address or zip code"
                />
                <Input
                  label="Receiver / To"
                  placeholder="Search by address or zip code"
                />

               

                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl transition">
                  Next <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Input = ({ label, placeholder }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full bg-gray-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
};

export default Banner;
