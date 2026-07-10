import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLoader, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";
import { useAuth } from "../context/AuthContext";

// ─── OTP / Backup Code page ────────────────────────────────
// OTP login is disabled. Only backup codes remain.
// Full OTP code is preserved below (commented) for future re-enable.

const VerifyOtp = () => {
  const [backupCode, setBackupCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const email = localStorage.getItem("email");

  const handleBackupSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(backupCode)) {
      toast.error("Enter a valid 6-digit backup code");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/use-backup-code", { email, code: backupCode });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.removeItem("email");
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid backup code");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="px-4 pt-24 pb-16 flex justify-center">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4">No email found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Please login first.</p>
          <Link to="/login" className="text-yellow-500 hover:underline">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 flex items-center gap-1 text-sm"
        >
          <FiArrowLeft /> Back to login
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">Backup Code</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
          Enter one of your saved 6-digit backup codes for {email}
        </p>

        <form onSubmit={handleBackupSubmit}>
          <input
            value={backupCode}
            onChange={(e) =>
              setBackupCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="000000"
            maxLength={6}
            className="w-full mb-1 p-4 text-center text-2xl tracking-[1em] rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-500"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading || backupCode.length !== 6}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 rounded flex items-center justify-center gap-2 mt-4"
          >
            {loading && <FiLoader className="animate-spin" size={18} />}
            {loading ? "Verifying..." : "Use Backup Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;

// ═══════════════════════════════════════════════════════════════
//  OTP login code — preserved for future re-enablement
// ═══════════════════════════════════════════════════════════════

/*
import { useState, useEffect } from "react";
import { FiKey } from "react-icons/fi";

// Inside component:
const [otp, setOtp] = useState("");
const [useBackup, setUseBackup] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("email");
  if (!saved) {
    toast.error("No email found, please login again");
    navigate("/login");
    return;
  }
  setEmail(saved);
}, [navigate]);

const handleOtpSubmit = async (e) => {
  e.preventDefault();
  if (!/^\d{5}$/.test(otp)) {
    toast.error("Enter a valid 5-digit OTP");
    return;
  }
  setLoading(true);
  try {
    const { data } = await api.post("/api/auth/verify-otp", { email, otp });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.removeItem("email");
    setUser(data.user);
    toast.success(data.message);
    navigate("/dashboard");
  } catch (err) {
    toast.error(err.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};

// Replace the single backup-mode render with a toggle:

{!useBackup ? (
  <>
    <h2 className="text-2xl font-bold mb-2 text-center">Enter OTP</h2>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
      A 5-digit code was sent to {email}
    </p>
    <form onSubmit={handleOtpSubmit}>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 5))}
        placeholder="00000"
        maxLength={5}
        className="w-full mb-1 p-4 text-center text-2xl tracking-[1em] rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-500"
        autoFocus
      />
      <button type="submit" disabled={loading || otp.length !== 5}
        className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 rounded flex items-center justify-center gap-2 mt-4"
      >
        {loading && <FiLoader className="animate-spin" size={18} />}
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button onClick={() => setUseBackup(true)}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center gap-2 mx-auto"
      >
        <FiKey size={14} />
        OTP not arriving? Use a backup code
      </button>
    </div>
  </>
) : (
  <>
    [... backup code form ...]
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button onClick={() => setUseBackup(false)}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center gap-2 mx-auto"
      >
        <FiArrowLeft size={14} />
        Back to OTP entry
      </button>
    </div>
  </>
)}
*/
