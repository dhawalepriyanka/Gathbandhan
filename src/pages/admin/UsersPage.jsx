import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const UsersPage = () => {
  const [tab, setTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@test.com",
      status: "Active",
      age: 29,
      city: "Mumbai",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Sneha",
      email: "sneha@test.com",
      status: "Blocked",
      age: 26,
      city: "Pune",
      phone: "9123456780",
    },
    {
      id: 3,
      name: "Amit",
      email: "amit@test.com",
      status: "Active",
      age: 31,
      city: "Delhi",
      phone: "9988776655",
    },
  ]);

  // FILTER
  const filteredUsers = users.filter((u) =>
    tab === "all" ? true : u.status === "Blocked"
  );

  // BLOCK / UNBLOCK
  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Blocked" : "Active",
            }
          : u
      )
    );
  };

  // SAVE EDIT
  const saveEdit = () => {
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            User Management
          </h1>

          {/* TABS */}
          <div className="flex gap-3 mb-6">
            {["all", "blocked"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  tab === t
                    ? "bg-black text-white"
                    : "bg-white border text-gray-600 hover:bg-gray-100"
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
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4">Age</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">

                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">{u.age}</td>
                      <td className="p-4">{u.city}</td>
                      <td className="p-4">{u.phone}</td>

                      {/* STATUS */}
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => setSelectedUser(u)}
                            className="border px-3 py-1 rounded text-xs hover:bg-gray-100"
                          >
                            View
                          </button>

                          <button
                            onClick={() => setEditUser(u)}
                            className="border px-3 py-1 rounded text-xs hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => toggleStatus(u.id)}
                            className="border px-3 py-1 rounded text-xs text-red-500 hover:bg-red-50"
                          >
                            {u.status === "Active" ? "Block" : "Unblock"}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border w-96">

            <h2 className="text-lg font-semibold mb-4">User Details</h2>

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Age:</b> {selectedUser.age}</p>
            <p><b>City:</b> {selectedUser.city}</p>
            <p><b>Phone:</b> {selectedUser.phone}</p>
            <p><b>Status:</b> {selectedUser.status}</p>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-5 w-full bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border w-96">

            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="Name"
            />

            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="Email"
            />

            <input
              value={editUser.age}
              onChange={(e) =>
                setEditUser({ ...editUser, age: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="Age"
            />

            <input
              value={editUser.city}
              onChange={(e) =>
                setEditUser({ ...editUser, city: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="City"
            />

            <input
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
              className="border p-2 w-full mb-4 rounded-lg"
              placeholder="Phone"
            />

            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="bg-black text-white w-full py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-200 w-full py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default UsersPage;