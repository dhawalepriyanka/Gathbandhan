import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Users,
  Heart,
  UserCheck,
  UserX,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ReportsPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [gender, setGender] = useState("All");
  const [city, setCity] = useState("All");
  const [activeCard, setActiveCard] = useState("all");

  // DATA
  const users = [
    { id: 1, name: "Rahul Patil", age: 29, gender: "Male", city: "Mumbai", status: "Active", matches: 5, date: "2026-04-01" },
    { id: 2, name: "Sneha Joshi", age: 26, gender: "Female", city: "Pune", status: "Active", matches: 4, date: "2026-04-05" },
    { id: 3, name: "Amit Sharma", age: 34, gender: "Male", city: "Delhi", status: "Inactive", matches: 0, date: "2026-04-10" },
    { id: 4, name: "Priya Nair", age: 27, gender: "Female", city: "Bangalore", status: "Active", matches: 6, date: "2026-04-15" },
    { id: 5, name: "Vikas Singh", age: 31, gender: "Male", city: "Hyderabad", status: "Active", matches: 3, date: "2026-04-20" },
  ];

  const [filteredUsers, setFilteredUsers] = useState(users);

  // APPLY FILTER
  const applyFilters = () => {
    const result = users.filter((u) => {
      const matchGender = gender === "All" || u.gender === gender;
      const matchCity = city === "All" || u.city === city;
      const matchFromDate = !fromDate || u.date >= fromDate;
      const matchToDate = !toDate || u.date <= toDate;

      return matchGender && matchCity && matchFromDate && matchToDate;
    });

    setFilteredUsers(result);
  };

  // RESET FILTER
  const resetFilters = () => {
    setFilteredUsers(users);
    setFromDate("");
    setToDate("");
    setGender("All");
    setCity("All");
  };

  // CARD VALUES
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter((u) => u.status === "Active").length;
  const inactiveUsers = filteredUsers.filter((u) => u.status === "Inactive").length;
  const totalMatches = filteredUsers.reduce((sum, u) => sum + u.matches, 0);

  // CHART DATA
  const monthlyData = [
    { name: "Jan", users: 20 },
    { name: "Feb", users: 35 },
    { name: "Mar", users: 50 },
    { name: "Apr", users: 65 },
    { name: "May", users: 80 },
    { name: "Jun", users: 90 },
    { name: "Jul", users: 100 },
    { name: "Aug", users: 110 },
    { name: "Sep", users: 120 },
    { name: "Oct", users: 130 },
    { name: "Nov", users: 140 },
    { name: "Dec", users: 150 },
  ];

  const pieData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
    { name: "Blocked", value: 4 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

  // EXPORT CSV
  const exportCSV = () => {
    const headers = ["Name", "Age", "Gender", "City", "Status", "Matches"];

    const rows = filteredUsers.map((u) => [
      u.name,
      u.age,
      u.gender,
      u.city,
      u.status,
      u.matches,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCardClick = (type) => {
    setActiveCard(type);

    if (type === "all") setFilteredUsers(users);
    if (type === "active")
      setFilteredUsers(users.filter((u) => u.status === "Active"));
    if (type === "inactive")
      setFilteredUsers(users.filter((u) => u.status === "Inactive"));
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reports Management
          </h1>

          <button
            onClick={exportCSV}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
          >
            Export CSV
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div
            onClick={() => handleCardClick("all")}
            className={`bg-white p-4 rounded-xl border cursor-pointer hover:shadow-md transition
            ${activeCard === "all" && "ring-2 ring-gray-400"}`}
          >
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl border hover:shadow-md transition">
            <p className="text-sm text-gray-500">Matches</p>
            <h2 className="text-2xl font-bold">{totalMatches}</h2>
          </div>

          <div
            onClick={() => handleCardClick("active")}
            className={`bg-white p-4 rounded-xl border cursor-pointer hover:shadow-md transition
            ${activeCard === "active" && "ring-2 ring-green-400"}`}
          >
            <p className="text-sm text-gray-500">Active</p>
            <h2 className="text-2xl font-bold text-green-600">{activeUsers}</h2>
          </div>

          <div
            onClick={() => handleCardClick("inactive")}
            className={`bg-white p-4 rounded-xl border cursor-pointer hover:shadow-md transition
            ${activeCard === "inactive" && "ring-2 ring-red-400"}`}
          >
            <p className="text-sm text-gray-500">Inactive</p>
            <h2 className="text-2xl font-bold text-red-500">{inactiveUsers}</h2>
          </div>

        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6">

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white h-10"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white h-10"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white h-10"
          >
            <option value="All">All</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white h-10"
          >
            <option value="All">All</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
          </select>

          <button
            onClick={applyFilters}
            className="bg-black text-white px-4 py-2 rounded-lg h-10"
          >
            Apply
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg h-10"
          >
            Reset
          </button>

        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white p-4 rounded-xl border">
            <h2 className="text-sm text-gray-600 mb-3">
              Monthly Registrations
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#818cf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <h2 className="text-sm text-gray-600 mb-3">
              User Activity
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600 text-xs font-semibold">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">City</th>
                <th className="p-3">Status</th>
                <th className="p-3">Matches</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.age}</td>
                  <td className="p-3">{u.gender}</td>
                  <td className="p-3">{u.city}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${u.status === "Active" && "bg-green-100 text-green-600"}
                      ${u.status === "Inactive" && "bg-red-100 text-red-500"}`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="p-3">{u.matches}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default ReportsPage;