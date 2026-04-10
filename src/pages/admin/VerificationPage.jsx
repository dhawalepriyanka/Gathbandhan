import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { FileText, Image, CheckCircle, XCircle } from "lucide-react";

const VerificationPage = () => {
  const [tab, setTab] = useState("id");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@test.com",
      age: 29,
      city: "Mumbai",
      documentType: "Aadhar Card",
      submittedDate: "2026-04-01",
      type: "id",
      status: "Pending",
      img: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a",
    },
    {
      id: 2,
      name: "Sneha",
      email: "sneha@test.com",
      age: 26,
      city: "Pune",
      documentType: "Profile Photo",
      submittedDate: "2026-04-05",
      type: "photo",
      status: "Pending",
      img: "https://images.unsplash.com/photo-1615109398623-88346a601842",
    },
  ]);

  const filtered = data.filter((d) => {
    const matchTab =
      tab === "id"
        ? d.type === "id"
        : tab === "photo"
        ? d.type === "photo"
        : tab === "verified"
        ? d.type === "verified"
        : tab === "rejected"
        ? d.status === "Rejected"
        : true;

    const matchSearch = d.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  const total = data.length;
  const pending = data.filter((d) => d.status === "Pending").length;
  const approved = data.filter((d) => d.status === "Approved").length;
  const rejected = data.filter((d) => d.status === "Rejected").length;

  const approve = (id) => {
    setData(
      data.map((d) =>
        d.id === id
          ? { ...d, status: "Approved", type: "verified" }
          : d
      )
    );
  };

  const reject = (id) => {
    const reason = prompt("Enter reject reason:");
    if (!reason) return;

    setData(
      data.map((d) =>
        d.id === id
          ? { ...d, status: "Rejected", reason }
          : d
      )
    );
  };

  const statCards = [
    {
      title: "Total",
      value: total,
      icon: <FileText />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Image />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Approved",
      value: approved,
      icon: <CheckCircle />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <XCircle />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-2xl font-semibold mb-6">
            Verification Management
          </h1>

          {/* 🔥 STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statCards.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h2 className="text-xl font-bold">{item.value}</h2>
                </div>
                <div className={`${item.color} p-3 rounded-lg`}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <input
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg mb-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          {/* TABS */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {["id", "photo", "verified", "rejected"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  tab === t
                    ? "bg-black text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border p-3 hover:shadow-md transition"
              >
                <img
                  src={p.img}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <div className="mt-3">
                  <h2 className="font-semibold text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-xs text-gray-500">{p.city}</p>
                  <p className="text-xs text-gray-500">
                    {p.documentType}
                  </p>
                  <p className="text-xs text-gray-400">
                    {p.submittedDate}
                  </p>
                </div>

                {/* STATUS */}
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      p.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : p.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => setSelected(p)}
                    className="border w-full py-1 rounded text-xs hover:bg-gray-100"
                  >
                    View
                  </button>

                  {p.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approve(p.id)}
                        className="border w-full py-1 rounded text-xs text-green-600 hover:bg-green-50"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(p.id)}
                        className="border w-full py-1 rounded text-xs text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl border w-96 shadow-lg">

            <h2 className="font-semibold mb-3">
              Verification Details
            </h2>

            <img
              src={selected.img}
              className="w-full h-40 rounded mb-3"
            />

            <div className="space-y-1 text-sm">
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>City:</b> {selected.city}</p>
              <p><b>Document:</b> {selected.documentType}</p>
              <p><b>Status:</b> {selected.status}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default VerificationPage;