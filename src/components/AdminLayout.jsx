import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Users, LogOut } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } fixed h-full bg-gradient-to-b from-purple-600 to-pink-500 text-white transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4">
          {open && <h2 className="font-bold text-lg">Admin</h2>}
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="p-4 space-y-3">

          <Link to="/admin" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            <LayoutDashboard size={18} />
            {open && "Dashboard"}
          </Link>

          <Link to="/admin/users" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            
           👩🏻‍💻 {open && "Users"}
          </Link>

          <Link to="/admin/payments" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            💳 {open && "Payments"}
          </Link>

          <Link to="/admin/verification" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            ✔ {open && "Verification"}
          </Link>

          <Link to="/admin/reports" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            🚨 {open && "Reports"}
          </Link>
          
          <Link to="/admin/settings" className="flex items-center gap-2 hover:bg-white/20 p-2 rounded">
            ⚙ {open && "Settings"}
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 mt-6 hover:bg-red-500 p-2 rounded w-full"
          >
            <LogOut size={18} />
            {open && "Logout"}
          </button>

        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;