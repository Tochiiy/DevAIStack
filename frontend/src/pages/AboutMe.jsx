import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiMail, FiShield, FiSettings, FiBookOpen, FiTrash2, FiAlertTriangle, FiX, FiAward } from "react-icons/fi";
import api from "./apiInterceptor";
import { toast } from "react-toastify";

const AboutMe = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const { user, logout, fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete("/api/auth/delete-account");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      toast.success("Account deleted permanently");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center gap-3 mb-4">
            <FiShield className="text-yellow-500" size={40} />
          </div>
        <h2 className="text-2xl font-bold text-center mb-6">Me</h2>
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

        {user?.role !== "admin" && (
          <button
            onClick={async () => {
              setPromoting(true);
              try {
                await api.post("/api/auth/promote-admin", { email: user?.email });
                await fetchUser();
                toast.success("Promoted to admin! Access the Admin Panel now.");
              } catch (err) {
                toast.error(err.response?.data?.message || "Promotion failed");
              } finally {
                setPromoting(false);
              }
            }}
            disabled={promoting}
            className="w-full flex items-center justify-center gap-2 mt-6 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 rounded-lg transition-colors"
          >
            <FiAward size={18} /> {promoting ? "Promoting..." : "Become Admin"}
          </button>
        )}

        <Link
          to="/auth-guide"
          className="flex items-center justify-center gap-2 mt-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition-colors"
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

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-white border border-red-500 hover:bg-red-600 font-bold py-3 rounded-lg transition-colors"
          >
            <FiTrash2 size={18} /> Delete Account
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-red-500">
                <FiAlertTriangle size={20} />
                <h3 className="font-bold text-lg">Delete Account</h3>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-6">
              This permanently deletes your account and all data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-bold py-2 rounded-lg transition-colors"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
