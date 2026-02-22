import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";

const AddCourierRate = () => {
  const axiosPublic = useAxiosPublic();

  const [categoryId, setCategoryId] = useState("");
  const [courierTypeIds, setCourierTypeIds] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [generatedVariations, setGeneratedVariations] = useState([]);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await axiosPublic.get("/categories")).data,
  });

  const { data: courierTypes = [] } = useQuery({
    queryKey: ["courierTypes"],
    queryFn: async () => (await axiosPublic.get("/courierTypes")).data,
  });

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => (await axiosPublic.get("/countries")).data,
  });

  const toggleCourierType = (id) => {
    setCourierTypeIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const generateVariations = () => {
    if (!categoryId || !countryId || courierTypeIds.length === 0) {
      Swal.fire("Error", "Select category, country & courier types", "error");
      return;
    }

    const variations = courierTypeIds.map((ctId) => {
      const ctName = courierTypes.find((c) => c._id === ctId)?.name;
      const countryName = countries.find((c) => c._id === countryId)?.name;

      return {
        courierTypeId: ctId,
        courierTypeName: ctName,
        countryId,
        countryName,
        ranges: [{ minWeight: 1, maxWeight: 9, rate: 0 }],
      };
    });

    setGeneratedVariations(variations);
  };

  const updateRange = (variationIndex, rangeIndex, field, value) => {
    const updated = [...generatedVariations];
    updated[variationIndex].ranges[rangeIndex][field] = value;
    setGeneratedVariations(updated);
  };

  const addNewRange = (variationIndex) => {
    const updated = [...generatedVariations];
    updated[variationIndex].ranges.push({ minWeight: 0, maxWeight: 0, rate: 0 });
    setGeneratedVariations(updated);
  };

  const removeRange = (variationIndex, rangeIndex) => {
    const updated = [...generatedVariations];
    updated[variationIndex].ranges.splice(rangeIndex, 1);
    setGeneratedVariations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!generatedVariations.length) {
      Swal.fire("Error", "Generate variations first", "error");
      return;
    }

    try {
      const payload = { categoryId, countryId, variations: generatedVariations, status: "active" };
      const res = await axiosPublic.post("/courierRates", payload);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success", "Courier rates added!", "success");
        setCategoryId(""); setCourierTypeIds([]); setCountryId(""); setGeneratedVariations([]);
      }
    } catch {
      Swal.fire("Error", "Failed to save data", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="mb-8 text-3xl font-extrabold text-center text-black">
        Add Courier Rates
      </h2>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Selection Card */}
        <div className="bg-linear-to-r from-white/80 to-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-5 py-3 border rounded-2xl focus:ring-4 focus:ring-yellow-300 outline-none shadow-sm hover:shadow-md transition"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Country</label>
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full px-5 py-3 border rounded-2xl focus:ring-4 focus:ring-yellow-300 outline-none shadow-sm hover:shadow-md transition"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold mb-3">Courier Types</label>
            <div className="flex flex-wrap gap-3">
              {courierTypes.map((ct) => (
                <button
                  key={ct._id}
                  type="button"
                  onClick={() => toggleCourierType(ct._id)}
                  className={`px-5 py-2 rounded-full border font-medium transition-all duration-200 ${
                    courierTypeIds.includes(ct._id)
                      ? "bg-yellow-500 text-white shadow-lg scale-105"
                      : "bg-white hover:bg-yellow-50 shadow-sm"
                  }`}
                >
                  {ct.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={generateVariations}
              className="px-8 py-3 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform font-semibold"
            >
              Generate Variations
            </button>
          </div>
        </div>

        {/* Variations */}
        <AnimatePresence>
          {generatedVariations.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-gray-700">{v.courierTypeName} - {v.countryName}</h4>
                <button
                  type="button"
                  onClick={() => addNewRange(i)}
                  className="text-sm px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                >
                  + Add Range
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-500 mb-2">
                <div>Min (kg)</div>
                <div>Max (kg)</div>
                <div>Rate ($)</div>
                <div></div>
              </div>

              {/* Ranges */}
              {v.ranges.map((range, rIndex) => (
                <div key={rIndex} className="grid grid-cols-4 gap-4 mb-3 items-center">
                  <input
                    type="number"
                    value={range.minWeight}
                    onChange={(e) => updateRange(i, rIndex, "minWeight", Number(e.target.value))}
                    className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none shadow-sm transition"
                  />
                  <input
                    type="number"
                    value={range.maxWeight}
                    onChange={(e) => updateRange(i, rIndex, "maxWeight", Number(e.target.value))}
                    className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none shadow-sm transition"
                  />
                  <input
                    type="number"
                    value={range.rate}
                    onChange={(e) => updateRange(i, rIndex, "rate", Number(e.target.value))}
                    className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none shadow-sm transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeRange(i, rIndex)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Save Button */}
        {generatedVariations.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-12 py-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-3xl shadow-2xl hover:scale-105 transition-transform"
            >
              Save Courier Rates
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCourierRate;