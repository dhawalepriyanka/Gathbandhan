import AdminLayout from "@/components/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Users, Heart, Crown, UserPlus } from "lucide-react";

const AdminDashboard = () => {

  const stats = [
    {
      title: "Total Users",
      value: "1,890",
      sub: "+10% This Month",
      icon: <Users />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Matches",
      value: "560",
      sub: "+8% This Month",
      icon: <Heart />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Premium Users",
      value: "320",
      sub: "+5% This Month",
      icon: <Crown />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "New Signups",
      value: "410",
      sub: "Last 7 Days",
      icon: <UserPlus />,
      color: "bg-green-100 text-green-600",
    },
  ];

  const chartData = [
    { name: "Jan", thisMonth: 2000, lastMonth: 1800 },
    { name: "Feb", thisMonth: 4000, lastMonth: 3000 },
    { name: "Mar", thisMonth: 7000, lastMonth: 6000 },
    { name: "Apr", thisMonth: 6000, lastMonth: 5500 },
    { name: "May", thisMonth: 10000, lastMonth: 7000 },
    { name: "Jun", thisMonth: 8000, lastMonth: 6500 },
  ];

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen py-6">

        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Matrimony Admin Dashboard
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    {item.value}
                  </h2>
                  <p className="text-xs text-green-500">{item.sub}</p>
                </div>

                <div className={`${item.color} p-3 rounded-lg`}>
                  {item.icon}
                </div>
              </div>
            ))}

          </div>

          {/* GRAPH + ACTIVITY */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">

            {/* GRAPH */}
            <div className="bg-white p-5 rounded-xl border hover:shadow-md transition">
              <h2 className="font-semibold mb-4 text-gray-700">
                User Growth Overview
              </h2>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="thisMonth"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="lastMonth"
                    stroke="#94a3b8"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ACTIVITY */}
            <div className="bg-white p-5 rounded-xl border hover:shadow-md transition">
              <h2 className="font-semibold mb-4 text-gray-700">
                Recent Activity
              </h2>

              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    New user registered
                  </span>
                  <span className="text-xs text-gray-400">2 min ago</span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Rahul & Priya matched
                  </span>
                  <span className="text-xs text-gray-400">10 min ago</span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Premium purchased ₹1200
                  </span>
                  <span className="text-xs text-gray-400">1 hr ago</span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Profile updated
                  </span>
                  <span className="text-xs text-gray-400">3 hr ago</span>
                </li>
              </ul>
            </div>

          </div>

          {/* USERS TABLE */}
          <div className="bg-white p-5 rounded-xl border hover:shadow-md transition mb-6">
            <h2 className="font-semibold mb-4 text-gray-700">
              Recent Users
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-600 text-xs font-semibold">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                  </tr>
                </thead>

                <tbody>
                  {["Rajesh", "Rina", "Rohit"].map((name, i) => (
                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition duration-200"
                    >
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4">{name}</td>
                      <td className="p-4">{name.toLowerCase()}@gmail.com</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* MATCHES */}
          <div className="bg-white p-5 rounded-xl border hover:shadow-md transition">
            <h2 className="font-semibold mb-4 text-gray-700">
              Recent Matches
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div className="bg-gray-50 p-3 rounded-xl border hover:shadow-md transition">
                <div className="flex gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a"
                    className="w-1/2 h-28 object-cover rounded-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842"
                    className="w-1/2 h-28 object-cover rounded-lg"
                  />
                </div>
                <p className="mt-2 text-center font-medium text-gray-700">
                  Rahul & Priya
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border hover:shadow-md transition">
                <div className="flex gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                    className="w-1/2 h-28 object-cover rounded-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e"
                    className="w-1/2 h-28 object-cover rounded-lg"
                  />
                </div>
                <p className="mt-2 text-center font-medium text-gray-700">
                  Amit & Nisha
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;