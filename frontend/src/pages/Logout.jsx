import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiCheckCircle, FiLoader } from "react-icons/fi";
import api from "./apiInterceptor";

const Logout = () => {
  const [status, setStatus] = useState("logging-out");

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/api/auth/logout");
      } catch {
        // still clear locally even if request fails
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      setStatus("done");
    };
    logout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        {status === "logging-out" ? (
          <>
            <FiLoader className="animate-spin mx-auto text-yellow-500" size={48} />
            <h2 className="text-2xl font-bold mt-4">Logging out...</h2>
          </>
        ) : (
          <>
            <FiLogOut className="mx-auto text-yellow-500" size={48} />
            <FiCheckCircle className="mx-auto text-green-500 -mt-8 ml-8" size={20} />
            <h2 className="text-2xl font-bold mt-4">You&apos;ve been logged out</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Your session has been closed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded transition-colors"
              >
                Login again
              </Link>
              <Link
                to="/"
                className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-8 rounded transition-colors"
              >
                Go home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;
