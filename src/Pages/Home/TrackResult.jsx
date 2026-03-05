import { useLocation } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiMapPin,
  FiUser,
  FiPhone,
  FiHash,
} from "react-icons/fi";

const TrackResult = () => {
  const location = useLocation();
  const data = location.state;

  if (!data)
    return (
      <div className="text-center py-20 text-gray-500">
        No tracking data found
      </div>
    );

  const getStatusStep = () => {
    if (data.status === "pending") return 1;
    if (data.status === "processing") return 2;
    if (data.status === "shipped") return 3;
    if (data.status === "delivered") return 4;
    return 1;
  };

  const step = getStatusStep();

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Shipment Tracking
          </h2>

          <p className="text-gray-500 mt-2">
            Tracking ID:{" "}
            <span className="font-semibold">{data.trackingId}</span>
          </p>
        </div>

        {/* STATUS TIMELINE */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <div className="flex justify-between items-center">

            {["Pending", "Processing", "Shipped", "Delivered"].map(
              (label, index) => {
                const active = step >= index + 1;

                return (
                  <div
                    key={label}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2
                      ${
                        active
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <p
                      className={`mt-2 text-sm font-medium ${
                        active ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* MAIN INFO */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          {/* CUSTOMER */}
          <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiUser /> Customer Information
            </h3>

            <p className="flex items-center gap-2 mb-2">
              <FiUser /> {data.name}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <FiPhone /> {data.phone}
            </p>

            <p className="flex items-center gap-2">
              <FiMapPin /> {data.address}
            </p>
          </div>

          {/* SHIPMENT */}
          <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiTruck /> Shipment Details
            </h3>

            <p className="flex items-center gap-2 mb-2">
              <FiHash /> Tracking ID: {data.trackingId}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <FiMapPin /> Country: {data.countryName}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <FiTruck /> Courier: {data.courierTypeName}
            </p>

            <p className="font-semibold text-green-600">
              Status: {data.status}
            </p>
          </div>
        </div>

        {/* PACKAGES */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiPackage /> Package Details
          </h3>

          {data.packages?.map((box, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 mb-6 bg-gray-50"
            >
              <h4 className="font-semibold mb-4">
                Box {index + 1}
              </h4>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <p>
                  <strong>Weight:</strong> {box.weight} kg
                </p>

                <p>
                  <strong>Length:</strong> {box.length}
                </p>

                <p>
                  <strong>Width:</strong> {box.width}
                </p>

                <p>
                  <strong>Height:</strong> {box.height}
                </p>
              </div>

              {/* ITEMS */}
              {box.items?.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Items</h5>

                  {box.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-white border px-4 py-2 rounded-lg mb-2"
                    >
                      <span>{item.itemName}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-right mt-4 font-semibold text-green-600">
                Shipping Cost: ৳ {box.shippingCost}
              </div>
            </div>
          ))}

          <div className="text-right text-2xl font-bold text-purple-600">
            Total Shipping: ৳ {data.totalShipping}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackResult;