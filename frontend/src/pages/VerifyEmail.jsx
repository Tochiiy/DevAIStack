import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FiLoader, FiCheckCircle, FiXCircle, FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [backupCodes, setBackupCodes] = useState([]);
  const [copied, setCopied] = useState(false);
  const codesRef = useRef(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await api.post(`/api/auth/verify-email/${token}`);
        setStatus("success");
        if (data.backupCodes?.length) {
          setBackupCodes(data.backupCodes);
        }
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(backupCodes.join("\n"));
      setCopied(true);
      toast.success("Backup codes copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

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
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">
              Your account is now active.
            </p>

            {backupCodes.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  Save these backup codes
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                  Use one to log in if your OTP email doesn't arrive. Each code works once.
                </p>
                <div
                  ref={codesRef}
                  className="grid grid-cols-2 gap-1 font-mono text-sm text-yellow-900 dark:text-yellow-100 bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-800"
                >
                  {backupCodes.map((code, i) => (
                    <span key={i} className="tracking-wider">{code}</span>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="mt-2 text-xs text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 flex items-center gap-1"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  {copied ? "Copied!" : "Copy codes"}
                </button>
              </div>
            )}

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
