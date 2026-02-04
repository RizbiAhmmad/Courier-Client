import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const AddCourierRate = () => {
  const axiosPublic = useAxiosPublic();

  // Form states
  const [categoryId, setCategoryId] = useState("");
  const [courierTypeIds, setCourierTypeIds] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [generatedVariations, setGeneratedVariations] = useState([]);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  // Fetch courier types
  const { data: courierTypes = [] } = useQuery({
    queryKey: ["courierTypes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courierTypes");
      return res.data;
    },
  });

  // Fetch countries
  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axiosPublic.get("/countries");
      return res.data;
    },
  });

  // Handle courier type select
  const toggleCourierType = (id) => {
    if (courierTypeIds.includes(id)) {
      setCourierTypeIds(courierTypeIds.filter((c) => c !== id));
    } else {
      setCourierTypeIds([...courierTypeIds, id]);
    }
  };

  // Generate variations
  const generateVariations = () => {
    if (!categoryId || !countryId || courierTypeIds.length === 0) {
      Swal.fire(
        "Error",
        "Please select category, country & courier types",
        "error",
      );
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
        weight: 1,
        rate: 0,
      };
    });

    setGeneratedVariations(variations);
  };

  // Update variation
  const updateVariation = (index, field, value) => {
    const updated = [...generatedVariations];
    updated[index][field] = value;
    setGeneratedVariations(updated);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (generatedVariations.length === 0) {
      Swal.fire("Error", "Please generate variations first", "error");
      return;
    }

    const payload = {
      categoryId,
      courierTypeIds,
      countryId,
      variations: generatedVariations,
      status: "active",
    };

    try {
      const res = await axiosPublic.post("/courierRates", payload);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success", "Courier rates added successfully!", "success");
        // reset form
        setCategoryId("");
        setCourierTypeIds([]);
        setCountryId("");
        setGeneratedVariations([]);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save data", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Courier Rates</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Courier Type */}
        <div>
          <label className="block mb-1 font-semibold">Courier Types</label>
          <div className="flex flex-wrap gap-2">
            {courierTypes.map((ct) => (
              <button
                key={ct._id}
                type="button"
                className={`px-3 py-1 rounded border ${
                  courierTypeIds.includes(ct._id)
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => toggleCourierType(ct._id)}
              >
                {ct.name}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-semibold">Country</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            onClick={generateVariations}
          >
            Generate Variations
          </button>
        </div>

        {/* Variations Table */}
        {generatedVariations.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Courier Type</th>
                  <th className="px-3 py-2 border">Country</th>
                  <th className="px-3 py-2 border">Weight</th>
                  <th className="px-3 py-2 border">Rate</th>
                </tr>
              </thead>
              <tbody>
                {generatedVariations.map((v, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-1">{v.courierTypeName}</td>
                    <td className="px-2 py-1">{v.countryName}</td>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        className="w-full border px-2 py-1 rounded"
                        value={v.weight}
                        onChange={(e) =>
                          updateVariation(i, "weight", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        className="w-full border px-2 py-1 rounded"
                        value={v.rate}
                        onChange={(e) =>
                          updateVariation(i, "rate", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Save Courier Rates
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourierRate;
