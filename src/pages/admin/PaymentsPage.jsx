import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { IndianRupee, CheckCircle, XCircle } from "lucide-react";

const PaymentsPage = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const payments = [
    { id: 1, name: "Rahul", plan: "Gold", amount: 999, status: "Success", date: "2026-04-12" },
    { id: 2, name: "Sneha", plan: "Premium", amount: 1999, status: "Failed", date: "2026-04-10" },
    { id: 3, name: "Amit", plan: "Gold", amount: 999, status: "Success", date: "2026-04-08" },
    { id: 4, name: "Neha", plan: "Gold", amount: 999, status: "Refund", date: "2026-04-06" },
  ];

  // FILTER
  const filteredPayments = payments.filter((p) => {
    const matchTab =
      tab === "all" ||
      (tab === "success" && p.status === "Success") ||
      (tab === "failed" && p.status === "Failed") ||
      (tab === "refund" && p.status === "Refund");

    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = date === "" || p.date === date;

    return matchTab && matchSearch && matchDate;
  });

  // CALCULATIONS
  const totalRevenue = payments
    .filter((p) => p.status === "Success")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalTransactions = payments.length;
  const successCount = payments.filter((p) => p.status === "Success").length;
  const failedCount = payments.filter((p) => p.status === "Failed").length;

  const getStatusColor = (status) => {
    if (status === "Success") return "bg-green-100 text-green-700";
    if (status === "Failed") return "bg-red-100 text-red-700";
    if (status === "Refund") return "bg-yellow-100 text-yellow-700";
  };

  // 🔥 CSV EXPORT FUNCTION
  const exportCSV = () => {
    const headers = ["User", "Plan", "Amount", "Status", "Date"];

    const rows = filteredPayments.map((p) => [
      p.name,
      p.plan,
      p.amount,
      p.status,
      p.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "payments_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen py-6">

        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Payment Management</h1>

            <button
              onClick={exportCSV}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
            >
              Export CSV
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white p-4 rounded-xl border hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Revenue</p>
                <IndianRupee className="text-green-600" size={18} />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mt-2">
                ₹{totalRevenue}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl border hover:shadow-md transition">
              <p className="text-sm text-gray-500">Transactions</p>
              <h2 className="text-2xl font-bold mt-2">
                {totalTransactions}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl border hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Success</p>
                <CheckCircle className="text-green-600" size={18} />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mt-2">
                {successCount}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl border hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Failed</p>
                <XCircle className="text-red-600" size={18} />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mt-2">
                {failedCount}
              </h2>
            </div>

          </div>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">

            <input
              type="text"
              placeholder="Search user..."
              className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="date"
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onChange={(e) => setDate(e.target.value)}
            />

          </div>

          {/* TABS */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {["all", "success", "failed", "refund"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  tab === t
                    ? "bg-black text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-600 text-xs font-semibold">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Plan</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        No payments found
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr key={p.id} className="border-t hover:bg-gray-50">

                        <td className="p-4">{p.name}</td>
                        <td className="p-4">{p.plan}</td>
                        <td className="p-4">₹{p.amount}</td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}
                          >
                            {p.status}
                          </span>
                        </td>

                        <td className="p-4">{p.date}</td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentsPage;