import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "./apiInterceptor";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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
      <div className="relative w-full max-w-lg bg-white/70 dark:bg-gray-800/75 backdrop-blur-md p-6 md:p-10 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Login</h2>

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
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black font-bold py-3 md:py-4 rounded flex items-center justify-center gap-2 mt-4 text-base md:text-lg"
          >
            {isSubmitting && <FiLoader className="animate-spin" size={20} />}
            {isSubmitting ? "Sending OTP..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-between text-sm md:text-lg mt-4">
          <Link
            to="/forgot-password"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Forgot password?
          </Link>
          <Link to="/register" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
