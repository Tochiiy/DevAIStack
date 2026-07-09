import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiLoader, FiCheckCircle, FiXCircle } from "react-icons/fi";
import api from "./apiInterceptor";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.post(`/api/auth/verify-email/${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        {status === "loading" && (
          <>
            <FiLoader className="animate-spin mx-auto text-yellow-500" size={48} />
            <h2 className="text-2xl font-bold mt-4">Verifying...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <FiCheckCircle className="mx-auto text-green-500" size={48} />
            <h2 className="text-2xl font-bold mt-4">Email verified!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Your account is now active.
            </p>
            <Link
              to="/login"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded transition-colors"
            >
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <FiXCircle className="mx-auto text-red-500" size={48} />
            <h2 className="text-2xl font-bold mt-4">Verification failed</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Link expired or invalid.
            </p>
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register again
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
