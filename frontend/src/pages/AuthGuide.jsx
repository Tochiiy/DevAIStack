import { useState } from "react";
import {
  FiShield,
  FiServer,
  FiFolder,
  FiLock,
  FiBookOpen,
  FiLink,
  FiCheckCircle,
  FiArrowRight,
  FiCpu,
  FiDatabase,
  FiKey,
  FiMail,
  FiClock,
  FiUsers,
  FiCode,
  FiLayers,
  FiTrash2,
} from "react-icons/fi";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiRedis,
  SiJsonwebtokens,
  SiGmail,
} from "react-icons/si";

const tabs = [
  { id: "pipeline", label: "Pipeline", icon: FiLayers },
  { id: "stack", label: "Stack", icon: FiCpu },
  { id: "structure", label: "Structure", icon: FiFolder },
  { id: "security", label: "Security", icon: FiLock },
  { id: "implementation", label: "Steps", icon: FiCode },
  { id: "references", label: "References", icon: FiLink },
];

const Section = ({ title, desc, children }) => (
  <div className="mb-10">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    {desc && (
      <p className="text-gray-600 dark:text-gray-400 text-base font-medium mb-4">
        {desc}
      </p>
    )}
    {children}
  </div>
);

const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 md:p-6 border border-gray-200 dark:border-gray-700 ${className}`}
  >
    {title && (
      <h4 className="font-bold text-base mb-2 text-yellow-700 dark:text-yellow-400">
        {title}
      </h4>
    )}
    {children}
  </div>
);

// ─── Pipeline Diagram ──────────────────────────────────────────
const Pipeline = () => (
  <Section
    title="Authentication Pipeline"
    desc="End-to-end flow of the auth system from request to response."
  >
    <Card>
      <svg
        viewBox="0 0 900 420"
        className="w-full h-auto max-w-4xl mx-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Client */}
        <rect
          x="20"
          y="160"
          width="130"
          height="80"
          rx="10"
          fill="white"
          stroke="#eab308"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <text
          x="85"
          y="198"
          textAnchor="middle"
          fill="#111"
          fontSize="14"
          fontWeight="bold"
        >
          🌐 Client
        </text>
        <text x="85" y="216" textAnchor="middle" fill="#666" fontSize="10">
          React + Axios
        </text>

        {/* Arrow 1 */}
        <defs>
          <marker
            id="a1"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6 Z" fill="#eab308" />
          </marker>
        </defs>
        <line
          x1="150"
          y1="200"
          x2="195"
          y2="200"
          stroke="#eab308"
          strokeWidth="2"
          markerEnd="url(#a1)"
        />

        {/* Rate Limiter */}
        <rect
          x="200"
          y="160"
          width="110"
          height="80"
          rx="10"
          fill="#fef3c7"
          stroke="#eab308"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <text
          x="255"
          y="195"
          textAnchor="middle"
          fill="#92400e"
          fontSize="12"
          fontWeight="bold"
        >
          ⏱ Rate Limiter
        </text>
        <text x="255" y="212" textAnchor="middle" fill="#92400e" fontSize="9">
          Redis INCR + EXPIRE
        </text>
        <text x="255" y="226" textAnchor="middle" fill="#92400e" fontSize="9">
          60s window
        </text>

        {/* Redis icon below rate limiter */}
        <text x="255" y="256" textAnchor="middle" fontSize="10" fill="#dc2626">
          Redis
        </text>

        {/* Arrow 2 */}
        <line
          x1="310"
          y1="200"
          x2="355"
          y2="200"
          stroke="#eab308"
          strokeWidth="2"
          markerEnd="url(#a1)"
        />

        {/* Zod Validation */}
        <rect
          x="360"
          y="160"
          width="110"
          height="80"
          rx="10"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <text
          x="415"
          y="195"
          textAnchor="middle"
          fill="#166534"
          fontSize="12"
          fontWeight="bold"
        >
          🔍 Zod Validation
        </text>
        <text x="415" y="212" textAnchor="middle" fill="#166534" fontSize="9">
          safeParse strips
        </text>
        <text x="415" y="226" textAnchor="middle" fill="#166534" fontSize="9">
          unexpected fields
        </text>

        {/* Arrow 3 */}
        <line
          x1="470"
          y1="200"
          x2="515"
          y2="200"
          stroke="#eab308"
          strokeWidth="2"
          markerEnd="url(#a1)"
        />

        {/* Controller */}
        <rect
          x="520"
          y="160"
          width="120"
          height="80"
          rx="10"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <text
          x="580"
          y="195"
          textAnchor="middle"
          fill="#1e40af"
          fontSize="12"
          fontWeight="bold"
        >
          ⚡ Controller
        </text>
        <text x="580" y="212" textAnchor="middle" fill="#1e40af" fontSize="9">
          TryCatch wrapper
        </text>
        <text x="580" y="226" textAnchor="middle" fill="#1e40af" fontSize="9">
          Business logic
        </text>

        {/* Arrow 4 - split into two */}
        <line
          x1="640"
          y1="180"
          x2="690"
          y2="140"
          stroke="#eab308"
          strokeWidth="2"
          markerEnd="url(#a1)"
        />
        <line
          x1="640"
          y1="220"
          x2="690"
          y2="260"
          stroke="#eab308"
          strokeWidth="2"
          markerEnd="url(#a1)"
        />

        {/* MongoDB */}
        <rect
          x="695"
          y="100"
          width="120"
          height="80"
          rx="10"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <text
          x="755"
          y="135"
          textAnchor="middle"
          fill="#166534"
          fontSize="12"
          fontWeight="bold"
        >
          🍃 MongoDB
        </text>
        <text x="755" y="152" textAnchor="middle" fill="#166534" fontSize="9">
          Mongoose ODM
        </text>
        <text x="755" y="166" textAnchor="middle" fill="#166534" fontSize="9">
          User model
        </text>

        {/* Redis */}
        <rect
          x="695"
          y="240"
          width="120"
          height="80"
          rx="10"
          fill="#fef2f2"
          stroke="#ef4444"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        <text
          x="755"
          y="275"
          textAnchor="middle"
          fill="#991b1b"
          fontSize="12"
          fontWeight="bold"
        >
          ⚡ Redis
        </text>
        <text x="755" y="292" textAnchor="middle" fill="#991b1b" fontSize="9">
          Verify / OTP /
        </text>
        <text x="755" y="306" textAnchor="middle" fill="#991b1b" fontSize="9">
          Refresh tokens
        </text>

        {/* Response arrow back */}
        <path
          d="M755,320 L755,350 L85,350 L85,240"
          stroke="#eab308"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#a1)"
          strokeDasharray="5,3"
        />
        <text x="420" y="365" textAnchor="middle" fill="#999" fontSize="10">
          Response → JSON → Client
        </text>

        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect
            width="860"
            height="38"
            rx="6"
            fill="#f9fafb"
            stroke="#e5e7eb"
          />
          <text x="15" y="25" fill="#666" fontSize="11">
            Pipeline: Request → Rate Limit → Validate → Process → Store →
            Respond
          </text>
          <circle cx="580" cy="12" r="4" fill="#eab308" />
          <text x="590" y="16" fill="#999" fontSize="10">
            JWT issued here
          </text>
        </g>
      </svg>
    </Card>

    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <Card title="Request Lifecycle">
        <ol className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">1.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Client sends request with credentials
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">2.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Rate limiter checks Redis (60s window)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">3.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Zod validates & strips unexpected fields
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">4.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Controller processes business logic
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">5.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              MongoDB persists / Redis caches
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">6.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              JWT access + refresh tokens issued
            </span>
          </li>
        </ol>
      </Card>
      <Card title="Token Flow">
        <ol className="space-y-2 text-base">
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">1.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Access token (15m) in localStorage
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">2.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Refresh token (7d) in httpOnly cookie
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">3.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              API interceptor adds Bearer header
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">4.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              401 → refresh token rotation → retry
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">5.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Refresh token SHA-256 hashed in Redis
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold shrink-0">6.</span>
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Reuse detection revokes token family
            </span>
          </li>
        </ol>
      </Card>
    </div>
  </Section>
);

// ─── Stack ─────────────────────────────────────────────────────
const Stack = () => (
  <Section
    title="Technology Stack"
    desc="Production-grade tools and libraries powering this auth system."
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          icon: SiReact,
          label: "React 19",
          desc: "UI library with concurrent features, lazy loading, Suspense",
          color: "#61dafb",
        },
        {
          icon: SiVite,
          label: "Vite",
          desc: "Fast dev server, instant HMR, optimized builds",
          color: "#646cff",
        },
        {
          icon: SiTailwindcss,
          label: "Tailwind CSS v4",
          desc: "Utility-first CSS with @custom-variant dark mode",
          color: "#06b6d4",
        },
        {
          icon: SiExpress,
          label: "Express",
          desc: "Minimal Node.js web framework, middleware-based routing",
          color: "#666",
        },
        {
          icon: SiNodedotjs,
          label: "Node.js",
          desc: "JavaScript runtime with async/await, event loop",
          color: "#339933",
        },
        {
          icon: SiMongodb,
          label: "MongoDB + Mongoose 8",
          desc: "NoSQL document DB with schema validation, indexes",
          color: "#47a248",
        },
        {
          icon: SiRedis,
          label: "Upstash Redis",
          desc: "Serverless Redis for caching, rate limiting, tokens",
          color: "#dc2626",
        },
        {
          icon: SiJsonwebtokens,
          label: "JWT",
          desc: "Access (15m) + Refresh (7d) tokens with rotation",
          color: "#000",
        },
        {
          icon: SiGmail,
          label: "Nodemailer + Gmail",
          desc: "SMTP transport for verification, OTP, reset emails",
          color: "#ea4335",
        },
      ].map(({ icon: Icon, label, desc, color }) => (
        <Card key={label}>
          <div className="flex items-center gap-3 mb-2">
            <Icon size={28} style={{ color }} />
            <h4 className="font-bold text-base">{label}</h4>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
            {desc}
          </p>
        </Card>
      ))}
    </div>

    <div className="grid sm:grid-cols-2 gap-4 mt-6">
      <Card title="Key Dependencies (Backend)">
        <div className="text-base text-gray-800 dark:text-gray-200 space-y-1.5 font-mono font-medium">
          <div>bcryptjs — password hashing (12 rounds)</div>
          <div>jsonwebtoken — JWT sign/verify</div>
          <div>zod — schema validation</div>
          <div>@upstash/redis — serverless Redis</div>
          <div>nodemailer — email transport</div>
          <div>helmet — security headers</div>
          <div>cookie-parser — cookie handling</div>
          <div>morgan — request logging</div>
          <div>cors — cross-origin requests</div>
        </div>
      </Card>
      <Card title="Key Dependencies (Frontend)">
        <div className="text-base text-gray-800 dark:text-gray-200 space-y-1.5 font-mono font-medium">
          <div>react-router-dom v7 — routing + lazy loading</div>
          <div>axios — HTTP client + interceptors</div>
          <div>react-hook-form — form management</div>
          <div>react-toastify — toast notifications</div>
          <div>react-icons — icon library</div>
          <div>react-dom — React rendering</div>
          <div>tailwindcss — CSS framework</div>
          <div>@tailwindcss/vite — Vite plugin</div>
        </div>
      </Card>
    </div>
  </Section>
);

// ─── File Structure ────────────────────────────────────────────
const Structure = () => (
  <Section
    title="File Structure"
    desc="Project layout with both backend and frontend organized by feature."
  >
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Backend (Express)">
        <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 font-medium leading-relaxed overflow-x-auto">
          {`backend/
