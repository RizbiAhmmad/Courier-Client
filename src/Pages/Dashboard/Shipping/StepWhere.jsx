import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import {
  FiMapPin,
  FiPackage,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
} from "react-icons/fi";

const StepWhere = ({ formData, setFormData, errors }) => {
  const axiosPublic = useAxiosPublic();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await axiosPublic.get("/categories", { params: { status: "active" } }))
        .data,
  });

  const { data: courierRates = [] } = useQuery({
    queryKey: ["courierRates", formData.categoryId],
    enabled: !!formData.categoryId,
    queryFn: async () =>
      (
        await axiosPublic.get("/courierRates", {
          params: {
            categoryId: formData.categoryId,
            status: "active",
          },
        })
      ).data,
  });

  const availableCountries = [
    ...new Map(
      courierRates.map((rate) => [
        rate.countryId,
        { _id: rate.countryId, name: rate.variations?.[0]?.countryName },
      ]),
    ).values(),
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Where does your shipment come from?
        </h2>

        {/* Personal Info Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FiUser /> Full Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your full name"
              className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border 
    ${errors.name ? "border-red-500" : "border-gray-200"}
    focus:ring-2 focus:ring-yellow-400 outline-none transition`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FiMail /> Email
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border 
    ${errors.email ? "border-red-500" : "border-gray-200"}
    focus:ring-2 focus:ring-yellow-400 outline-none transition`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FiPhone /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter phone number"
              className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border 
    ${errors.phone ? "border-red-500" : "border-gray-200"}
    focus:ring-2 focus:ring-yellow-400 outline-none transition`}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FiPackage /> Company Name (Optional)
            </label>
            <input
              type="text"
              value={formData.company || ""}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Enter company name"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition"
            />
          </div>
        </div>

        {/* Full Address */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
            <FiHome /> Full Address
          </label>
          <textarea
            value={formData.address || ""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter full address"
            rows={3}
            className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border 
    ${errors.address ? "border-red-500" : "border-gray-200"}
    focus:ring-2 focus:ring-yellow-400 outline-none transition`}
          />

          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
            <FiPackage /> Shipment Type
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
            <FiMapPin /> Destination Country
          </label>
          <select
            value={formData.countryId}
            onChange={(e) =>
              setFormData({ ...formData, countryId: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none transition"
          >
            <option value="">Select Country</option>
            {availableCountries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepWhere;
