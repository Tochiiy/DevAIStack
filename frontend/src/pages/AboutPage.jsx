import { Link } from "react-router-dom";
import { FiShield, FiBookOpen, FiCpu, FiServer, FiArrowRight, FiCode, FiLayers, FiUsers } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: FiShield,
    title: "Auth System",
    desc: "Production-grade MERN authentication — email verification, OTP login, JWT rotation, RBAC, rate limiting, and account deletion.",
  },
  {
    icon: FiBookOpen,
    title: "Full-Stack Guides",
    desc: "Comprehensive coverage of frontend, backend, database, DevOps, cloud, and architecture patterns — from monolith to microservices.",
  },
  {
    icon: FiCpu,
    title: "AI Engineering",
    desc: "LLMs, RAG pipelines, vector databases, AI agents, prompt engineering, LangChain/LangGraph, MLOps, and model deployment.",
  },
  {
    icon: FiServer,
    title: "Tech Stack Reference",
    desc: "React 19, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, AWS, GCP, Python, FastAPI, and more.",
  },
  {
    icon: FiCode,
    title: "Build Guides",
    desc: "Step-by-step recipes for SaaS platforms, AI chat apps, real-time dashboards, and AI agent platforms — from idea to deployment.",
  },
  {
    icon: FiLayers,
    title: "Architecture & Patterns",
    desc: "Monolithic, microservices, and event-driven architectures with pros, cons, and when to use each approach.",
  },
];

const AboutPage = () => {
  const { isAuth } = useAuth();

  return (
    <div className="px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-yellow-500 font-mono font-extrabold text-4xl leading-none">&lt;/&gt;</span>
          <h1 className="text-4xl font-extrabold">About DevAIStack</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-10">
          Your blueprint for building modern full-stack applications with AI engineering.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-10">
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
            DevAIStack is a complete reference and learning platform for developers who want to master
            full-stack development and AI engineering. Built on a real, production-grade authentication
            system, it walks you through every layer of modern web development — from databases and
            APIs to LLMs and deployment.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed mt-4">
            Whether you're building a SaaS product, an AI chat application, a real-time dashboard,
            or an agent platform, DevAIStack gives you the architecture, stack choices, and
            step-by-step instructions to get it done.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">What you'll find here</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-yellow-500" />
                <h3 className="font-bold text-lg">{title}</h3>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-yellow-500/10 dark:bg-yellow-500/5 rounded-xl p-6 md:p-8 border border-yellow-500/20 text-center">
          <FiUsers size={32} className="text-yellow-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-3">Built by developers, for developers</h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-6 max-w-xl mx-auto">
            DevAIStack is maintained by <strong>Tochiiy</strong> — a full-stack and AI engineer
            building production-grade systems. Every guide is tested and battle-hardened.
          </p>
          <div className="flex items-center justify-center gap-3">
            {isAuth ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Go to Dashboard <FiArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Started <FiArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
