import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const HeroBanner = () => {
  return (
    <>
      <div className="animate-float animate-glow inline-flex mb-8">
        <span className="text-yellow-500 font-mono font-extrabold text-6xl leading-none">&lt;/&gt;</span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-up">
        <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
          DevAIStack
        </span>
      </h1>

      <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up delay-100">
        Secure authentication for MERN apps — email verification,
        OTP-based login, JWT token rotation, and Redis-backed sessions.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-yellow-500/25"
        >
          Get started <FiArrowRight size={18} />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg transition-all hover:-translate-y-0.5"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default HeroBanner;
