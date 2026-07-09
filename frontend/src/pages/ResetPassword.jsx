import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiLock, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8)
      return toast.error("Minimum 8 characters");
    if (password !== confirm)
      return toast.error("Passwords do not match");
    setLoading(true);
    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        <FiLock className="mx-auto text-yellow-500 mb-4" size={40} />
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              placeholder="New password"
              className="w-full mb-1 p-3 pr-10 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {showPw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className="w-full mb-4 p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 rounded flex items-center justify-center gap-2"
          >
            {loading && <FiLoader className="animate-spin" size={18} />}
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          <Link to="/login" className="text-yellow-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
