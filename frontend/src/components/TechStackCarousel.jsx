import { useState, useEffect, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCode,
  FiServer,
  FiDatabase,
  FiZap,
  FiMail,
  FiShield,
  FiLayout,
  FiGitBranch,
} from "react-icons/fi";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiRedis,
  SiGmail,
  SiJsonwebtokens,
} from "react-icons/si";

const slides = [
  {
    title: "Frontend",
    subtitle: "React 19 + Vite + Tailwind CSS v4",
    icon: SiReact,
    desc: "React 19 with Vite, react-router-dom v7, Tailwind CSS v4, and react-hook-form deliver a fast, type-safe UI.",
    gradient: "from-blue-500 to-purple-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="relative w-56">
          <div className="h-9 rounded-lg border border-blue-400/40 bg-blue-500/10 flex items-center px-3 mb-2">
            <FiLayout size={12} className="text-blue-400 mr-2 shrink-0" />
            <span className="text-xs font-medium text-blue-400">App.jsx</span>
          </div>
          <div className="h-9 rounded-lg border border-purple-400/40 bg-purple-500/10 flex items-center px-3 ml-4 mb-2">
            <FiGitBranch size={12} className="text-purple-400 mr-2 shrink-0" />
            <span className="text-xs font-medium text-purple-400">Routes</span>
          </div>
          <div className="h-9 rounded-lg border border-pink-400/40 bg-pink-500/10 flex items-center px-3 ml-8 mb-2">
            <span className="text-xs font-medium text-pink-400">Pages</span>
          </div>
          <div className="flex gap-2 ml-12">
            <div className="h-7 w-16 rounded-md border border-yellow-400/30 bg-yellow-500/10 flex items-center justify-center">
              <span className="text-[10px] font-medium text-yellow-400">Login</span>
            </div>
            <div className="h-7 w-16 rounded-md border border-yellow-400/30 bg-yellow-500/10 flex items-center justify-center">
              <span className="text-[10px] font-medium text-yellow-400">Register</span>
            </div>
            <div className="h-7 w-16 rounded-md border border-yellow-400/30 bg-yellow-500/10 flex items-center justify-center">
              <span className="text-[10px] font-medium text-yellow-400">Dashboard</span>
            </div>
          </div>
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-blue-400/30 via-purple-400/30 to-pink-400/30" />
        </div>
        <div className="flex items-center gap-2">
          <SiReact size={18} className="text-[#61DAFB]" />
          <SiVite size={16} className="text-[#646CFF]" />
          <SiTailwindcss size={16} className="text-[#06B6D4]" />
        </div>
      </div>
    ),
  },
  {
    title: "Backend",
    subtitle: "Express + Node.js + Zod",
    icon: SiExpress,
    desc: "Express REST API with cookie-based JWT auth, Zod validation, and async error handling via middleware.",
    gradient: "from-green-500 to-teal-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl border border-blue-400/40 bg-blue-500/10 flex items-center justify-center mb-2">
              <FiCode size={22} className="text-blue-400" />
            </div>
            <span className="text-[10px] font-medium text-blue-400">Client</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl border border-green-400/40 bg-green-500/10 flex items-center justify-center mb-2">
              <SiExpress size={22} className="text-green-400" />
            </div>
            <span className="text-[10px] font-medium text-green-400">Express</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl border border-teal-400/40 bg-teal-500/10 flex items-center justify-center mb-2">
              <SiMongodb size={22} className="text-teal-400" />
            </div>
            <span className="text-[10px] font-medium text-teal-400">MongoDB</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-px bg-gradient-to-r from-blue-400/40 via-green-400/40 to-teal-400/40 pointer-events-none" />
        <div className="flex items-center gap-2 mt-6">
          <SiExpress size={16} className="text-green-400" />
          <SiNodedotjs size={16} className="text-[#339933]" />
        </div>
      </div>
    ),
  },
  {
    title: "Database",
    subtitle: "MongoDB + Mongoose",
    icon: SiMongodb,
    desc: "MongoDB with Mongoose schemas stores users and handles document relationships efficiently.",
    gradient: "from-teal-500 to-emerald-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="w-32 h-36 rounded-2xl border border-teal-400/40 bg-teal-500/5 flex flex-col items-center justify-center">
            <SiMongodb size={28} className="text-teal-400 mb-2" />
            <div className="space-y-1.5 w-24">
              <div className="h-2 rounded bg-teal-400/20 w-16 mx-auto" />
              <div className="h-2 rounded bg-teal-400/20 w-20 mx-auto" />
              <div className="h-2 rounded bg-teal-400/20 w-14 mx-auto" />
              <div className="h-2 rounded bg-teal-400/20 w-18 mx-auto" />
              <div className="h-2 rounded bg-yellow-500/30 w-12 mx-auto" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-xs font-bold text-yellow-500">
            _id
          </div>
          <div className="absolute -bottom-2 -left-2 px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30">
            <span className="text-[10px] font-medium text-emerald-400">User</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Cache & Sessions",
    subtitle: "Upstash Redis",
    icon: SiRedis,
    desc: "Upstash Redis handles rate limiting, email verification tokens, OTP storage, and refresh token revocation.",
    gradient: "from-yellow-500 to-orange-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <SiRedis size={28} className="text-[#DC382D]" />
            <span className="text-[10px] font-medium text-[#DC382D]">Redis</span>
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-yellow-500/50 to-orange-500/50 mt-[-1rem]" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-orange-400/30 bg-orange-500/10">
              <span className="text-[10px] font-mono text-orange-400">verify:</span>
              <span className="text-[10px] text-orange-400/60">token...</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-yellow-400/30 bg-yellow-500/10">
              <span className="text-[10px] font-mono text-yellow-400">otp:</span>
              <span className="text-[10px] text-yellow-400/60">46914</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-amber-400/30 bg-amber-500/10">
              <span className="text-[10px] font-mono text-amber-400">refresh:</span>
              <span className="text-[10px] text-amber-400/60">sha256...</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Email Service",
    subtitle: "Nodemailer + Gmail SMTP",
    icon: FiMail,
    desc: "Transactional emails — verification links, OTP codes, and welcome messages — via Nodemailer and Gmail SMTP.",
    gradient: "from-pink-500 to-rose-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="w-40 h-36 rounded-2xl border border-pink-400/30 bg-pink-500/5 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-10 rounded-t-lg border-2 border-b-0 border-pink-400/40 flex items-center justify-center">
                <FiMail size={20} className="text-pink-400" />
              </div>
              <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              <span className="text-[10px] text-pink-400 font-medium mt-1">Email sent</span>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
            <span className="text-green-500 text-xs">&#10003;</span>
          </div>
          <div className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
            <span className="text-[10px] font-medium text-rose-400">SMTP</span>
          </div>
        </div>
        <SiGmail size={18} className="text-[#EA4335]" />
      </div>
    ),
  },
  {
    title: "Security",
    subtitle: "JWT + bcrypt + Rate Limiting",
    icon: SiJsonwebtokens,
    desc: "JWT access + refresh token rotation, bcrypt password hashing (12 rounds), and per-IP rate limiting on auth routes.",
    gradient: "from-red-500 to-purple-600",
    graphic: (
      <div className="relative w-full h-48 flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="w-36 h-36 rounded-2xl border border-red-400/30 bg-red-500/5 flex items-center justify-center">
            <div className="relative">
              <FiShield size={44} className="text-red-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                <span className="text-green-500 text-[8px]">&#10003;</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-3 -left-3 flex gap-1">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-400 font-medium">JWT</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-400 font-medium">bcrypt</span>
          </div>
          <div className="absolute -bottom-2 -right-2">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium">Rate limit</span>
          </div>
        </div>
        <SiJsonwebtokens size={18} className="text-purple-400" />
      </div>
    ),
  },
];

const TechStackCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="px-4 pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Full stack architecture
        </h2>

        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-10 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-[0.03] dark:opacity-[0.06] pointer-events-none`}
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-72 shrink-0">{slide.graphic}</div>

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/10 mb-4">
                <slide.icon size={24} className="text-yellow-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">{slide.title}</h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
                {slide.subtitle}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {slide.desc}
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-yellow-500 w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-6 right-6 text-xs text-gray-400 dark:text-gray-500 font-mono">
            {current + 1}/{slides.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
