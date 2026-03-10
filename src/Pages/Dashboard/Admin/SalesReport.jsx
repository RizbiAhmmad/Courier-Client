import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SalesReport = () => {
  const axiosPublic = useAxiosPublic();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: sales = [], refetch } = useQuery({
    queryKey: ["sales", startDate, endDate],
    queryFn: async () => {
      const res = await axiosPublic.get("/sales-report", {
        params: { startDate, endDate },
      });
      return res.data;
    },
  });

  const chartData = sales.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    total: Number(item.totalShipping),
  }));

  const totalSales = sales.reduce(
    (sum, item) => sum + Number(item.totalShipping || 0),
    0
  );

  // ------------------------
  // Excel Export Function
  // ------------------------
  const exportToExcel = () => {
    // Map sales data
    const worksheetData = sales.map((item) => ({
      Tracking: item.trackingId,
      Customer: item.name,
      Phone: item.phone,
      Courier: item.courierTypeName,
      Revenue: item.totalShipping,
      Date: new Date(item.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, `SalesReport_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-4xl font-bold">Sales Dashboard</h2>

        <div className="flex gap-3 flex-wrap">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />

          <button
            onClick={refetch}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>

          {/* Excel Export Button */}
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
          <p className="opacity-80">Total Orders</p>
          <h3 className="text-4xl font-bold">{sales.length}</h3>
        </div>

        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <p className="opacity-80">Total Revenue</p>
          <h3 className="text-4xl font-bold">৳ {totalSales}</h3>
        </div>

        <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <p className="opacity-80">Average Order</p>
          <h3 className="text-4xl font-bold">
            ৳ {sales.length ? Math.round(totalSales / sales.length) : 0}
          </h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="total"
                fill="url(#colorRevenue)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                stroke="#6366f1"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Tracking</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Courier</th>
              <th className="px-6 py-4 text-left">Revenue</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-blue-600">
                  {item.trackingId}
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.courierTypeName}</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ৳ {item.totalShipping}
                </td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;