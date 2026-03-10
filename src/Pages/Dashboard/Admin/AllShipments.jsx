import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "@/Pages/Shared/Loading";

const AllShipments = () => {
  const axiosPublic = useAxiosPublic();
  const [openId, setOpenId] = useState(null);

  // edit states
  const [editShipment, setEditShipment] = useState(null);
  const [formData, setFormData] = useState({});

  //  new states
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

  // filter logic
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

  const handleEdit = (shipment) => {
    setEditShipment(shipment);

    setFormData({
      name: shipment.name,
      phone: shipment.phone,
      email: shipment.email,
      address: shipment.address,
      company: shipment.company,
      status: shipment.status,
      packages: shipment.packages || [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePackageChange = (e, boxIndex, field) => {
    const updated = [...formData.packages];
    updated[boxIndex][field] = e.target.value;

    setFormData({
      ...formData,
      packages: updated,
    });
  };

  const handleItemChange = (e, boxIndex, itemIndex, field) => {
    const updated = [...formData.packages];
    updated[boxIndex].items[itemIndex][field] = e.target.value;

    setFormData({
      ...formData,
      packages: updated,
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosPublic.put(`/shipments/${editShipment._id}`, formData);

      Swal.fire("Updated!", "Shipment updated successfully.", "success");

      setEditShipment(null);
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Failed to update shipment.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        All Shipment Orders
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by tracking id, name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-400"
        />

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
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Tracking ID</th>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Courier</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredShipments.map((shipment, index) => (
              <>
                <tr key={shipment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold text-blue-600">
                    {shipment.trackingId}
                  </td>
                  <td className="px-4 py-4">{shipment.name}</td>
                  <td className="px-4 py-4">{shipment.phone}</td>
                  <td className="px-4 py-4">{shipment.categoryName}</td>
                  <td className="px-4 py-4">{shipment.countryName}</td>
                  <td className="px-4 py-4">{shipment.courierTypeName}</td>
                  <td className="px-4 py-4 font-semibold text-purple-600">
                    ৳ {shipment.totalShipping}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(shipment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <select
                      value={shipment.status}
                      onChange={(e) =>
                        handleStatusChange(shipment._id, e.target.value)
                      }
                      className="px-2 py-1 rounded text-xs font-semibold border outline-none"
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
                      onClick={() => handleEdit(shipment)}
                      className="text-green-600"
                    >
                      <FaEdit />
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
          </tbody>
        </table>
      </div>

      {editShipment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-225 max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">Edit Shipment</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">

              <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
              <input name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
              <input name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
              <input name="company" value={formData.company} onChange={handleChange} className="border p-2 rounded" />

              <input name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded col-span-2" />

            </div>

            <h3 className="font-semibold mb-3">Packages</h3>

            {formData.packages?.map((box, boxIndex) => (

              <div key={boxIndex} className="border rounded-lg p-4 mb-4">

                <div className="grid grid-cols-4 gap-3 mb-3">

                  <input value={box.weight} onChange={(e)=>handlePackageChange(e,boxIndex,"weight")} className="border p-2 rounded" />
                  <input value={box.length} onChange={(e)=>handlePackageChange(e,boxIndex,"length")} className="border p-2 rounded" />
                  <input value={box.width} onChange={(e)=>handlePackageChange(e,boxIndex,"width")} className="border p-2 rounded" />
                  <input value={box.height} onChange={(e)=>handlePackageChange(e,boxIndex,"height")} className="border p-2 rounded" />

                </div>

                <input value={box.shippingCost} onChange={(e)=>handlePackageChange(e,boxIndex,"shippingCost")} className="border p-2 rounded mb-3" />

                {box.items?.map((item,itemIndex)=>(

                  <div key={itemIndex} className="flex gap-2 mb-2">

                    <input
                      value={item.itemName}
                      onChange={(e)=>handleItemChange(e,boxIndex,itemIndex,"itemName")}
                      className="border p-2 rounded w-full"
                    />

                    <input
                      value={item.quantity}
                      onChange={(e)=>handleItemChange(e,boxIndex,itemIndex,"quantity")}
                      className="border p-2 rounded w-24"
                    />

                  </div>

                ))}

              </div>

            ))}

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={()=>setEditShipment(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update Shipment
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AllShipments;