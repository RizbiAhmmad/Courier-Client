import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
} from "react-icons/fa";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const AllCourierRates = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

  const { data: courierRates = [], refetch } = useQuery({
    queryKey: ["courierRates"],
    queryFn: async () => (await axiosPublic.get("/courierRates")).data,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await axiosPublic.get("/categories")).data,
  });

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => (await axiosPublic.get("/countries")).data,
  });

  const getCategoryName = (id) =>
    categories.find((c) => c._id === id)?.name || "N/A";

  const getCountryName = (id) =>
    countries.find((c) => c._id === id)?.name || "N/A";

  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

  const openEditModal = (rate) => {
    setSelectedRate(JSON.parse(JSON.stringify(rate)));
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      text: "This will permanently delete the rate.",
      icon: "warning",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axiosPublic.delete(`/courierRates/${id}`);
        refetch();
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const updateVariationRange = (vIndex, rIndex, field, value) => {
    const updated = { ...selectedRate };
    updated.variations[vIndex].ranges[rIndex][field] = Number(value);
    setSelectedRate(updated);
  };

  const addRange = (vIndex) => {
    const updated = { ...selectedRate };
    updated.variations[vIndex].ranges.push({
      minWeight: 0,
      maxWeight: 0,
      rate: 0,
    });
    setSelectedRate(updated);
  };

  const removeRange = (vIndex, rIndex) => {
    const updated = { ...selectedRate };
    updated.variations[vIndex].ranges.splice(rIndex, 1);
    setSelectedRate(updated);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axiosPublic.put(`/courierRates/${selectedRate._id}`, selectedRate);
    setIsModalOpen(false);
    refetch();
    Swal.fire("Updated!", "Courier Rate Updated", "success");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Courier Rates</h2>

      {isDemo && (
        <p className="mb-4 text-sm text-orange-500 font-semibold text-center">
          🧩 Demo Mode Active — Changes are temporary only.
        </p>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/dashboard/addCourierRate")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-linear-to-r from-yellow-400 to-orange-500 rounded-xl hover:from-yellow-500 hover:to-orange-600"
        >
          <FaPlus /> Add Courier Rate
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-sm">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-2 w-10"></th>
              <th className="px-6 py-2 text-left">Category</th>
              <th className="px-6 py-2 text-left">Country</th>
              <th className="px-6 py-2 text-left">Status</th>
              <th className="px-6 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courierRates.map((rate) => (
              <React.Fragment key={rate._id}>
                <tr className="bg-white shadow-sm hover:shadow-md transition rounded-xl">
                  <td className="px-6 py-4 rounded-l-xl">
                    <button
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === rate._id ? null : rate._id,
                        )
                      }
                      className={`transition-transform duration-300 ${
                        expandedRow === rate._id ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown className="text-gray-600" />
                    </button>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {getCategoryName(rate.categoryId)}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {getCountryName(rate.countryId)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        rate.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {rate.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 rounded-r-xl">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(rate)}
                        className="p-2 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition"
                      >
                        <FaEdit className="text-cyan-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(rate._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedRow === rate._id && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 bg-gray-50 rounded-xl">
                      {rate.variations.map((v, i) => (
                        <div
                          key={i}
                          className="mb-4 bg-white p-4 rounded-lg shadow-sm"
                        >
                          <h4 className="font-semibold mb-3 text-gray-700">
                            {v.courierTypeName}
                          </h4>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            {v.ranges.map((r, ri) => (
                              <div
                                key={ri}
                                className="bg-gray-50 p-3 rounded-lg border"
                              >
                                <div>Min: {r.minWeight} kg</div>
                                <div>Max: {r.maxWeight} kg</div>
                                <div className="font-medium">
                                  Rate: {r.rate}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* FULL EDIT MODAL */}
      {isModalOpen && selectedRate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="relative flex items-center px-6 py-4 border-b bg-linear-to-r from-orange-400 to-orange-500 rounded-t-2xl">
              {/* Center Title */}
              <h3 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-white">
                Edit Courier Rate
              </h3>

              {/* Right Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-auto text-white text-xl hover:text-red-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={selectedRate.status}
                  onChange={(e) =>
                    setSelectedRate({
                      ...selectedRate,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Variations */}
              {selectedRate.variations.map((v, vIndex) => (
                <div
                  key={vIndex}
                  className="p-5 border rounded-xl bg-gray-50 shadow-sm"
                >
                  <h4 className="mb-4 font-semibold text-gray-700">
                    {v.courierTypeName}
                  </h4>

                  {v.ranges.map((range, rIndex) => (
                    <div key={rIndex} className="grid grid-cols-4 gap-4 mb-3">
                      <input
                        type="number"
                        placeholder="Min Weight"
                        value={range.minWeight}
                        onChange={(e) =>
                          updateVariationRange(
                            vIndex,
                            rIndex,
                            "minWeight",
                            e.target.value,
                          )
                        }
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                      />

                      <input
                        type="number"
                        placeholder="Max Weight"
                        value={range.maxWeight}
                        onChange={(e) =>
                          updateVariationRange(
                            vIndex,
                            rIndex,
                            "maxWeight",
                            e.target.value,
                          )
                        }
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                      />

                      <input
                        type="number"
                        placeholder="Rate"
                        value={range.rate}
                        onChange={(e) =>
                          updateVariationRange(
                            vIndex,
                            rIndex,
                            "rate",
                            e.target.value,
                          )
                        }
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeRange(vIndex, rIndex)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addRange(vIndex)}
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    + Add Range
                  </button>
                </div>
              ))}

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow hover:scale-105 transition"
                >
                  Update Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourierRates;
