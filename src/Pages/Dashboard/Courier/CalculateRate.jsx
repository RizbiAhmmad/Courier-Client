import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useState } from "react";

const CalculateRate = () => {
  const { state } = useLocation();
  const axiosPublic = useAxiosPublic();

  const [selectedType, setSelectedType] = useState("");
  const [weight, setWeight] = useState("");

  const { categoryId, countryId } = state || {};

  // Fetch specific rate
  const { data: rateData } = useQuery({
    queryKey: ["singleRate", categoryId, countryId],
    enabled: !!categoryId && !!countryId,
    queryFn: async () => {
      const res = await axiosPublic.get("/courierRates", {
        params: {
          categoryId,
          countryId,
          status: "active",
        },
      });
      return res.data[0]; // single rate
    },
  });

  // Find selected courier type
  const selectedVariation = rateData?.variations?.find(
    (v) => v.courierTypeId === selectedType
  );

  // Find weight range
  const matchedRange = selectedVariation?.ranges?.find(
    (r) => weight >= r.minWeight && weight <= r.maxWeight
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Calculate Shipping Rate
      </h2>

      {/* Courier Type */}
      <div className="mb-4">
        <label>Courier Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Type</option>
          {rateData?.variations?.map((v) => (
            <option key={v.courierTypeId} value={v.courierTypeId}>
              {v.courierTypeName}
            </option>
          ))}
        </select>
      </div>

      {/* Weight Input */}
      <div className="mb-4">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      {/* Rate Show */}
      {matchedRange && (
        <div className="mt-6 p-6 bg-green-50 rounded-xl text-center">
          <h3 className="text-lg font-semibold text-green-700">
            Shipping Cost: ৳ {matchedRange.rate}
          </h3>
        </div>
      )}

      {!matchedRange && weight && (
        <p className="text-red-500 mt-4 text-center">
          No rate found for this weight range.
        </p>
      )}
    </div>
  );
};

export default CalculateRate;