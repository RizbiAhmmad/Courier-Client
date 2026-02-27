import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

const StepOverview = ({ formData, onSuccess }) => {
  const axiosPublic = useAxiosPublic();

  const { data: category } = useQuery({
    queryKey: ["singleCategory", formData.categoryId],
    enabled: !!formData.categoryId,
    queryFn: async () =>
      (await axiosPublic.get(`/categories/${formData.categoryId}`)).data,
  });

  const { data: rateData } = useQuery({
    queryKey: ["singleRateOverview", formData.categoryId, formData.countryId],
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

  const getSelectedVariation = () => {
    return rateData?.variations?.find(
      (v) => v.courierTypeId === formData.courierTypeId,
    );
  };

  const getBoxRate = (weight) => {
    const variation = getSelectedVariation();
    if (!variation) return 0;

    const range = variation.ranges?.find(
      (r) =>
        Number(weight) >= Number(r.minWeight) &&
        Number(weight) <= Number(r.maxWeight),
    );

    return range ? Number(range.rate) : 0;
  };

  const packages = formData.packages || [];

  const totalShipping = packages.reduce((total, box) => {
    return total + getBoxRate(box.weight);
  }, 0);

  const handleConfirm = async () => {
    try {
      const payload = {
        ...formData,
        totalShipping,
        status: "pending",
      };

      await axiosPublic.post("/shipments", payload);

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-100 space-y-10">
        <h2 className="text-3xl font-extrabold text-center bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Review Your Shipment
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FiUser /> Sender Information
            </h3>

            <p>
              <FiUser className="inline mr-2" /> {formData.name}
            </p>
            <p>
              <FiMail className="inline mr-2" /> {formData.email}
            </p>
            <p>
              <FiPhone className="inline mr-2" /> {formData.phone}
            </p>
            {formData.company && (
              <p>
                <FiPackage className="inline mr-2" /> {formData.company}
              </p>
            )}
            <p>
              <FiHome className="inline mr-2" /> {formData.address}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FiPackage /> Shipment Details
            </h3>

            <p>
              <strong>Category:</strong> {category?.name || "—"}
            </p>

            <p>
              <strong>Destination:</strong>{" "}
              {rateData?.variations?.[0]?.countryName || "—"}
            </p>

            <p>
              <strong>Courier Service:</strong>{" "}
              {getSelectedVariation()?.courierTypeName || "—"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FiTruck /> Package Details
          </h3>

          {packages.map((box, boxIndex) => {
            const boxRate = getBoxRate(box.weight);

            return (
              <div
                key={boxIndex}
                className="bg-white rounded-2xl p-6 border shadow-sm space-y-4"
              >
                <h4 className="font-semibold">Box {boxIndex + 1}</h4>

                <div className="grid md:grid-cols-4 gap-4">
                  <p>
                    <strong>Length:</strong> {box.length}
                  </p>
                  <p>
                    <strong>Width:</strong> {box.width}
                  </p>
                  <p>
                    <strong>Height:</strong> {box.height}
                  </p>
                  <p>
                    <strong>Weight:</strong> {box.weight}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Items:</h5>
                  {box.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-gray-50 px-4 py-2 rounded-xl border"
                    >
                      <span>{item.itemName}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {boxRate > 0 && (
                  <div className="text-right font-semibold text-green-600">
                    Shipping Cost: ৳ {boxRate}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl text-center text-xl font-bold shadow-lg">
          Total Shipping Cost: ৳ {totalShipping}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleConfirm}
            className="px-10 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Confirm Shipment
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOverview;
