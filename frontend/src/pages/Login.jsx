import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";
import { useAuth } from "../context/AuthContext";

// ─── LOGIN PAGE ─────────────────────────────────────────────
// Direct email + password login. On success, the access token is
// stored in localStorage and the user is redirected to /dashboard.
// The refresh token is handled automatically via httpOnly cookie.
const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (err) {
      const errMsg = err.response?.data?.errors?.join(", ") || err.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
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
        onError={(e) => (e.target.style.display = "none")}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] dark:opacity-[0.20] pointer-events-none select-none"
      />
      <div className="relative w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-transparent dark:from-yellow-500/10 dark:via-yellow-500/5 dark:to-transparent px-6 md:px-8 pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-yellow-500 font-mono font-extrabold text-3xl leading-none">&lt;/&gt;</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Dev<span className="text-yellow-500">AIStack</span>
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
                {isSubmitting ? "Logging in..." : "Login"}
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


          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 font-medium">
          JWT-authenticated login with token rotation
        </p>
      </div>
    </div>
  );
};

export default Login;
