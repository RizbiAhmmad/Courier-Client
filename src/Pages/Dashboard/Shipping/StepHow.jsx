import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FiTruck } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const StepHow = ({ formData, setFormData, errors }) => {
  const axiosPublic = useAxiosPublic();

  const { data: rateData } = useQuery({
    queryKey: ["singleRate", formData.categoryId, formData.countryId],
    enabled: !!formData.categoryId && !!formData.countryId,
    queryFn: async () =>
      (
        await axiosPublic.get("/courierRates", {
          params: {
            categoryId: formData.categoryId,
            countryId: formData.countryId,
            status: "active",
          },
        })
      ).data[0],
  });

  const packages = formData.packages || [];

  const getBoxRate = (weight) => {
    if (!formData.courierTypeId || !rateData) return null;

    const selectedVariation = rateData.variations?.find(
      (v) => v.courierTypeId === formData.courierTypeId,
    );

    if (!selectedVariation) return null;

    const matchedRange = selectedVariation.ranges?.find(
      (r) =>
        Number(weight) >= Number(r.minWeight) &&
        Number(weight) <= Number(r.maxWeight),
    );

    return matchedRange ? Number(matchedRange.rate) : null;
  };

  const totalShipping = packages.reduce((total, box) => {
    const rate = getBoxRate(box.weight);
    return total + (rate ? rate : 0);
  }, 0);

  const addBox = () => {
    setFormData({
      ...formData,
      packages: [
        ...packages,
        {
          weight: "",
          length: "",
          width: "",
          height: "",
          items: [{ itemName: "", quantity: 1 }],
        },
      ],
    });
  };

  const addItem = (boxIndex) => {
    const updated = [...packages];
    updated[boxIndex].items.push({ itemName: "", quantity: 1 });
    setFormData({ ...formData, packages: updated });
  };

  const deleteBox = (boxIndex) => {
    if (packages.length === 1) return;

    const updated = packages.filter((_, index) => index !== boxIndex);
    setFormData({ ...formData, packages: updated });
  };

  const deleteItem = (boxIndex, itemIndex) => {
    const updated = [...packages];
    if (updated[boxIndex].items.length === 1) return;

    updated[boxIndex].items = updated[boxIndex].items.filter(
      (_, index) => index !== itemIndex,
    );

    setFormData({ ...formData, packages: updated });
  };

  const updateBoxField = (boxIndex, field, value) => {
    const updated = [...packages];
    updated[boxIndex][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const updateItemField = (boxIndex, itemIndex, field, value) => {
    const updated = [...packages];
    updated[boxIndex].items[itemIndex][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FiTruck /> Package Information
        </h2>

        <div className="mb-8">
          <label className="block text-md font-semibold mb-2">
            Courier Service
          </label>

          <select
  value={formData.courierTypeId}
  onChange={(e) =>
    setFormData({ ...formData, courierTypeId: e.target.value })
  }
  className={`w-full px-4 py-3 rounded-xl border
    ${errors.courierTypeId ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-yellow-400 outline-none`}
>
  <option value="">Select Courier Type</option>
  {rateData?.variations?.map((v) => (
    <option key={v.courierTypeId} value={v.courierTypeId}>
      {v.courierTypeName}
    </option>
  ))}
</select>

{errors.courierTypeId && (
  <p className="text-red-500 text-sm mt-1">
    {errors.courierTypeId}
  </p>
)}
        </div>

        {packages.map((box, boxIndex) => {
          const boxRate = getBoxRate(box.weight);

          return (
            <div
              key={boxIndex}
              className="border rounded-2xl p-6 mb-6 bg-gray-50 relative"
            >
              {/* Delete Box */}
              {packages.length > 1 && (
                <button
                  onClick={() => deleteBox(boxIndex)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}

              <h3 className="font-semibold mb-4">Box {boxIndex + 1}</h3>

              {/* Dimensions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["length", "width", "height", "weight"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    placeholder={field}
                    value={box[field]}
                    onChange={(e) =>
                      updateBoxField(boxIndex, field, e.target.value)
                    }
                    className="p-3 border rounded-xl"
                  />
                ))}
              </div>

              {/* Show Box Rate */}
              {box.weight && boxRate && (
                <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                  Shipping Cost: ৳ {boxRate}
                </div>
              )}

              {/* Items */}
              {box.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="grid grid-cols-4 gap-4 mb-4 items-center"
                >
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) =>
                      updateItemField(
                        boxIndex,
                        itemIndex,
                        "itemName",
                        e.target.value,
                      )
                    }
                    className="p-3 border rounded-xl col-span-2"
                  />

                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItemField(
                        boxIndex,
                        itemIndex,
                        "quantity",
                        e.target.value,
                      )
                    }
                    className="p-3 border rounded-xl"
                  />

                  {box.items.length > 1 && (
                    <button
                      onClick={() => deleteItem(boxIndex, itemIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => addItem(boxIndex)}
                className="text-sm text-blue-600 mt-2"
              >
                + Add more Item
              </button>
            </div>
          );
        })}

        {/* Add Box */}
        <button onClick={addBox} className="px-4 py-2 bg-gray-200 rounded-lg">
          + Add Box
        </button>

        {/* Total Shipping */}
        {totalShipping > 0 && (
          <div className="mt-8 text-center bg-linear-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl font-bold text-lg">
            Total Shipping Cost: ৳ {totalShipping}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepHow;
