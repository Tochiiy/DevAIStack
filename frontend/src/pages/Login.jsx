import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLoader, FiAward, FiShield, FiZap } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const emailValue = watch("email");

  const promoteToAdmin = async () => {
    if (!emailValue) {
      toast.error("Enter your email first");
      return;
    }
    setPromoting(true);
    try {
      await api.post("/api/auth/promote-admin", { email: emailValue });
      toast.success(`${emailValue} promoted to admin! Login to access admin panel.`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Promotion failed");
    } finally {
      setPromoting(false);
    }
  };

  const onSubmit = async ({ email, password }) => {
    try {
      await api.post("/api/auth/login", { email, password });
      localStorage.setItem("email", email);
      toast.success("OTP sent to your email");
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full mb-1 p-3 md:p-4 pr-10 md:pr-12 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500 text-base md:text-lg";

  const bg =
    "https://assets.bytebytego.com/diagrams/0199-full-stack-developer-roadmap.png";

  return (
    <div className="relative min-h-screen px-4 flex items-center justify-center overflow-hidden">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] dark:opacity-[0.20] pointer-events-none select-none"
      />
      <div className="relative w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-transparent dark:from-yellow-500/10 dark:via-yellow-500/5 dark:to-transparent px-6 md:px-8 pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="relative">
                <FiShield size={36} className="text-yellow-500" />
                <FiZap size={16} className="text-yellow-500 absolute -top-1 -right-2" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Mern<span className="text-yellow-500">Guide</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-500/30">
                AI
              </span>
            </div>
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Full-stack + AI engineering platform
            </p>
          </div>

          <div className="px-6 md:px-8 pt-6 pb-8">
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-60 text-black font-bold py-3 md:py-4 rounded-lg flex items-center justify-center gap-2 mt-4 text-base md:text-lg shadow-lg shadow-yellow-500/20 transition-all"
              >
                {isSubmitting && <FiLoader className="animate-spin" size={20} />}
                {isSubmitting ? "Sending OTP..." : "Login"}
              </button>
            </form>

            <div className="flex items-center justify-between text-sm md:text-base mt-4">
              <Link
                to="/forgot-password"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Forgot password?
              </Link>
              <Link to="/register" className="text-yellow-500 hover:underline font-bold">
                Register
              </Link>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={promoteToAdmin}
                disabled={promoting || !emailValue}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 disabled:opacity-40 transition-colors"
              >
                <FiAward size={14} />
                {promoting ? "Promoting..." : "Need admin access? Promote your account"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 font-medium">
          Secure login with OTP verification
        </p>
      </div>
    </div>
  );
};

export default Login;
