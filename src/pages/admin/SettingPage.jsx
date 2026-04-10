import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@gmail.com",
    phone: "9876543210",
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleProfileSave = () => {
    alert("Profile Updated!");
  };

  const handlePasswordSave = () => {
    if (password.newPass !== password.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Updated!");
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen py-6">

        <div className="max-w-4xl mx-auto px-4">

          <h1 className="text-2xl font-semibold mb-6">
            Settings
          </h1>

          {/* PROFILE */}
          <div className="bg-white p-5 rounded-xl border mb-6">
            <h2 className="font-semibold mb-4 text-gray-700">
              Admin Profile
            </h2>

            <div className="space-y-3">
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="border p-2 w-full rounded-lg"
                placeholder="Name"
              />

              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="border p-2 w-full rounded-lg"
                placeholder="Email"
              />

              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="border p-2 w-full rounded-lg"
                placeholder="Phone"
              />

              <button
                onClick={handleProfileSave}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="bg-white p-5 rounded-xl border mb-6">
            <h2 className="font-semibold mb-4 text-gray-700">
              Change Password
            </h2>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="border p-2 w-full rounded-lg"
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                className="border p-2 w-full rounded-lg"
                onChange={(e) =>
                  setPassword({ ...password, newPass: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="border p-2 w-full rounded-lg"
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
              />

              <button
                onClick={handlePasswordSave}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-4 text-gray-700">
              Notifications
            </h2>

            <div className="flex justify-between items-center mb-3">
              <span>Email Notifications</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <span>SMS Notifications</span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    sms: !notifications.sms,
                  })
                }
              />
            </div>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;