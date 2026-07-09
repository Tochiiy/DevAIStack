import { Link } from "react-router-dom";
import { FiShield, FiArrowRight, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import HeroBanner from "../components/HeroBanner";
import AuthFlow from "../components/AuthFlow";
import TechStackCarousel from "../components/TechStackCarousel";
import FeaturesGrid from "../components/FeaturesGrid";

const Home = () => {
  const { isAuth, user } = useAuth();

  if (isAuth) {
    return (
      <div>
        <section className="px-4 pt-24 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-float animate-glow inline-flex mb-8">
              <FiShield size={80} className="text-yellow-500" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-up">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
                {user?.name}
              </span>
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up delay-100">
              You are signed in and your session is active.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-yellow-500/25"
              >
                Go to Dashboard <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        <TechStackCarousel />
        <FeaturesGrid />
      </div>
    );
  }

  return (
    <div>
      <section className="px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <HeroBanner />
          <AuthFlow />
        </div>
      </section>
      <TechStackCarousel />
      <FeaturesGrid />
    </div>
  );
};

export default Home;
