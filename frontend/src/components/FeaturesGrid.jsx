import { FiMail, FiKey, FiRefreshCw, FiServer, FiMoon, FiActivity } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: FiMail,
    title: "Email Verification",
    desc: "Verify your identity during registration with a secure email link.",
  },
  {
    icon: FiKey,
    title: "OTP Login",
    desc: "Two-step login with a one-time password sent to your email.",
  },
  {
    icon: FiRefreshCw,
    title: "Token Rotation",
    desc: "Refresh tokens rotate on each use — stolen tokens are instantly revoked.",
  },
  {
    icon: FiServer,
    title: "Redis Sessions",
    desc: "Server-side session management with Upstash Redis for speed and scale.",
  },
  {
    icon: FiMoon,
    title: "Dark / Light Mode",
    desc: "Toggle between themes with system preference detection.",
  },
  {
    icon: FiActivity,
    title: "Rate Limiting",
    desc: "Brute-force protection with per-IP rate limiting on auth endpoints.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Everything you need
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
