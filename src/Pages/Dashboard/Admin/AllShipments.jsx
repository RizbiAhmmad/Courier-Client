import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "@/Pages/Shared/Loading";

const AllShipments = () => {
  const axiosPublic = useAxiosPublic();
  const [openId, setOpenId] = useState(null);

  // ✅ new states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: shipments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["shipments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/shipments");
      return res.data;
    },
  });

  // ✅ filter logic
  const filteredShipments = shipments.filter((shipment) => {
    const searchMatch =
      shipment.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.name?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.phone?.includes(search);

    const statusMatch =
      statusFilter === "all" || shipment.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: "Change Status?",
      text: `Set status to "${newStatus}" ?`,
      icon: "question",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosPublic.patch(`/shipments/${id}`, {
        status: newStatus,
      });

      refetch();

      Swal.fire("Updated!", "Shipment status updated.", "success");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This shipment will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/shipments/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Shipment removed.", "success");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        All Shipment Orders
      </h2>

      {/* ✅ Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by tracking id, name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-48 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Tracking ID</th>
              <th className="px-6 py-3">Sender</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Courier</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredShipments.map((shipment, index) => (
              <>
                <tr key={shipment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    {shipment.trackingId}
                  </td>
                  <td className="px-6 py-4">{shipment.name}</td>
                  <td className="px-6 py-4">{shipment.phone}</td>
                  <td className="px-6 py-4">{shipment.countryName}</td>
                  <td className="px-6 py-4">{shipment.courierTypeName}</td>
                  <td className="px-6 py-4 font-semibold text-purple-600">
                    ৳ {shipment.totalShipping}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={shipment.status}
                      onChange={(e) =>
                        handleStatusChange(shipment._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold border outline-none ${
                        shipment.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : shipment.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>

                  <td className="flex gap-4 px-6 py-6">
                    <button
                      onClick={() =>
                        setOpenId(openId === shipment._id ? null : shipment._id)
                      }
                      className="text-cyan-500"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleDelete(shipment._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                {openId === shipment._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="9" className="px-8 py-6">
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h4 className="font-semibold mb-2">Sender Details</h4>
                          <p><strong>Email:</strong> {shipment.email}</p>
                          <p><strong>Address:</strong> {shipment.address}</p>
                          <p><strong>Company:</strong> {shipment.company}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Package Details</h4>

                          {shipment.packages?.map((box, i) => (
                            <div
                              key={i}
                              className="border rounded-lg p-3 mb-3 bg-white shadow-sm"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <p className="font-medium">
                                  Box {i + 1} ({box.weight}kg)
                                </p>

                                <p className="font-semibold text-green-600">
                                  ৳ {box.shippingCost || 0}
                                </p>
                              </div>

                              <p>
                                Size: {box.length} × {box.width} × {box.height}
                              </p>

                              <div className="mt-2">
                                {box.items?.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-xs border-b py-1"
                                  >
                                    <span>{item.itemName}</span>
                                    <span>Qty: {item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}

            {filteredShipments.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No shipment orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllShipments;