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
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className={`${open ? "w-64" : "w-16"} bg-gradient-to-b from-purple-600 to-pink-500 text-white transition-all`}>
        
        <div className="flex justify-between p-4">
          {open && <h2 className="font-bold">Admin</h2>}
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="p-4 space-y-3">

          <Link to="/admin" className="flex gap-2 hover:bg-white/20 p-2 rounded">
            <LayoutDashboard size={18} />
            {open && "Dashboard"}
          </Link>

          <Link to="/admin/users" className="flex gap-2 hover:bg-white/20 p-2 rounded">
            <Users size={18} />
            {open && "Users"}
          </Link>

          <Link to="/admin/payments" className="flex gap-2 hover:bg-white/20 p-2 rounded">
            <Users size={18} />
            {open && "Payments"}
          </Link>

          <Link to="/admin/verification" className="flex gap-2 hover:bg-white/20 p-2 rounded">
            <Users size={18} />
            {open && "Verification"}
          </Link>


          

          <button onClick={logout} className="flex gap-2 mt-6 hover:bg-red-500 p-2 rounded w-full">
            <LogOut size={18} />
            {open && "Logout"}
          </button>

        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;