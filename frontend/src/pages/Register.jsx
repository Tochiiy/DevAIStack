// ─── REGISTER PAGE ──────────────────────────────────────────
// Creates an account immediately (no email verification). On
// success, displays the user's backup codes and a link to login.
// Backup codes are shown only once and should be saved by the user.
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLoader, FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [showCp, setShowCp] = useState(false);
  const [done, setDone] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/auth/register", data);
      if (res.data.backupCodes?.length) {
        setBackupCodes(res.data.backupCodes);
      }
      setDone(true);
    } catch (err) {
      const errMsg = err.response?.data?.errors?.join(", ") || err.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    }
  };

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

  const inputClass =
    "w-full mb-1 p-3 md:p-4 pr-10 md:pr-12 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500 text-base md:text-lg";

  const bg =
    "https://assets.bytebytego.com/diagrams/0199-full-stack-developer-roadmap.png";

  if (done) {
    return (
      <div className="relative min-h-screen px-4 flex items-center justify-center overflow-hidden">
        <img src={bg} alt="" onError={(e) => (e.target.style.display = "none")} className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] dark:opacity-[0.20] pointer-events-none select-none" />
        <div className="relative w-full max-w-lg bg-white/70 dark:bg-gray-800/75 backdrop-blur-md p-6 md:p-10 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-2">Account created!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">You can now log in with your email and password.</p>

          {backupCodes.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200 mb-2">Save these backup codes</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                Use one to log in if you can't receive email OTPs. Each code works once.
              </p>
              <div className="grid grid-cols-2 gap-1 font-mono text-sm text-yellow-900 dark:text-yellow-100 bg-white dark:bg-gray-800 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                {backupCodes.map((code, i) => (
                  <span key={i} className="tracking-wider">{code}</span>
                ))}
              </div>
              <button onClick={handleCopy} className="mt-2 text-xs text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 flex items-center gap-1">
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                {copied ? "Copied!" : "Copy codes"}
              </button>
            </div>
          )}

          <Link to="/login" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded transition-colors">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-4 flex items-center justify-center overflow-hidden">
      <img
        src={bg}
        alt=""
        onError={(e) => (e.target.style.display = "none")}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] dark:opacity-[0.20] pointer-events-none select-none"
      />
      <div className="relative w-full max-w-lg bg-white/70 dark:bg-gray-800/75 backdrop-blur-md p-6 md:p-10 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            placeholder="Name"
            className={inputClass}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mb-3">{errors.name.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            placeholder="Email"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mb-3">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              type={showPw ? "text" : "password"}
              placeholder="Password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 md:right-4 top-3 md:top-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {showPw ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mb-3">
              {errors.password.message}
            </p>
          )}

          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
              type={showCp ? "text" : "password"}
              placeholder="Confirm password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowCp(!showCp)}
              className="absolute right-3 md:right-4 top-3 md:top-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {showCp ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mb-3">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 md:py-4 rounded flex items-center justify-center gap-2 mt-4 text-base md:text-lg"
          >
            {isSubmitting && <FiLoader className="animate-spin" size={20} />}
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