├── server.js              # Entry, middleware stack, routes
├── config/
│   ├── db.js              # MongoDB connection
│   ├── redis.js           # Upstash Redis client
│   ├── html.js            # Email templates + escapeHtml
│   └── .env               # PORT, MONGO_URI, JWT_*, REDIS_*
├── controllers/
│   ├── authController.js  # All auth logic (register,
│   │                      #   login, verify, OTP,
│   │                      #   forgot/reset, refresh, logout)
│   └── adminController.js # User management (CRUD, roles)
├── middleware/
│   ├── auth.js            # protect + admin middleware
│   └── tryCatch.js        # Async error wrapper
├── models/
│   └── User.js            # name, email, password, role, isVerified
├── routes/
│   ├── authRoutes.js      # /api/auth/*
│   └── adminRoutes.js     # /api/admin/* (protect + admin)
├── validators/
│   └── authValidate.js    # Zod: registerSchema, loginSchema
└── utils/
    ├── email.js           # Reusable sendMail transport
    └── token.js           # generateAccessToken, generateRefreshToken,
                           #   verifyRefreshToken, hashToken`}
        </pre>
      </Card>
      <Card title="Frontend (React + Vite)">
        <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 font-medium leading-relaxed overflow-x-auto">
          {`frontend/
├── index.html             # Inter font, favicon, dark class
├── vite.config.js         # react + tailwindcss plugins
├── .env                   # VITE_API_URL=http://localhost:5000
├── src/
│   ├── main.jsx           # ReactDOM.createRoot
│   ├── index.css          # Tailwind v4 imports, custom
│   │                      #   animations, @custom-variant dark
│   ├── App.jsx            # Lazy routes, ThemeProvider,
│   │                      #   GuestRoute, AdminRoute
│   ├── context/
│   │   ├── AuthContext.jsx    # user, isAuth, login, logout
│   │   └── ThemeContext.jsx   # dark/light toggle, localStorage
│   ├── components/
│   │   ├── Navbar.jsx     # Sticky, auth-aware, admin link
│   │   ├── Footer.jsx     # Centered copyright
│   │   ├── HeroBanner.jsx # Landing CTA (guest)
│   │   ├── AuthFlow.jsx   # 5-step flow diagram
│   │   ├── TechStackCarousel.jsx  # Brand icons carousel
│   │   ├── FeaturesGrid.jsx      # Feature cards
│   │   └── FeatureCard.jsx       # Single feature card
│   └── pages/
│       ├── apiInterceptor.js     # Axios instance + interceptors
│       ├── Home.jsx       # Guest vs authenticated hero
│       ├── Login.jsx      # react-hook-form, OTP step
│       ├── Register.jsx   # react-hook-form with confirm
│       ├── VerifyEmail.jsx       # Email verification handler
│       ├── VerifyOtp.jsx  # 5-digit OTP input
│       ├── Verify.jsx     # "Check your email" page
│       ├── Dashboard.jsx  # User info, admin panel link
│       ├── AdminDashboard.jsx   # User table, promote/delete
│       ├── ForgotPassword.jsx   # Email input
│       ├── ResetPassword.jsx    # Token + new password
│       └── Logout.jsx     # Logout confirmation`}
        </pre>
      </Card>
    </div>

    <Card title="Environment Variables (.env)" className="mt-6">
      <div className="grid sm:grid-cols-2 gap-4 text-base font-mono">
        <div>
          <p className="text-yellow-700 dark:text-yellow-400 font-bold mb-2">
            Backend
          </p>
          <pre className="text-gray-800 dark:text-gray-200 font-medium">
            PORT=5000 FRONTEND_URL=http://localhost:5173 ........etc
          </pre>
        </div>
        <div>
          <p className="text-yellow-700 dark:text-yellow-400 font-bold mb-2">
            Frontend
          </p>
          <pre className="text-gray-800 dark:text-gray-200 font-medium">
            VITE_API_URL=http://localhost:5000
          </pre>
        </div>
      </div>
    </Card>
  </Section>
);

