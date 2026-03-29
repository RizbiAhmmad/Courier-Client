import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { GradientText } from "@/components/ui/GradientText";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get("/shipments", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="mb-4 text-4xl text-center font-extrabold text-black dark:text-white leading-tight">
        <GradientText className="inline-block pb-1">My Orders</GradientText>
      </h2>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-xl border p-6 hover:shadow-2xl transition"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4">
                <div>
                  <p className="text-lg text-gray-900">
                    Tracking ID:{" "}
                    <span className="text-xl font-bold text-blue-600">
                      {order.trackingId}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="grid md:grid-cols-4 gap-4 mt-5 text-sm">
                <div>
                  <p className="text-gray-500">Sender</p>
                  <p className="font-medium">{order.name}</p>
                </div>

                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{order.phone}</p>
                </div>

                <div>
                  <p className="text-gray-500">Destination</p>
                  <p className="font-medium">{order.countryName}</p>
                </div>

                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-medium">{order.courierTypeName}</p>
                </div>
              </div>

              {/* Packages */}
              <div className="mt-6 space-y-4">
                {order.packages?.map((box, i) => (
                  <div key={i} className="bg-gray-50 border rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">
                        📦 Box {i + 1} ({box.weight}kg)
                      </p>
                      <p className="text-green-600 font-bold">
                        ৳ {box.shippingCost}
                      </p>
                    </div>

                    {/* <p className="text-xs text-gray-500 mb-2">
                      Size: {box.length} × {box.width} × {box.height}
                    </p> */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                      <div className="bg-white border rounded-lg p-2 text-center">
                        <p className="text-gray-400 text-xs">Weight</p>
                        <p className="font-semibold text-blue-600">
                          {box.weight} kg
                        </p>
                      </div>

                      <div className="bg-white border rounded-lg p-2 text-center">
                        <p className="text-gray-400 text-xs">Length</p>
                        <p className="font-semibold">{box.length}</p>
                      </div>

                      <div className="bg-white border rounded-lg p-2 text-center">
                        <p className="text-gray-400 text-xs">Width</p>
                        <p className="font-semibold">{box.width}</p>
                      </div>

                      <div className="bg-white border rounded-lg p-2 text-center">
                        <p className="text-gray-400 text-xs">Height</p>
                        <p className="font-semibold">{box.height}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {box.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm bg-white px-3 py-1 rounded-lg border"
                        >
                          <span>{item.itemName}</span>
                          <span className="text-gray-500">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <p className="text-sm text-gray-500">
                  {order.packages?.length} Package(s)
                </p>

                <p className="text-xl font-bold text-purple-600">
                  ৳ {order.totalShipping}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
