import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiMail, FiShield, FiSettings, FiBookOpen } from "react-icons/fi";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center gap-3 mb-4">
            <FiShield className="text-yellow-500" size={40} />
          </div>
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded bg-gray-50 dark:bg-gray-900/50">
            <FiUser className="text-gray-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded bg-gray-50 dark:bg-gray-900/50">
            <FiMail className="text-gray-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded bg-gray-50 dark:bg-gray-900/50">
            <FiShield className="text-gray-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
              <p className="font-medium capitalize">{user?.role || "user"}</p>
            </div>
          </div>
        </div>
        <Link
          to="/auth-guide"
          className="flex items-center justify-center gap-2 mt-6 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition-colors"
        >
          <FiBookOpen size={18} /> Auth Guide
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="flex items-center justify-center gap-2 mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors"
          >
            <FiSettings size={18} /> Admin Panel
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 mt-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition-colors"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