// ─── Security ──────────────────────────────────────────────────
const Security = () => (
  <Section
    title="Security"
    desc="Defense-in-depth strategies implemented across the stack."
  >
    <div className="space-y-4">
      {[
        {
          icon: FiShield,
          title: "XSS (Cross-Site Scripting)",
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-50 dark:bg-blue-900/20",
          problem:
            "Attacker injects &lt;script&gt; tags into user input, stealing cookies or tokens.",
          solution: [
            "React auto-escapes JSX expressions — no raw HTML interpolation",
            "escapeHtml() helper replaces &, &lt;, &gt;, &quot; in email templates",
            "helmet() sets Content-Security-Policy header",
            "httpOnly cookies prevent JS from reading refreshToken",
          ],
        },
        {
          icon: FiLock,
          title: "CSRF (Cross-Site Request Forgery)",
          color: "text-purple-600 dark:text-purple-400",
          bg: "bg-purple-50 dark:bg-purple-900/20",
          problem:
            "Attacker tricks logged-in user's browser into making unwanted state-changing requests.",
          solution: [
            "sameSite: 'strict' on cookies — browser refuses cross-site sends",
            "CORS whitelist allows only FRONTEND_URL",
            "No separate CSRF token needed (sameSite + CORS is sufficient for SPA)",
          ],
        },
        {
          icon: FiDatabase,
          title: "NoSQL Injection",
          color: "text-green-600 dark:text-green-400",
          bg: "bg-green-50 dark:bg-green-900/20",
          problem:
            "Attacker sends {$gt: ''} or {$ne: null} operators to bypass auth or dump data.",
          solution: [
            "Zod safeParse() strips all unexpected fields before reaching MongoDB",
            "Mongoose alone does NOT prevent NoSQL injection",
            "All inputs validated: registerSchema, loginSchema",
          ],
        },
        {
          icon: FiKey,
          title: "JWT Security & Refresh Token Rotation",
          color: "text-yellow-600 dark:text-yellow-400",
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          problem: "Stolen tokens allow persistent unauthorized access.",
          solution: [
            "Access token: 15m expiry, stored in localStorage",
            "Refresh token: 7d expiry, httpOnly + secure + sameSite cookie",
            "Refresh token SHA-256 hashed before Redis storage",
            "Rotation: every refresh issues a new refresh token, old one deleted",
            "Reuse detection: if a used refresh token is replayed, all tokens revoked",
          ],
        },
        {
          icon: FiClock,
          title: "Rate Limiting",
          color: "text-orange-600 dark:text-orange-400",
          bg: "bg-orange-50 dark:bg-orange-900/20",
          problem:
            "Brute-force attacks guess passwords via mass login attempts.",
          solution: [
            "Redis INCR + EXPIRE with 60s sliding window",
            "Keys: register-rate-limit:&lt;ip&gt;:&lt;email&gt;",
            "Keys: login-rate-limit:&lt;ip&gt;:&lt;email&gt;",
            "Returns 429 after threshold exceeded",
            "Defensive orphan key detection (TTL=-1 → DEL)",
            "try/catch fallback for stale string-valued keys",
          ],
        },
        {
          icon: FiUsers,
          title: "RBAC (Role-Based Access Control)",
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/20",
          problem: "Regular users should not access admin endpoints.",
          solution: [
            "User model has role field: enum ['admin', 'user'], default 'user'",
            "admin middleware checks req.user.role === 'admin'",
            "AdminRoute on frontend redirects non-admin to /dashboard",
            "First user to verify email auto-promoted to admin",
            "Admin panel: list users, promote/demote, delete",
          ],
        },
        {
          icon: FiTrash2,
          title: "Account Deletion",
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/20",
          problem:
            "Users should be able to permanently remove their account and all associated data.",
          solution: [
            "DELETE /api/auth/delete-account endpoint protected by protect middleware",
            "Refresh token deleted from Redis before user document removal",
            "User document removed from MongoDB via findByIdAndDelete",
            "Both httpOnly cookies cleared on server side",
            "Frontend confirmation modal prevents accidental deletion",
            "LocalStorage tokens cleared after deletion, redirect to home",
          ],
        },
        {
          icon: FiMail,
          title: "Email Security",
          color: "text-teal-600 dark:text-teal-400",
          bg: "bg-teal-50 dark:bg-teal-900/20",
          problem: "OTP and reset links can be intercepted or brute-forced.",
          solution: [
            "OTP: 5-digit crypto.randomInt, 5min TTL in Redis",
            "Verify token: crypto.randomBytes(32) hex, 5min TTL",
            "Reset token: stored in Redis with 1h TTL",
            "All emails sent via Gmail SMTP with App Password",
            "OTP and token deleted from Redis after first use (race condition safe)",
          ],
        },
      ].map(({ icon: Icon, title, color, bg, problem, solution }) => (
        <Card key={title} className={bg}>
          <div className="flex items-start gap-3">
            <Icon size={20} className={`shrink-0 mt-0.5 ${color}`} />
            <div className="min-w-0">
              <h4 className="font-bold text-base mb-1">{title}</h4>
              <p className="text-base text-gray-600 dark:text-gray-400 font-medium mb-3">
                {problem}
              </p>
              <ul className="space-y-1.5">
                {solution.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium"
                  >
                    <FiCheckCircle
                      size={16}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

// ─── Implementation Steps ──────────────────────────────────────
const Implementation = () => (
  <Section
    title="Implementation Roadmap"
    desc="From zero to production-grade auth system — three tiers of depth."
  >
    {[
      {
        level: "Beginner",
        icon: FiBookOpen,
        color: "text-green-600 dark:text-green-400",
        border: "border-green-500",
        steps: [
          "Set up Express server with basic middleware stack (cors, helmet, cookie-parser, morgan)",
          "Create MongoDB User model with mongoose (name, email, password, role, isVerified)",
          "Implement register endpoint with bcrypt password hashing (12 rounds)",
          "Implement login endpoint with JWT access token generation",
          "Create protect middleware to verify JWT from Authorization header",
          "Set up React + Vite frontend with react-router-dom routes",
          "Build Login and Register forms with controlled inputs",
          "Store access token in localStorage, send via Authorization header",
          "Create basic Dashboard page showing user info",
        ],
      },
      {
        level: "Intermediate",
        icon: FiLayers,
        color: "text-yellow-600 dark:text-yellow-400",
        border: "border-yellow-500",
        steps: [
          "Add refresh token rotation: httpOnly cookie, 7d expiry, Redis storage with SHA-256 hash",
          "Implement axios interceptor for automatic 401 → refresh → retry with queue",
          "Add OTP-based login: 5-digit code via crypto.randomInt(), emailed, 5min TTL",
          "Implement email verification: crypto token, Redis storage, race condition safe",
          "Add Zod input validation on backend (registerSchema, loginSchema)",
          "Include escapeHtml() helper for XSS-safe email templates",
          "Set up nodemailer transport with Gmail SMTP App Password",
          "Add forgot-password and reset-password flows with 1h TTL reset tokens",
          "Build frontend pages: VerifyEmail, VerifyOtp, ForgotPassword, ResetPassword",
          "Add dark/light mode toggle with ThemeContext + localStorage persistence",
          "Implement rate limiting with Redis INCR/EXPIRE (60s sliding window)",
          "Add react-hook-form to all form pages with client-side validation",
        ],
      },
      {
        level: "Expert",
        icon: FiShield,
        color: "text-red-600 dark:text-red-400",
        border: "border-red-500",
        steps: [
          "Add refresh token reuse detection: delete old hash on rotation, replay returns 401",
          "Implement RBAC: role field in User model, admin middleware, AdminRoute guard",
          "Build Admin Dashboard: user table with pagination, role management, delete",
          "Auto-promote first registered user to admin via User.countDocuments() check",
          "Add race condition prevention: redis.del before User.create in verifyEmail",
          "Defensive orphan key detection: if TTL=-1 after INCR, delete stale key",
          "try/catch fallback for Upstash Redis string-valued keys (ERR value not integer)",
          "Use SHA-256 of refresh token as Redis key — prevents exposure if Redis compromised",
          "SameSite strict + CORS whitelist for CSRF protection (no separate middleware)",
          "ApiInterceptor with concurrent 401 queue: prevents multiple refresh calls",
          "Stale string-key handling for rate limit keys from legacy SET code",
          "Full error boundary: TryCatch wrapper, token expiry vs malformed vs server errors",
          "Self-service account deletion: DELETE /auth/delete-account, confirmation modal, cleanup Redis + cookies",
        ],
      },
    ].map(({ level, icon: Icon, color, border, steps }) => (
      <Card key={level} className={`mt-4 border-l-4 ${border}`}>
        <div className="flex items-center gap-2 mb-3">
          <Icon size={20} className={color} />
          <h4 className={`font-bold text-xl ${color}`}>{level}</h4>
        </div>
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-100 font-medium"
            >
              <span className={`${color} font-bold shrink-0 w-6`}>
                {i + 1}.
              </span>
              {s}
            </li>
          ))}
        </ol>
      </Card>
    ))}
  </Section>
);

// ─── References ────────────────────────────────────────────────
const References = () => (
  <Section
    title="References & Further Reading"
    desc="Real documentation, RFCs, and guides used to build this system."
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          href: "https://helmet.js.org/",
          label: "Helmet.js Docs",
          desc: "HTTP security headers reference",
        },
        {
          href: "https://expressjs.com/en/advanced/best-practice-security.html",
          label: "Express Security Best Practices",
          desc: "Production security checklist",
        },
        {
          href: "https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation",
          label: "Auth0: Refresh Token Rotation",
          desc: "Rotation and reuse detection spec",
        },
        {
          href: "https://www.rfc-editor.org/rfc/rfc9700",
          label: "RFC 9700: OAuth 2.0 Security BCP",
          desc: "Token replay prevention, refresh token protection",
        },
        {
          href: "https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)",
          label: "OWASP CSRF Prevention",
          desc: "SameSite cookies and CSRF tokens",
        },
        {
          href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
          label: "OWASP XSS Prevention",
          desc: "Contextual output encoding cheatsheet",
        },
        {
          href: "https://www.mongodb.com/docs/manual/security/",
          label: "MongoDB Security",
          desc: "NoSQL injection prevention, access control",
        },
        {
          href: "https://zod.dev/",
          label: "Zod Documentation",
          desc: "Schema validation library reference",
        },
        {
          href: "https://docs.upstash.com/redis",
          label: "Upstash Redis Docs",
          desc: "Serverless Redis REST API",
        },
        {
          href: "https://www.npmjs.com/package/bcryptjs",
          label: "bcryptjs",
          desc: "Password hashing library",
        },
        {
          href: "https://jwt.io/introduction",
          label: "JWT Introduction",
          desc: "JSON Web Token structure and usage",
        },
        {
          href: "https://react.dev/",
          label: "React Documentation",
          desc: "React 19 features and best practices",
        },
        {
          href: "https://tailwindcss.com/",
          label: "Tailwind CSS v4 Docs",
          desc: "Utility-first CSS framework",
        },
        {
          href: "https://reactrouter.com/",
          label: "React Router v7 Docs",
          desc: "Routing and lazy loading",
        },
        {
          href: "https://axios-http.com/",
          label: "Axios Docs",
          desc: "HTTP client with interceptors",
        },
        {
          href: "https://www.react-hook-form.com/",
          label: "React Hook Form",
          desc: "Performant form validation",
        },
        {
          href: "https://github.com/helmetjs/helmet/issues/230",
          label: "Helmet: X-XSS-Protection Discussion",
          desc: "Why helmet disables the legacy XSS filter",
        },
        {
          href: "https://www.loginradius.com/blog/identity/secure-refresh-token-rotation",
          label: "LoginRadius: Refresh Token Rotation",
          desc: "Rotation + reuse detection explained",
        },
      ].map(({ href, label, desc }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-colors"
        >
          <h4 className="font-bold text-base text-yellow-700 dark:text-yellow-400 mb-1 flex items-center gap-1">
            {label} <FiArrowRight size={14} className="shrink-0" />
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {desc}
          </p>
        </a>
      ))}
    </div>
  </Section>
);

// ─── Main Component ────────────────────────────────────────────
const AuthGuide = () => {
  const [activeTab, setActiveTab] = useState("pipeline");

  const components = {
    pipeline: Pipeline,
    stack: Stack,
    structure: Structure,
    security: Security,
    implementation: Implementation,
    references: References,
  };
  const ActiveComponent = components[activeTab];

  return (
    <div className="px-4 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <FiShield className="text-yellow-500" size={32} />
          <h1 className="text-4xl font-extrabold">Auth System Guide</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-8">
          Comprehensive walkthrough of the production-grade MERN authentication
          architecture.
        </p>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t text-base font-semibold transition-colors ${
                activeTab === id
                  ? "text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-500 -mb-[3px]"
                  : "text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Active section */}
        <div className="animate-fade-up">
          <ActiveComponent />
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-base text-gray-500 dark:text-gray-400 font-medium border-t border-gray-200 dark:border-gray-700 pt-8">
          Built with production-grade security patterns. beginner friendly.
        </div>
      </div>
    </div>
  );
};

export default AuthGuide;
