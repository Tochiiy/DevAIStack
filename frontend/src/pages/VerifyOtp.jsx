import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLoader, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("email");
    if (!saved) {
      toast.error("No email found, please login again");
      navigate("/login");
      return;
    }
    setEmail(saved);
  }, [navigate]);

  const handleSubmit = async (e) => {
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
      toast.success(data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

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

        <h2 className="text-2xl font-bold mb-2 text-center">Enter OTP</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
          A 5-digit code was sent to {email}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 5))
            }
            placeholder="00000"
            maxLength={5}
            className="w-full mb-1 p-4 text-center text-2xl tracking-[1em] rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-500"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 5}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 rounded flex items-center justify-center gap-2 mt-4"
          >
            {loading && <FiLoader className="animate-spin" size={18} />}
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
