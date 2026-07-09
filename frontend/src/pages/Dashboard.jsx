import { useState } from "react";
import {
  FiBookOpen, FiArrowRight, FiCheckCircle, FiCode, FiServer, FiCloud,
  FiCpu, FiLayers, FiDatabase, FiGlobe, FiBox, FiZap, FiShield,
  FiUsers, FiGrid, FiTool, FiAlertTriangle, FiLink,
} from "react-icons/fi";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiPostgresql, SiMongodb, SiRedis, SiDocker,
  SiPython, SiFastapi, SiGraphql, SiPrisma,
} from "react-icons/si";

const Section = ({ title, desc, children }) => (
  <div className="mb-12">
    <h3 className="text-3xl font-extrabold mb-2">{title}</h3>
    {desc && <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-6">{desc}</p>}
    {children}
  </div>
);

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 md:p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
    {title && <h4 className="font-bold text-lg mb-2 text-yellow-700 dark:text-yellow-400">{title}</h4>}
    {children}
  </div>
);

const sub = (text, className = "") => <p className={`text-base text-gray-600 dark:text-gray-300 font-medium ${className}`}>{text}</p>;

const ExternalLink = ({ href, label, desc }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-colors">
    <h4 className="font-bold text-base text-yellow-700 dark:text-yellow-400 mb-1 flex items-center gap-1">{label} <FiArrowRight size={14} className="shrink-0" /></h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{desc}</p>
  </a>
);

const prerequisitesLinks = [
  { href: "https://www.freecodecamp.org/", label: "freeCodeCamp", desc: "Full coding curriculum — HTML, CSS, JS, Python, and more" },
  { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", label: "MDN JavaScript Guide", desc: "The definitive JS reference — language fundamentals" },
  { href: "https://javascript.info/", label: "JavaScript.info", desc: "Modern JS tutorial from basics to advanced" },
  { href: "https://roadmap.sh/", label: "roadmap.sh", desc: "Role-based developer roadmaps with step-by-step guides" },
  { href: "https://www.theodinproject.com/", label: "The Odin Project", desc: "Full-stack curriculum — free and open source" },
  { href: "https://www.learnpython.org/", label: "Learn Python", desc: "Interactive Python tutorial for beginners" },
];

const PrerequisitesBanner = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
    <div className="flex items-center gap-2 mb-3">
      <FiBookOpen className="text-blue-500 shrink-0" size={20} />
      <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400">New to programming? Start here</h4>
    </div>
    <p className="text-base text-blue-600 dark:text-blue-300 font-medium mb-4">
      These free resources teach the fundamentals before diving into our guides.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {prerequisitesLinks.map(l => <ExternalLink key={l.href} {...l} />)}
    </div>
  </div>
);

// ─── 1. ROADMAP ─────────────────────────────────────────────

const tiers = [
  { color: "text-green-500", border: "border-green-500", bg: "bg-green-50 dark:bg-green-900/20", level: "Beginner (Days 1–30)", icon: FiBookOpen, steps: [
    "HTML5, CSS3, Flexbox, Grid, responsive design basics",
    "JavaScript: variables, functions, DOM, async/await, fetch, modules",
    "Git & GitHub: init, commit, branch, merge, pull requests",
    "Node.js basics: modules, file system, npm, package.json",
    "Express: routing, middleware, request/response, error handling",
    "MongoDB: CRUD, Mongoose schemas, basic aggregation",
    "React: components, JSX, props, state, hooks, useEffect",
    "Build a simple full-stack CRUD app from scratch",
  ]},
  { color: "text-yellow-600", border: "border-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", level: "Intermediate (Days 31–60)", icon: FiLayers, steps: [
    "TypeScript: interfaces, generics, utility types, strict mode",
    "Authentication: JWT, bcrypt, OTP, refresh tokens, RBAC",
    "Databases: PostgreSQL, Prisma ORM, relations, migrations",
    "Redis: caching, rate limiting, session store, pub/sub",
    "Docker: Dockerfile, compose, multi-stage builds, volumes",
    "Testing: Vitest, Supertest, React Testing Library, TDD basics",
    "REST API design: pagination, filtering, versioning, status codes",
    "Python basics: data types, functions, classes, comprehensions",
    "FastAPI: async routes, Pydantic, dependency injection, OpenAPI",
  ]},
  { color: "text-red-600", border: "border-red-500", bg: "bg-red-50 dark:bg-red-900/20", level: "Advanced (Days 61–90)", icon: FiZap, steps: [
    "System design: load balancing, caching, CDN, sharding, CAP theorem",
    "Microservices: service decomposition, API gateway, inter-service comm",
    "Message queues: RabbitMQ, Kafka, BullMQ, event-driven patterns",
    "AI/LLM: OpenAI/Anthropic API, prompt engineering, function calling",
    "RAG: embeddings, vector DBs, chunking, hybrid search, re-ranking",
    "AI agents: LangGraph, CrewAI, multi-agent, tools, human-in-loop",
    "CI/CD: GitHub Actions, Docker registry, zero-downtime deploy",
    "Monitoring: Sentry, OpenTelemetry, Grafana, structured logging",
    "Production: load testing (k6), profiling, memory/CPU optimization",
  ]},
];

const Roadmap = () => (
  <Section title="90-Day Learning Roadmap" desc="Structured path from zero to production-grade full-stack + AI engineer.">
    <PrerequisitesBanner />
    <div className="space-y-6">
      {tiers.map(({ level, icon: Icon, color, border, bg, steps }) => (
        <Card key={level} className={`border-l-4 ${border} ${bg}`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon size={20} className={color} />
            <h4 className={`font-bold text-xl ${color}`}>{level}</h4>
          </div>
          <ol className="space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-100 font-medium">
                <span className={`${color} font-bold shrink-0 w-6`}>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </Card>
      ))}
    </div>
  </Section>
);

// ─── 2. FULL-STACK ──────────────────────────────────────────

const fullStackTopics = [
  {
    title: "Node.js & Express (Beginner → Advanced)",
    icon: SiNodedotjs, color: "#339933",
    items: [
      "Event loop, call stack, task queue, microtasks — visual walkthrough",
      "Streams: readable, writable, transform, pipeline, backpressure",
      "Child processes: spawn, exec, fork, cluster module for multi-core",
      "Express middleware: application-level, router-level, error-handling",
      "Validation: Zod schemas, safeParse, custom refinements",
      "Authentication: JWT access + refresh rotation, httpOnly cookies",
      "Rate limiting: Redis INCR/EXPIRE, sliding window, stale key fallback",
      "File uploads: multer, S3 presigned URLs, streaming to cloud",
      "WebSocket: Socket.io rooms, adapters, horizontal scaling with Redis",
      "Testing: Supertest + Vitest, mock Redis/MongoDB, CI integration",
    ],
  },
  {
    title: "FastAPI & Python (Beginner → Advanced)",
    icon: SiFastapi, color: "#009688",
    items: [
      "Python: typing, dataclasses, async/await, context managers, generators",
      "FastAPI: APIRouter, Depends, BackgroundTasks, middleware, lifespan",
      "Pydantic v2: models, validators, serialization, nested schemas",
      "SQLAlchemy 2.0: async ORM, relationships, migrations (Alembic)",
      "Authentication: OAuth2 with JWT, scopes, password flow",
      "Celery: task queues, periodic tasks, Redis broker, flower monitoring",
      "WebSocket: FastAPI WebSocket, broadcast, connection manager",
      "Async: asyncio, gather, semaphores, queues, connection pooling",
      "ML serving: ONNX, Triton, BentoML, model versioning",
      "OpenAPI: automatic docs, custom tags, examples, deprecation",
    ],
  },
  {
    title: "React & React Native",
    icon: SiReact, color: "#61dafb",
    items: [
      "React 19: hooks, Suspense, use() hook, server components",
      "State: useState, useReducer, Context, Zustand, TanStack Query",
      "Performance: memo, useMemo, useCallback, code splitting, lazy",
      "Routing: React Router v7, loaders, actions, error boundaries",
      "Forms: react-hook-form, Zod resolver, controlled/uncontrolled",
      "Testing: Vitest, RTL, user-event, mocking MSW, Playwright E2E",
      "React Native: Expo, navigation, native modules, push notifications",
      "RN: Metro bundler, Hermes engine, performance profiling",
      "Offline: AsyncStorage, SQLite, NetInfo, sync strategies",
      "Deployment: EAS Build, app stores, CodePush, OTA updates",
    ],
  },
  {
    title: "Databases (SQL & NoSQL — In Depth)",
    icon: SiPostgresql, color: "#4169e1",
    items: [
      "PostgreSQL: indexing (B-tree, GiST, GIN, BRIN), EXPLAIN ANALYZE",
      "Advanced queries: CTEs, window functions, recursive queries, LATERAL",
      "MongoDB: aggregation pipeline ($match, $group, $lookup, $unwind, $facet)",
      "Mongoose: populate, virtuals, pre/post hooks, discriminators, plugins",
      "Prisma: schema design, relations, migrations, raw queries, middleware",
      "Performance: connection pooling, query optimization, indexing strategies",
      "Sharding: horizontal vs vertical, consistent hashing, rebalancing",
      "Replication: primary-secondary, read replicas, failover, RPO/RTO",
      "Migrations: version control, rollback, zero-downtime, data migration",
      "NoSQL: document vs graph vs columnar vs time-series — when to use what",
    ],
  },
];

const FullStack = () => (
  <Section title="Full-Stack Development" desc="Node, FastAPI, React, React Native, SQL, NoSQL — complete with 2026 best practices.">
    <PrerequisitesBanner />
    <div className="space-y-6">
      {fullStackTopics.map(({ title, icon: Icon, color, items }) => (
        <Card key={title}>
          <div className="flex items-center gap-2 mb-3">
            <Icon size={22} style={{ color }} />
            <h4 className="font-bold text-xl">{title}</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>

    <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">MERN Stack Flow</h4>
    <Card className="mb-6">
      <svg viewBox="0 0 860 260" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="mernArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
          <filter id="mernShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
        </defs>
        <rect x="20" y="90" width="120" height="80" rx="10" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="80" y="118" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">React / Vite</text>
        <text x="80" y="135" textAnchor="middle" fill="#666" fontSize="10">Frontend SPA</text>
        <text x="80" y="150" textAnchor="middle" fill="#666" fontSize="10">react-hook-form</text>
        <line x1="140" y1="130" x2="200" y2="130" stroke="#eab308" strokeWidth="2" markerEnd="url(#mernArrow)" />
        <rect x="205" y="90" width="130" height="80" rx="10" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="270" y="118" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Axios Interceptor</text>
        <text x="270" y="135" textAnchor="middle" fill="#92400e" fontSize="10">401 → refresh queue</text>
        <text x="270" y="150" textAnchor="middle" fill="#92400e" fontSize="10">Bearer token attach</text>
        <line x1="335" y1="110" x2="395" y2="90" stroke="#eab308" strokeWidth="2" markerEnd="url(#mernArrow)" />
        <line x1="335" y1="150" x2="395" y2="170" stroke="#eab308" strokeWidth="2" markerEnd="url(#mernArrow)" />
        <rect x="400" y="50" width="130" height="80" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="465" y="78" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Express API</text>
        <text x="465" y="95" textAnchor="middle" fill="#1e40af" fontSize="10">Zod validation</text>
        <text x="465" y="110" textAnchor="middle" fill="#1e40af" fontSize="10">JWT auth middleware</text>
        <line x1="465" y1="50" x2="465" y2="20" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mernArrow)" />
        <rect x="400" y="170" width="130" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="465" y="198" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Rate Limiter</text>
        <text x="465" y="215" textAnchor="middle" fill="#92400e" fontSize="10">Redis INCR/EXPIRE</text>
        <text x="465" y="230" textAnchor="middle" fill="#92400e" fontSize="10">60s sliding window</text>
        <line x1="530" y1="90" x2="590" y2="130" stroke="#eab308" strokeWidth="2" markerEnd="url(#mernArrow)" />
        <line x1="530" y1="210" x2="590" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mernArrow)" />
        <rect x="595" y="90" width="120" height="80" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="655" y="115" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">MongoDB</text>
        <text x="655" y="132" textAnchor="middle" fill="#166534" fontSize="10">Mongoose ODM</text>
        <text x="655" y="147" textAnchor="middle" fill="#166534" fontSize="10">User model</text>
        <line x1="715" y1="110" x2="765" y2="80" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mernArrow)" />
        <line x1="715" y1="150" x2="765" y2="180" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mernArrow)" />
        <rect x="770" y="45" width="70" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="805" y="73" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">Redis</text>
        <text x="805" y="90" textAnchor="middle" fill="#991b1b" fontSize="9">tokens</text>
        <text x="805" y="103" textAnchor="middle" fill="#991b1b" fontSize="9">OTP / rate</text>
        <rect x="770" y="155" width="70" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#mernShadow)" />
        <text x="805" y="183" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">MongoDB</text>
        <text x="805" y="200" textAnchor="middle" fill="#166534" fontSize="9">persist</text>
        <text x="805" y="213" textAnchor="middle" fill="#166534" fontSize="9">users</text>
        <text x="10" y="20" fill="#999" fontSize="10">MERN Stack: React → Axios Interceptor → Express (Validate + Auth + Rate Limit) → MongoDB + Redis</text>
        <path d="M805,115 L805,130 L270,130 L270,170" stroke="#eab308" strokeWidth="1" fill="none" markerEnd="url(#mernArrow)" strokeDasharray="4,3" />
        <text x="540" y="248" textAnchor="middle" fill="#999" fontSize="9">Response → JSON → Client</text>
      </svg>
    </Card>

    <h4 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">FastAPI + Python Stack Flow</h4>
    <Card className="mb-6">
      <svg viewBox="0 0 860 260" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="faArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
          <filter id="faShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
        </defs>
        <rect x="20" y="90" width="110" height="80" rx="10" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="75" y="118" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Frontend</text>
        <text x="75" y="135" textAnchor="middle" fill="#666" fontSize="10">React / Next.js</text>
        <text x="75" y="150" textAnchor="middle" fill="#666" fontSize="10">Tailwind CSS</text>
        <line x1="130" y1="130" x2="180" y2="130" stroke="#eab308" strokeWidth="2" markerEnd="url(#faArrow)" />
        <rect x="185" y="90" width="120" height="80" rx="10" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="245" y="115" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Nginx / Caddy</text>
        <text x="245" y="132" textAnchor="middle" fill="#92400e" fontSize="10">reverse proxy</text>
        <text x="245" y="147" textAnchor="middle" fill="#92400e" fontSize="10">SSL / static</text>
        <line x1="305" y1="130" x2="355" y2="130" stroke="#eab308" strokeWidth="2" markerEnd="url(#faArrow)" />
        <rect x="360" y="90" width="130" height="80" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="425" y="115" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">FastAPI (Uvicorn)</text>
        <text x="425" y="132" textAnchor="middle" fill="#166534" fontSize="10">Pydantic validation</text>
        <text x="425" y="147" textAnchor="middle" fill="#166534" fontSize="10">async endpoints</text>
        <line x1="425" y1="90" x2="425" y2="30" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#faArrow)" />
        <line x1="425" y1="170" x2="425" y2="220" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#faArrow)" />
        <rect x="360" y="225" width="130" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="425" y="244" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Celery Workers</text>
        <rect x="360" y="10" width="130" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="425" y="29" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Redis (cache / broker)</text>
        <line x1="490" y1="115" x2="540" y2="115" stroke="#eab308" strokeWidth="2" markerEnd="url(#faArrow)" />
        <line x1="490" y1="145" x2="540" y2="145" stroke="#eab308" strokeWidth="2" markerEnd="url(#faArrow)" />
        <rect x="545" y="30" width="110" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="600" y="55" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">SQLAlchemy</text>
        <text x="600" y="70" textAnchor="middle" fill="#1e40af" fontSize="10">async ORM</text>
        <text x="600" y="85" textAnchor="middle" fill="#1e40af" fontSize="10">Alembic mig.</text>
        <rect x="545" y="115" width="110" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="600" y="140" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">PostgreSQL</text>
        <text x="600" y="155" textAnchor="middle" fill="#166534" fontSize="10">relational DB</text>
        <text x="600" y="170" textAnchor="middle" fill="#166534" fontSize="10">indexes / CTEs</text>
        <line x1="600" y1="115" x2="600" y2="185" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="655" y1="65" x2="715" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#faArrow)" />
        <line x1="655" y1="150" x2="715" y2="150" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#faArrow)" />
        <rect x="720" y="30" width="110" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="775" y="55" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">Redis</text>
        <text x="775" y="70" textAnchor="middle" fill="#991b1b" fontSize="10">Celery broker</text>
        <text x="775" y="85" textAnchor="middle" fill="#991b1b" fontSize="10">rate limit</text>
        <rect x="720" y="115" width="110" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#faShadow)" />
        <text x="775" y="140" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">FastAPI</text>
        <text x="775" y="155" textAnchor="middle" fill="#991b1b" fontSize="10">ML serving</text>
        <text x="775" y="170" textAnchor="middle" fill="#991b1b" fontSize="10">OpenAPI docs</text>
        <line x1="720" y1="65" x2="680" y2="65" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <text x="10" y="260" fill="#999" fontSize="10">FastAPI Stack: Frontend → Nginx → FastAPI (Pydantic + Async) → SQLAlchemy → PostgreSQL + Redis (cache/broker) + Celery</text>
        <path d="M775,185 L775,210 L75,210 L75,170" stroke="#eab308" strokeWidth="1" fill="none" markerEnd="url(#faArrow)" strokeDasharray="4,3" />
        <text x="420" y="258" textAnchor="middle" fill="#999" fontSize="9">Response → JSON → Client</text>
      </svg>
    </Card>

    <h4 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">MERN End-to-End Request Logic Flow</h4>
    <Card className="mb-6">
      <svg viewBox="0 0 900 380" className="w-full h-auto max-w-5xl mx-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="mlArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5 Z" fill="#eab308" /></marker>
          <filter id="mlShadow"><feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity="0.12" /></filter>
        </defs>
        <rect x="10" y="30" width="100" height="70" rx="8" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="60" y="57" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Browser</text>
        <text x="60" y="72" textAnchor="middle" fill="#666" fontSize="9">user action</text>
        <text x="60" y="85" textAnchor="middle" fill="#666" fontSize="9">click / submit</text>
        <line x1="110" y1="65" x2="145" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="150" y="30" width="105" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="202" y="55" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">React Component</text>
        <text x="202" y="70" textAnchor="middle" fill="#92400e" fontSize="9">react-hook-form</text>
        <text x="202" y="83" textAnchor="middle" fill="#92400e" fontSize="9">client validation</text>
        <line x1="255" y1="45" x2="290" y2="25" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="255" y1="85" x2="290" y2="105" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="295" y="5" width="100" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="345" y="25" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Axios Interceptor</text>
        <text x="345" y="40" textAnchor="middle" fill="#92400e" fontSize="9">attach Bearer</text>
        <rect x="295" y="75" width="100" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="345" y="95" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">401 Handler</text>
        <text x="345" y="110" textAnchor="middle" fill="#92400e" fontSize="9">refresh queue</text>
        <line x1="395" y1="32" x2="440" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="395" y1="102" x2="440" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="445" y="30" width="110" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="500" y="55" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Express Route</text>
        <text x="500" y="70" textAnchor="middle" fill="#166534" fontSize="9">method + URL</text>
        <text x="500" y="83" textAnchor="middle" fill="#166534" fontSize="9">params match</text>
        <line x1="555" y1="50" x2="590" y2="35" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="555" y1="80" x2="590" y2="95" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="595" y="5" width="100" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="645" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Rate Limiter</text>
        <text x="645" y="40" textAnchor="middle" fill="#1e40af" fontSize="9">Redis INCR</text>
        <rect x="595" y="75" width="100" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="645" y="95" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Zod Validate</text>
        <text x="645" y="110" textAnchor="middle" fill="#1e40af" fontSize="9">safeParse</text>
        <line x1="645" y1="60" x2="645" y2="75" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="695" y1="32" x2="730" y2="45" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="695" y1="102" x2="730" y2="85" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="735" y="30" width="100" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="785" y="53" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Controller</text>
        <text x="785" y="68" textAnchor="middle" fill="#991b1b" fontSize="9">business logic</text>
        <text x="785" y="83" textAnchor="middle" fill="#991b1b" fontSize="9">TryCatch wrap</text>
        <line x1="835" y1="50" x2="865" y2="35" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="835" y1="80" x2="865" y2="95" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="10" y="160" width="100" height="55" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="60" y="182" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">MongoDB</text>
        <text x="60" y="197" textAnchor="middle" fill="#166534" fontSize="9">Mongoose query</text>
        <rect x="130" y="160" width="100" height="55" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="180" y="182" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Redis</text>
        <text x="180" y="197" textAnchor="middle" fill="#991b1b" fontSize="9">get/set/del</text>
        <line x1="60" y1="155" x2="60" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="180" y1="155" x2="180" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <rect x="260" y="160" width="120" height="55" rx="8" fill="white" stroke="#22c55e" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="320" y="182" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Response JSON</text>
        <text x="320" y="197" textAnchor="middle" fill="#666" fontSize="9">send JSON</text>
        <line x1="320" y1="160" x2="320" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#mlArrow)" />
        <line x1="380" y1="187" x2="820" y2="187" stroke="#eab308" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="820" y1="187" x2="820" y2="165" stroke="#eab308" strokeWidth="1" markerEnd="url(#mlArrow)" />
        <rect x="420" y="160" width="140" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="490" y="180" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Toast Notification</text>
        <text x="490" y="195" textAnchor="middle" fill="#92400e" fontSize="9">success / error</text>
        <line x1="490" y1="160" x2="490" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="600" y="160" width="140" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#mlShadow)" />
        <text x="670" y="180" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">State Update</text>
        <text x="670" y="195" textAnchor="middle" fill="#92400e" fontSize="9">setUser / redirect</text>
        <line x1="670" y1="160" x2="670" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <text x="10" y="240" fill="#999" fontSize="10">Full Cycle: Browser → React → Axios → Express (Rate Limit → Zod → Controller) → MongoDB/Redis → JSON Response → State Update</text>
        <text x="10" y="260" fill="#999" fontSize="9">Error Path: Controller throws → TryCatch catches → 500 JSON → Axios interceptor catches → 401 refresh or reject → Toast error</text>
      </svg>
    </Card>

    <h4 className="text-xl font-bold mb-3 text-cyan-700 dark:text-cyan-400">FastAPI End-to-End Request Logic Flow</h4>
    <Card className="mb-6">
      <svg viewBox="0 0 900 380" className="w-full h-auto max-w-5xl mx-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="flArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5 Z" fill="#eab308" /></marker>
          <filter id="flShadow"><feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity="0.12" /></filter>
        </defs>
        <rect x="10" y="30" width="95" height="70" rx="8" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="57" y="57" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Frontend</text>
        <text x="57" y="72" textAnchor="middle" fill="#666" fontSize="9">React / Next</text>
        <line x1="105" y1="65" x2="135" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="140" y="30" width="95" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="187" y="55" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Nginx / Caddy</text>
        <text x="187" y="70" textAnchor="middle" fill="#92400e" fontSize="9">reverse proxy</text>
        <text x="187" y="83" textAnchor="middle" fill="#92400e" fontSize="9">SSL termination</text>
        <line x1="235" y1="65" x2="265" y2="65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="270" y="30" width="105" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="322" y="53" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">FastAPI Middleware</text>
        <text x="322" y="68" textAnchor="middle" fill="#166534" fontSize="9">CORS / Trusted</text>
        <text x="322" y="83" textAnchor="middle" fill="#166534" fontSize="9">Host / Auth</text>
        <line x1="375" y1="50" x2="410" y2="35" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <line x1="375" y1="80" x2="410" y2="95" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="415" y="5" width="110" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="470" y="25" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Rate Limiter</text>
        <text x="470" y="40" textAnchor="middle" fill="#92400e" fontSize="9">Redis / slowapi</text>
        <rect x="415" y="75" width="110" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="470" y="95" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Pydantic Validation</text>
        <text x="470" y="110" textAnchor="middle" fill="#1e40af" fontSize="9">request model</text>
        <line x1="470" y1="60" x2="470" y2="75" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="525" y1="32" x2="555" y2="45" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <line x1="525" y1="102" x2="555" y2="85" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="560" y="30" width="105" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="612" y="53" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Controller / Route</text>
        <text x="612" y="68" textAnchor="middle" fill="#991b1b" fontSize="9">Depends injection</text>
        <text x="612" y="83" textAnchor="middle" fill="#991b1b" fontSize="9">async business</text>
        <line x1="665" y1="50" x2="695" y2="35" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <line x1="665" y1="80" x2="695" y2="95" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="700" y="5" width="100" height="55" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="750" y="25" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">SQLAlchemy</text>
        <text x="750" y="40" textAnchor="middle" fill="#166534" fontSize="9">async ORM query</text>
        <rect x="700" y="75" width="100" height="55" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="750" y="95" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Redis</text>
        <text x="750" y="110" textAnchor="middle" fill="#991b1b" fontSize="9">get/set cache</text>
        <line x1="700" y1="32" x2="685" y2="32" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="750" y1="60" x2="750" y2="75" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="10" y="160" width="110" height="55" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="65" y="182" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">PostgreSQL</text>
        <text x="65" y="197" textAnchor="middle" fill="#166534" fontSize="9">execute query</text>
        <line x1="65" y1="160" x2="65" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <rect x="140" y="160" width="110" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="195" y="182" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Celery Worker</text>
        <text x="195" y="197" textAnchor="middle" fill="#92400e" fontSize="9">async task</text>
        <line x1="195" y1="160" x2="195" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="280" y="160" width="110" height="55" rx="8" fill="white" stroke="#22c55e" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="335" y="182" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">Response JSON</text>
        <text x="335" y="197" textAnchor="middle" fill="#666" fontSize="9">Pydantic out</text>
        <line x1="335" y1="160" x2="335" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#flArrow)" />
        <line x1="390" y1="187" x2="835" y2="187" stroke="#eab308" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="835" y1="187" x2="835" y2="165" stroke="#eab308" strokeWidth="1" markerEnd="url(#flArrow)" />
        <rect x="430" y="160" width="130" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="495" y="180" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">OpenAPI Docs</text>
        <text x="495" y="195" textAnchor="middle" fill="#92400e" fontSize="9">auto-generated</text>
        <line x1="495" y1="160" x2="495" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="590" y="160" width="120" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="650" y="180" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">Frontend Update</text>
        <text x="650" y="195" textAnchor="middle" fill="#92400e" fontSize="9">state / redirect</text>
        <line x1="650" y1="160" x2="650" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="745" y="160" width="120" height="55" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#flShadow)" />
        <text x="805" y="180" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Error Handler</text>
        <text x="805" y="195" textAnchor="middle" fill="#991b1b" fontSize="9">HTTPException</text>
        <line x1="805" y1="160" x2="805" y2="130" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <text x="10" y="240" fill="#999" fontSize="10">Full Cycle: Frontend → Nginx → FastAPI (Rate Limit → Pydantic → Controller) → SQLAlchemy/Redis → PostgreSQL → JSON Response → Client</text>
        <text x="10" y="260" fill="#999" fontSize="9">Async Flow: await DB → await Redis → await Celery → gather results → HTTPException on error → Pydantic serialization → JSON</text>
      </svg>
    </Card>

    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      <Card title="MERN Request Lifecycle (6 steps)">
        <ol className="space-y-1.5 text-base text-gray-800 dark:text-gray-200 font-medium">
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">1.</span> User action triggers React component → react-hook-form validates client-side</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">2.</span> Axios interceptor attaches Bearer token from localStorage, queues if refreshing</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">3.</span> Express rate limiter checks Redis (60s window) → returns 429 if exceeded</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">4.</span> Zod safeParse validates input → strips unexpected fields → controller runs</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">5.</span> Controller queries MongoDB (Mongoose) or Redis → TryCatch catches errors</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">6.</span> JSON response → Axios returns data → React updates state + shows toast</li>
        </ol>
      </Card>
      <Card title="FastAPI Request Lifecycle (6 steps)">
        <ol className="space-y-1.5 text-base text-gray-800 dark:text-gray-200 font-medium">
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">1.</span> Frontend sends request → Nginx terminates SSL, proxies to FastAPI (Uvicorn)</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">2.</span> FastAPI middleware stack runs: CORS, trusted hosts, auth, rate limiter</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">3.</span> Pydantic model validates request body/query → auto-400 on failure</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">4.</span> Route handler async-await DB calls via SQLAlchemy — no thread blocking</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">5.</span> Redis cache check before query, Celery tasks dispatched for background work</li>
          <li className="flex items-start gap-2"><span className="text-yellow-500 font-bold shrink-0">6.</span> Pydantic serializes response → FastAPI returns JSON → OpenAPI docs live</li>
        </ol>
      </Card>
    </div>

    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://nodejs.org/docs/latest/api/" label="Node.js Docs" desc="Streams, cluster, async hooks" />
      <ExternalLink href="https://fastapi.tiangolo.com/" label="FastAPI Docs" desc="Async, dependencies, testing" />
      <ExternalLink href="https://react.dev/" label="React 19 Docs" desc="Hooks, Suspense, server components" />
      <ExternalLink href="https://reactnative.dev/" label="React Native" desc="Expo, navigation, native APIs" />
      <ExternalLink href="https://www.postgresql.org/docs/" label="PostgreSQL Docs" desc="Advanced queries, indexing" />
      <ExternalLink href="https://www.mongodb.com/docs/manual/aggregation/" label="MongoDB Aggregation" desc="Pipeline stages, expressions" />
      <ExternalLink href="https://www.prisma.io/docs" label="Prisma ORM" desc="Schema, relations, migrations" />
      <ExternalLink href="https://www.mongodb.com/docs/manual/aggregation/" label="Mongoose Docs" desc="Populate, virtuals, hooks" />
    </div>
  </Section>
);

// ─── 3. AI & AGENTS ─────────────────────────────────────────

const ragArchitectures = [
  { name: "Naive RAG", desc: "Simple retrieve → augment → generate. Query → embed → top-k chunks → LLM. Baseline for all RAG systems." },
  { name: "Advanced RAG (Hybrid)", desc: "Dense (embedding) + sparse (BM25) retrieval with reciprocal rank fusion. Handles keyword + semantic search." },
  { name: "Multi-Hop RAG", desc: "Iterative retrieval: answer one hop, use result to query the next. For complex questions needing multiple sources." },
  { name: "Agentic RAG", desc: "LLM decides when and what to retrieve. Tool-calling agents with query rewriting, routing, and self-correction." },
  { name: "Graph RAG", desc: "Build a knowledge graph from documents. Traverse entities and relationships for structured, multi-relational queries." },
  { name: "Self-RAG", desc: "LLM generates then reflects: retrieves only when needed, critiques its own output, cites sources. Improves factuality." },
  { name: "Corrective RAG (CRAG)", desc: "Retrieve → evaluate relevance → if low, rewrite query or web search → re-retrieve → generate." },
  { name: "Speculative RAG", desc: "Generate multiple draft answers in parallel from different document subsets, then select/vote on best." },
  { name: "Multi-Modal RAG", desc: "Retrieve images, tables, audio, video alongside text. Embed all modalities into shared vector space." },
  { name: "Streaming RAG", desc: "Stream tokens as they're generated while retrieving additional context in parallel. Low-latency real-time pipelines." },
];

const aiTopics = [
  {
    title: "LLMs & API Integration",
    icon: FiZap, color: "text-yellow-500",
    items: ["GPT-4o, Claude 3.5, Gemini 1.5, Llama 3, Mistral — API patterns", "Function calling, structured outputs, JSON mode", "Streaming: SSE, Vercel AI SDK, LangChain streaming", "Context windows, token counting, cost optimization", "System prompts, personas, guardrails, safety filters"],
  },
  {
    title: "AI Agents (Beginner → Advanced)",
    icon: FiCpu, color: "text-purple-500",
    items: ["LangGraph: state graphs, cycles, checkpointing, human-in-loop", "CrewAI: role-based teams, tasks, tools, delegation", "AutoGen: multi-agent conversation, code exec, tools", "Swarm: lightweight OpenAI multi-agent orchestration", "Agent memory: short-term, long-term, semantic, episodic"],
  },
  {
    title: "RAG Pipelines (8+ Architectures Above)",
    icon: FiDatabase, color: "text-blue-500",
    items: ["Embedding models: text-embedding-3-small, BGE, E5, Instructor", "Vector DBs: Pinecone, Weaviate, Qdrant, Chroma, pgvector", "Chunking: recursive, semantic, agentic, sentence-window, LLM-based", "Hybrid search: dense + sparse + re-ranking (Cohere, BGE-Reranker)", "Evaluation: RAGAS, ARES, TruLens, LLM-as-judge"],
  },
  {
    title: "Fine-Tuning & MLOps",
    icon: SiPython, color: "text-green-500",
    items: ["LoRA, QLoRA, DoRA, Axolotl, Unsloth (2x training speed)", "Hugging Face: Transformers, PEFT, TRL, datasets, model hub", "MLflow, DVC, W&B — experiment tracking, data versioning", "ONNX, TensorRT, vLLM, TGI — model serving and optimization", "Quantization: GPTQ, AWQ, GGUF, bitsandbytes 4-bit, Flash Attn"],
  },
  {
    title: "Gen AI & Automation",
    icon: FiZap, color: "text-orange-500",
    items: ["Text-to-image: DALL-E 3, Stable Diffusion, Midjourney, Imagen, FLUX", "Text-to-speech: ElevenLabs, OpenAI TTS, Bark, Fish Speech", "Speech-to-text: Whisper, Deepgram, AssemblyAI, Azure STT", "AI automation: n8n, Zapier AI, Make, custom agent workflows, browser automation", "Video generation: Sora, Runway Gen-3, Pika, Kling, Haiper"],
  },
  {
    title: "Gen AI Design & HITL (Human-in-the-Loop)",
    icon: FiUsers, color: "text-rose-500",
    items: ["LLM app architecture: input → guardrails → context building → prompt → LLM → output validation → response", "HITL patterns: approval gates before destructive actions, escalation to human for edge cases", "Feedback loops: human feedback → preference tuning (RLHF, DPO) → improved model", "Evaluation-driven dev: unit tests for prompts, regression benchmark suite, LLM-as-judge", "Prompt management: version control, A/B testing, prompt templates, registry, monitoring"],
  },
];

const RagDiagram = () => (
  <Card title="RAG Pipeline Architecture" className="mb-6">
    <svg viewBox="0 0 860 240" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ragArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
        <filter id="ragShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>
      <rect x="20" y="80" width="100" height="70" rx="8" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="70" y="108" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">User Query</text>
      <text x="70" y="126" textAnchor="middle" fill="#666" fontSize="9">raw input</text>
      <line x1="120" y1="115" x2="160" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="165" y="80" width="110" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="220" y="105" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Query Processing</text>
      <text x="220" y="120" textAnchor="middle" fill="#92400e" fontSize="9">rewrite / expansion</text>
      <text x="220" y="135" textAnchor="middle" fill="#92400e" fontSize="9">intent classification</text>
      <line x1="275" y1="95" x2="315" y2="75" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <line x1="275" y1="135" x2="315" y2="155" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="320" y="40" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="370" y="68" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Dense Retrieval</text>
      <text x="370" y="83" textAnchor="middle" fill="#166534" fontSize="9">embedding + ANN</text>
      <text x="370" y="98" textAnchor="middle" fill="#166534" fontSize="9">top-k chunks</text>
      <rect x="320" y="120" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="370" y="148" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Sparse Retrieval</text>
      <text x="370" y="163" textAnchor="middle" fill="#166534" fontSize="9">BM25 / SPLADE</text>
      <text x="370" y="178" textAnchor="middle" fill="#166534" fontSize="9">keyword match</text>
      <line x1="420" y1="75" x2="460" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <line x1="420" y1="155" x2="460" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="465" y="80" width="90" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="510" y="105" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Fusion</text>
      <text x="510" y="120" textAnchor="middle" fill="#92400e" fontSize="9">RRF / re-rank</text>
      <text x="510" y="135" textAnchor="middle" fill="#92400e" fontSize="9">Cohere / BGE</text>
      <line x1="555" y1="115" x2="595" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="600" y="80" width="100" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="650" y="105" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">LLM Generation</text>
      <text x="650" y="120" textAnchor="middle" fill="#1e40af" fontSize="9">context + query</text>
      <text x="650" y="135" textAnchor="middle" fill="#1e40af" fontSize="9">→ answer</text>
      <line x1="700" y1="115" x2="740" y2="115" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#ragArrow)" />
      <rect x="745" y="80" width="90" height="70" rx="8" fill="white" stroke="#22c55e" strokeWidth="1.5" filter="url(#ragShadow)" />
      <text x="790" y="108" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Response</text>
      <text x="790" y="126" textAnchor="middle" fill="#666" fontSize="9">cited answer</text>
      <text x="10" y="30" fill="#999" fontSize="10">Pipeline: Query → Retrieve (Dense + Sparse) → Fuse → Generate → Respond</text>
    </svg>
  </Card>
);

const AgentDiagram = () => (
  <Card title="Agent Architecture with HITL" className="mb-6">
    <svg viewBox="0 0 860 300" className="w-full h-auto max-w-4xl mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="agtArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#eab308" /></marker>
        <filter id="agtShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" /></filter>
      </defs>
      <rect x="30" y="110" width="110" height="70" rx="10" fill="white" stroke="#3b82f6" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="85" y="140" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">User Input</text>
      <text x="85" y="157" textAnchor="middle" fill="#666" fontSize="9">query / task</text>
      <line x1="140" y1="145" x2="190" y2="145" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="195" y="20" width="130" height="80" rx="10" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="260" y="48" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Planner / Router</text>
      <text x="260" y="63" textAnchor="middle" fill="#92400e" fontSize="9">decompose task</text>
      <text x="260" y="78" textAnchor="middle" fill="#92400e" fontSize="9">select tools</text>
      <line x1="260" y1="100" x2="260" y2="145" stroke="#eab308" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="195" y="150" width="130" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="260" y="175" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">Memory</text>
      <text x="260" y="190" textAnchor="middle" fill="#92400e" fontSize="9">short/long/semantic</text>
      <line x1="325" y1="60" x2="385" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="325" y1="145" x2="385" y2="145" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="390" y="25" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="450" y="52" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Search</text>
      <text x="450" y="67" textAnchor="middle" fill="#166534" fontSize="9">web / DB / API</text>
      <line x1="390" y1="90" x2="390" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="390" y="135" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="450" y="162" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Code Exec</text>
      <text x="450" y="177" textAnchor="middle" fill="#166534" fontSize="9">Python / sandbox</text>
      <line x1="510" y1="60" x2="560" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="510" y1="170" x2="560" y2="170" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="565" y="25" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="625" y="52" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: File I/O</text>
      <text x="625" y="67" textAnchor="middle" fill="#166534" fontSize="9">read / write / parse</text>
      <line x1="565" y1="90" x2="565" y2="130" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="565" y="135" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="625" y="162" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Tool: Image Gen</text>
      <text x="625" y="177" textAnchor="middle" fill="#166534" fontSize="9">DALL-E / SD / Flux</text>
      <line x1="685" y1="60" x2="725" y2="60" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <line x1="685" y1="170" x2="725" y2="170" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#agtArrow)" />
      <rect x="730" y="85" width="100" height="80" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" filter="url(#agtShadow)" />
      <text x="780" y="115" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">HITL Gate</text>
      <text x="780" y="130" textAnchor="middle" fill="#991b1b" fontSize="9">approval</text>
      <text x="780" y="145" textAnchor="middle" fill="#991b1b" fontSize="9">required</text>
      <line x1="780" y1="85" x2="780" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="730" y="10" width="100" height="35" rx="6" fill="white" stroke="#dc2626" strokeWidth="1" />
      <text x="780" y="32" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">Human Review</text>
      <path d="M780,165 L780,200 L85,200 L85,180" stroke="#eab308" strokeWidth="1" fill="none" markerEnd="url(#agtArrow)" strokeDasharray="4,3" />
      <text x="430" y="215" textAnchor="middle" fill="#999" fontSize="9">loop back to planner for next step</text>
      <text x="10" y="280" fill="#999" fontSize="10">Agent Loop: Input → Plan → Execute Tools → HITL Gate → Result → Loop</text>
    </svg>
  </Card>
);

const hitlPatterns = [
  { name: "Approval Gate", desc: "Agent pauses before destructive actions (delete, write, pay) and waits for human confirmation. Critical for production safety." },
  { name: "Escalation", desc: "When agent confidence is low or input is ambiguous, escalate to human. Agent provides context and suggested actions." },
  { name: "Human-in-the-Loop Training", desc: "Human provides feedback on model outputs → preference pairs → RLHF/DPO fine-tuning → improved behavior." },
  { name: "Human-on-the-Loop", desc: "Human monitors autonomously running agents with ability to intervene. Agent runs unless human stops it." },
  { name: "Feedback Loop", desc: "Post-execution human feedback (thumbs up/down, rating, correction) stored and used for continuous improvement." },
  { name: "Handoff Protocol", desc: "Structured handoff between agent and human: context summary, options, recommendation, human decision, continuation." },
];

const genAiDesignTopics = [
  {
    title: "LLM Application Architecture", color: "text-blue-500",
    items: ["Input processing: guardrails, PII redaction, input validation, safety classification", "Context building: retrieve, summarize, chunk, filter, rank for prompt window", "Prompt assembly: system prompt, examples, context, query, output format", "LLM call: model selection, temperature, max tokens, tools, streaming", "Output validation: JSON parse, schema check, content safety, citation check", "Response delivery: stream, cache, log, monitor latency, cost tracking"],
  },
  {
    title: "Prompt Engineering Patterns", color: "text-yellow-500",
    items: ["Chain-of-thought: step-by-step reasoning with intermediate outputs", "Few-shot: examples in context with format specification and edge cases", "Structured output: JSON mode, function calling, Pydantic/TypedDict validation", "System prompts: persona, constraints, rules, safety guardrails, formatting", "Meta-prompting: LLM generates and refines its own prompts", "Automated prompt optimization: DSPy, PromptPerfect, OPRO"],
  },
  {
    title: "Evaluation & Monitoring", color: "text-green-500",
    items: ["Offline eval: BLEU, ROUGE, METEOR, BERTScore, Perplexity, RAGAS", "Online eval: A/B testing, shadow mode, canary deploy, user feedback", "LLM-as-judge: GPT-4/Claude evaluates outputs — criteria, rubrics, calibration", "Monitoring: LangSmith, Weights & Biases, Helicone, LangFuse, Arize", "Regression testing: benchmark datasets, automated eval suite, CI integration", "Cost & latency: token tracking, model switching, caching, batching"],
  },
  {
    title: "Safety & Guardrails", color: "text-red-500",
    items: ["Input guardrails: topic restriction, jailbreak detection, prompt injection protection", "Output guardrails: content filter, factuality check, citation requirement", "NeMo Guardrails: colang, rails, actions, user/massage flow configuration", "Guardrails AI: validators, reasks, fix logic, on_fail behaviors", "Content moderation: OpenAI Moderation, Azure Content Safety, custom classifiers", "Red teaming: automated adversarial testing, boundary probing, continuous eval"],
  },
];

const AiSection = () => (
  <Section title="AI Engineering & Agents" desc="LLMs, 10 RAG architectures, agents, fine-tuning, MLOps, Gen AI design, HITL, safety — complete 2026 curriculum.">
    <PrerequisitesBanner />

    <h4 className="text-xl font-bold mb-3 text-yellow-700 dark:text-yellow-400">10 RAG Architectures</h4>
    <div className="grid sm:grid-cols-2 gap-3 mb-6">
      {ragArchitectures.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-yellow-400">
          <h5 className="font-bold text-base text-yellow-700 dark:text-yellow-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>

    <RagDiagram />

    <h4 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-400">Core AI Topics</h4>
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      {aiTopics.map(({ title, icon: Icon, color, items }) => (
        <Card key={title}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={20} className={color} />
            <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
          </div>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiArrowRight size={14} className={`${color} shrink-0 mt-1`} />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <AgentDiagram />

    <h4 className="text-xl font-bold mb-3 text-rose-700 dark:text-rose-400">Gen AI Design & HITL Patterns</h4>
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      {genAiDesignTopics.map(({ title, color, items }) => (
        <Card key={title}>
          <h4 className={`font-bold text-lg mb-2 ${color}`}>{title}</h4>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <h4 className="text-lg font-bold mb-3 text-red-700 dark:text-red-400">Human-in-the-Loop Patterns</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {hitlPatterns.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-red-400">
          <h5 className="font-bold text-base text-red-700 dark:text-red-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>

    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://platform.openai.com/docs/" label="OpenAI API" desc="GPT-4o, embeddings, assistants, vision" />
      <ExternalLink href="https://docs.anthropic.com/" label="Claude API" desc="Tool use, computer use, prompt caching" />
      <ExternalLink href="https://js.langchain.com/docs/" label="LangChain.js" desc="Chains, agents, retrievers, RAG" />
      <ExternalLink href="https://python.langchain.com/docs/langgraph" label="LangGraph" desc="Stateful agent graphs, HITL" />
      <ExternalLink href="https://huggingface.co/docs" label="Hugging Face" desc="Transformers, PEFT, TRL, datasets" />
      <ExternalLink href="https://python.langchain.com/docs/integrations/vectorstores/" label="Vector DBs" desc="Pinecone, Weaviate, Qdrant, Chroma" />
      <ExternalLink href="https://pytorch.org/docs/" label="PyTorch" desc="Tensors, autograd, distributed train" />
      <ExternalLink href="https://www.tensorflow.org/" label="TensorFlow" desc="Keras, TF Serving, TFLite, JAX" />
      <ExternalLink href="https://github.com/NVIDIA/NeMo-Guardrails" label="NeMo Guardrails" desc="Colang, rails, safety guardrails" />
      <ExternalLink href="https://www.guardrailsai.com/docs" label="Guardrails AI" desc="Validators, reasks, structured output" />
      <ExternalLink href="https://docs.smith.langchain.com/" label="LangSmith" desc="Tracing, eval, datasets, monitoring" />
      <ExternalLink href="https://www.arize.com/" label="Arize AI" desc="LLM monitoring, embeddings, drift" />
    </div>
  </Section>
);

// ─── 4. SYSTEM DESIGN ───────────────────────────────────────

const sdlc = [
  { phase: "1. Requirements", activities: "User stories, acceptance criteria, technical specs, PRD", artifacts: "PRD document, Figma mocks, API contracts" },
  { phase: "2. Design", activities: "Architecture, data model, API design, tech stack, ERD", artifacts: "System design doc, C4 diagrams, OpenAPI spec" },
  { phase: "3. Development", activities: "Sprint planning, coding, code review, pair programming", artifacts: "PRs, commit history, test reports" },
  { phase: "4. Testing", activities: "Unit, integration, e2e, load, security, accessibility", artifacts: "Test plan, coverage report, QA sign-off" },
  { phase: "5. Deployment", activities: "CI/CD, canary, blue-green, feature flags, rollback", artifacts: "Deploy checklist, runbook, monitoring dashboards" },
  { phase: "6. Monitoring", activities: "Logs, metrics, traces, alerts, on-call, postmortem", artifacts: "Sentry, Grafana, Datadog, PagerDuty config" },
  { phase: "7. Maintenance", activities: "Bug fixes, performance tuning, dep updates, refactoring", artifacts: "CHANGELOG, migration plans, deprecation notices" },
];

const designPatterns = [
  { name: "Singleton", desc: "One instance per application. Use: DB connection pool, logger, config loader. Avoid: global state coupling." },
  { name: "Factory", desc: "Create objects without specifying exact class. Use: DB driver selection, payment gateway factory." },
  { name: "Decorator", desc: "Wrap behavior dynamically. Use: middleware, logging, caching, rate limit wrappers." },
  { name: "Observer", desc: "One-to-many dependency notification. Use: event emitters, pub/sub, WebSocket broadcasts." },
  { name: "Strategy", desc: "Swap algorithms at runtime. Use: pricing, shipping, auth provider strategies." },
  { name: "Adapter", desc: "Convert interface to expected contract. Use: third-party SDK wrappers, legacy system integration." },
  { name: "Repository", desc: "Abstract data layer behind collection-like interface. Use: Prisma/TypeORM repos, clean architecture." },
  { name: "Dependency Injection", desc: "Provide dependencies from outside. Use: FastAPI Depends, NestJS DI, manual DI containers." },
];

const architectureStyles = [
  {
    name: "Monolithic", icon: FiBox, color: "text-blue-500", border: "border-blue-500",
    desc: "Single deployable unit. Best for MVPs, small teams, tight latency requirements.",
    pros: ["Simple deploy/test/debug", "Low latency (in-process)", "No network overhead"],
    cons: ["Scales vertically only", "Tight coupling", "Long CI/CD pipelines"],
  },
  {
    name: "Microservices", icon: FiGrid, color: "text-green-500", border: "border-green-500",
    desc: "Independent services per domain. Best for 15+ engineer teams, high scale.",
    pros: ["Independent scaling", "Isolated failures", "Polyglot stacks"],
    cons: ["Distributed complexity", "Network latency", "Data consistency"],
  },
  {
    name: "Event-Driven", icon: FiZap, color: "text-purple-500", border: "border-purple-500",
    desc: "Async communication via event bus. Best for real-time, audit logs, CQRS.",
    pros: ["Loose coupling", "Audit trail", "Replay capability"],
    cons: ["Event schema evolution", "Debugging difficulty", "Eventual consistency"],
  },
];

const coreProblems = [
  { problem: "Race Condition", explanation: "Two operations access shared data simultaneously; outcome depends on timing.", solution: "Locks (mutex), atomic ops, transaction isolation, Redis WATCH, distributed locks (Redlock)" },
  { problem: "Memory Leak", explanation: "Objects no longer needed remain referenced; memory grows until OOM.", solution: "Weak references, proper cleanup, heap snapshots, Chrome DevTools Memory tab, monitor with --inspect" },
  { problem: "Deadlock", explanation: "Two or more processes wait on each other's locks; none can proceed.", solution: "Lock ordering, timeout on locks, deadlock detection, try_lock patterns, avoid nested locks" },
  { problem: "N+1 Query", explanation: "One query for parent, N queries for each child. Common in ORMs.", solution: "Eager loading (JOIN, populate, include), batching, GraphQL dataloader, query logging detection" },
  { problem: "Cache Validation", explanation: "Stale data served from cache after source updates.", solution: "TTL, write-through, write-behind, cache invalidation on write, Redis keyspace notifications" },
  { problem: "Timezone Bug", explanation: "Dates stored/displayed in wrong timezone; off-by-hour errors.", solution: "Store UTC always, convert at display, use libraries (date-fns-tz, Luxon), no manual offset math" },
  { problem: "Floating Point Error", explanation: "0.1 + 0.2 !== 0.3 due to IEEE 754 binary representation.", solution: "Use integers (cents), Decimal.js, PostgreSQL NUMERIC, avoid float for money" },
  { problem: "Retry Storm", explanation: "Cascading retries overwhelm already-stressed system.", solution: "Exponential backoff + jitter, circuit breaker, max retries limit, rate limit retry queues" },
];

const SystemDesign = () => (
  <Section title="System Design, SDLC & Architecture" desc="Full coverage: architecture patterns, SDLC phases, design patterns, and core engineering problems.">
    <PrerequisitesBanner />

    <h4 className="text-xl font-bold mb-3 text-rose-700 dark:text-rose-400">Architecture Styles</h4>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {architectureStyles.map(({ name, icon: Icon, color, border, desc, pros, cons }) => (
        <Card key={name} className={`border-l-4 ${border}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className={color} />
            <h4 className={`font-bold text-lg ${color}`}>{name}</h4>
          </div>
          {sub(desc, "mb-3")}
          <div className="mb-3">
            <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">Pros</p>
            {pros.map((p, i) => <p key={i} className="flex items-start gap-1.5 text-sm text-gray-800 dark:text-gray-200 font-medium ml-1">+ {p}</p>)}
          </div>
          <div>
            <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">Cons</p>
            {cons.map((c, i) => <p key={i} className="flex items-start gap-1.5 text-sm text-gray-800 dark:text-gray-200 font-medium ml-1">− {c}</p>)}
          </div>
        </Card>
      ))}
    </div>

    <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">SDLC — Software Development Life Cycle</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {sdlc.map(({ phase, activities, artifacts }) => (
        <Card key={phase} className="border-l-4 border-blue-400">
          <h5 className="font-bold text-base text-blue-700 dark:text-blue-400">{phase}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">{activities}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{artifacts}</p>
        </Card>
      ))}
    </div>

    <h4 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">Design Patterns</h4>
    <div className="grid sm:grid-cols-2 gap-3 mb-8">
      {designPatterns.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-green-400">
          <h5 className="font-bold text-base text-green-700 dark:text-green-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>

    <h4 className="text-xl font-bold mb-3 text-red-700 dark:text-red-400">Common Production Problems</h4>
    <div className="space-y-3">
      {coreProblems.map(({ problem, explanation, solution }) => (
        <Card key={problem} className="border-l-4 border-red-400">
          <h5 className="font-bold text-base text-red-700 dark:text-red-400 flex items-center gap-2">
            <FiAlertTriangle size={16} /> {problem}
          </h5>
          {sub(explanation, "mb-2")}
          <p className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
            <span className="text-green-600 dark:text-green-400 font-bold">Fix:</span> {solution}
          </p>
        </Card>
      ))}
    </div>
  </Section>
);

// ─── 5. API DESIGN ──────────────────────────────────────────

const apiTopics = [
  {
    title: "RESTful APIs", icon: FiGlobe, color: "text-blue-500",
    items: [
      "HTTP methods: GET, POST, PUT, PATCH, DELETE — semantics and idempotency",
      "Status codes: 200, 201, 204, 301, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503",
      "Request/Response: headers, body, query params, path params, content negotiation",
      "Pagination: cursor-based vs offset, page/limit, sort, filter, total count",
      "API versioning: URL path, header, query param — strategies and trade-offs",
      "Error handling: consistent error shape, error codes, validation details",
      "Rate limiting (throttling): per user/IP/plan, sliding window, token bucket, headers",
      "OpenAPI/Swagger: spec-first design, auto-generated docs, client SDK generation",
    ],
  },
  {
    title: "gRPC & tRPC", icon: SiFastapi, color: "text-green-500",
    items: [
      "gRPC: Protocol Buffers, service definition, unary/server/client streaming",
      "gRPC: bidirectional streaming, deadlines, cancellations, interceptors",
      "tRPC: end-to-end type safety, procedures, routers, middleware",
      "tRPC: subscriptions, server-side caching, error formatting, code generation",
      "Compare: REST vs gRPC vs tRPC — when to use each",
    ],
  },
  {
    title: "Real-Time Communication", icon: FiZap, color: "text-purple-500",
    items: [
      "WebSocket: full-duplex, handshake, frames, ping/pong, rooms, adapter scaling",
      "SSE (Server-Sent Events): one-way, auto-reconnect, event IDs, text/event-stream",
      "WebRTC: peer-to-peer, STUN/TURN, SDP, ICE candidates, data channels",
      "Webhooks: event callbacks, retry policies, idempotency keys, signature verification",
      "HLS (HTTP Live Streaming): segmenting, M3U8 playlists, adaptive bitrate, low-latency",
      "Compare: WebSocket vs SSE vs polling vs Webhook — latency, direction, use cases",
    ],
  },
];

const ApiDesign = () => (
  <Section title="API Design & Communication" desc="REST, gRPC, tRPC, WebSockets, SSE, Webhooks, WebRTC, HLS — all protocols with 2026 best practices.">
    <PrerequisitesBanner />
    {apiTopics.map(({ title, icon: Icon, color, items }) => (
      <Card key={title} className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={20} className={color} />
          <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
              <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    ))}
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" label="HTTP Status Codes" desc="Complete reference with semantics" />
      <ExternalLink href="https://grpc.io/docs/" label="gRPC Docs" desc="Protocol buffers, streaming, auth" />
      <ExternalLink href="https://trpc.io/docs" label="tRPC Docs" desc="End-to-end typesafe APIs" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" label="WebSocket API" desc="MDN WebSocket reference" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" label="SSE Docs" desc="Server-Sent Events guide" />
      <ExternalLink href="https://webrtc.org/" label="WebRTC" desc="Peer-to-peer communication" />
      <ExternalLink href="https://swagger.io/specification/" label="OpenAPI Spec" desc="API specification standard" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" label="HTTP Methods" desc="Semantics and idempotency" />
    </div>
  </Section>
);

// ─── 6. SECURITY ────────────────────────────────────────────

const securityTopics = [
  {
    title: "Authentication & Authorization",
    icon: FiShield, color: "text-red-500",
    items: [
      "JWT: access (15m) + refresh (7d), rotation, reuse detection, SHA-256 hash in Redis",
      "OAuth 2.0: authorization code, PKCE, implicit, client credentials — flows explained",
      "OAuth: scopes, consent, token exchange, refresh tokens, introspection",
      "Session vs token-based auth: trade-offs, httpOnly cookies, localStorage, XSS risks",
      "2FA/MFA: TOTP, SMS, authenticator apps, backup codes, recovery flow",
      "Passwordless: magic links, OTP email/SMS, WebAuthn, passkeys",
      "RBAC vs ABAC: role-based vs attribute-based access control, policy engine",
      "API keys: generation, rotation, scoping, rate limiting per key, audit logging",
    ],
  },
  {
    title: "Security Best Practices",
    icon: FiShield, color: "text-yellow-500",
    items: [
      "XSS: React auto-escape, CSP headers, httpOnly cookies, escapeHtml helper",
      "CSRF: sameSite strict, CORS whitelist, anti-CSRF tokens for non-SPA forms",
      "NoSQL Injection: Zod safeParse strips operators, validate before querying",
      "SQL Injection: parameterized queries, ORM safety, raw query caution",
      "Helmet: security headers — CSP, HSTS, X-Frame-Options, X-Content-Type-Options",
      "Rate limiting: Redis INCR/EXPIRE, per-IP, per-email, per-API-key, 60s window",
      "HTTPS: TLS 1.3, HSTS, cert management, mTLS for service-to-service",
      "Secrets management: env vars, Vault, AWS Secrets Manager, never hardcode",
    ],
  },
];

const Security = () => (
  <Section title="Security" desc="JWT, OAuth, RBAC, encryption, rate limiting, and every OWASP top-10 mitigation with 2026 practices.">
    <PrerequisitesBanner />
    {securityTopics.map(({ title, icon: Icon, color, items }) => (
      <Card key={title} className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={20} className={color} />
          <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
              <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    ))}
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://owasp.org/www-project-top-ten/" label="OWASP Top 10" desc="2021 vulnerability categories" />
      <ExternalLink href="https://auth0.com/docs/secure/tokens/refresh-tokens" label="Auth0: Refresh Tokens" desc="Rotation and reuse detection" />
      <ExternalLink href="https://oauth.net/2/" label="OAuth 2.0" desc="Authorization framework spec" />
      <ExternalLink href="https://www.rfc-editor.org/rfc/rfc9700" label="RFC 9700: OAuth BCP" desc="Token replay, refresh protection" />
    </div>
  </Section>
);

// ─── 7. DEVOPS & CLOUD ──────────────────────────────────────

const devopsTopics = [
  {
    title: "Docker & Containers", icon: SiDocker, color: "#2496ed",
    items: [
      "Dockerfile: multi-stage builds, layer caching, COPY vs ADD, CMD vs ENTRYPOINT",
      "docker-compose: services, networks, volumes, health checks, profiles",
      "Container networking: bridge, host, overlay, expose vs ports, DNS resolution",
      "Volumes: named, bind mounts, tmpfs, drivers, backup/restore strategies",
      "Docker Hub, ECR, GCR, GitHub Container Registry — push, pull, tags, digests",
      "Docker security: least privilege, no root, read-only rootfs, secrets, scanning",
    ],
  },
  {
    title: "CI/CD & Deployment", icon: FiServer, color: "text-blue-500",
    items: [
      "GitHub Actions: workflows, matrix builds, caching, environments, artifacts",
      "Vercel: Previews, Edge Functions, ISR, analytics, environment variables",
      "Render: Web Services, cron jobs, PostgreSQL, Redis, auto-deploy",
      "Blue-green deploy: two identical environments, switch traffic, instant rollback",
      "Canary deploy: percentage-based traffic shifting, metrics comparison, auto-rollback",
      "Feature flags: LaunchDarkly, Unleashed, split.io — gradual rollout, A/B testing",
    ],
  },
  {
    title: "Cloud Platforms (SaaS/PaaS/IaaS)", icon: FiCloud, color: "text-orange-500",
    items: [
      "AWS: EC2, S3, Lambda, RDS, ECS, CloudFront, Route53, IAM, VPC",
      "GCP: Cloud Run, GKE, Cloud Storage, Firestore, Pub/Sub, Vertex AI",
      "SaaS (Software as a Service): apps delivered via browser — multi-tenant DB, metering",
      "PaaS (Platform as a Service): Heroku, Vercel, Render, Railway — deploy code, no infra",
      "IaaS (Infrastructure as a Service): AWS EC2, GCP Compute — full control, full ops",
      "Serverless: Lambda, Cloud Functions, Vercel Edge — scale to zero, pay per request",
    ],
  },
  {
    title: "Monitoring & Observability", icon: FiTool, color: "text-purple-500",
    items: [
      "Logging: Winston, Pino, structured JSON logs, ELK stack, Loki, log levels",
      "Metrics: Prometheus, Grafana, Datadog, New Relic — RED metrics, USE method",
      "Tracing: OpenTelemetry, Jaeger, Zipkin — distributed trace, span context, sampling",
      "Alerting: PagerDuty, OpsGenie, Slack alerts — severity, escalation, runbooks",
      "APM: Sentry, Datadog APM, New Relic — error tracking, performance monitoring",
      "Health checks: /health, /ready, /live — Kubernetes probes, load balancer checks",
    ],
  },
];

const DevOps = () => (
  <Section title="DevOps & Cloud" desc="Docker, CI/CD, AWS, GCP, Vercel, monitoring, SaaS/PaaS/IaaS — deployment and operations with 2026 standards.">
    <PrerequisitesBanner />
    {devopsTopics.map(({ title, icon: Icon, color, items }) => (
      <Card key={title} className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={22} style={typeof color === "string" && color.startsWith("#") ? { color } : undefined} className={typeof color === "string" && !color.startsWith("#") ? color : undefined} />
          <h4 className="font-bold text-lg text-yellow-700 dark:text-yellow-400">{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
              <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    ))}
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://docs.docker.com/" label="Docker Docs" desc="Compose, Dockerfile, networking" />
      <ExternalLink href="https://docs.github.com/en/actions" label="GitHub Actions" desc="Workflows, matrix, deployment" />
      <ExternalLink href="https://aws.amazon.com/getting-started/" label="AWS Getting Started" desc="Core services explained" />
      <ExternalLink href="https://cloud.google.com/docs" label="Google Cloud Docs" desc="Cloud Run, GKE, Vertex AI" />
      <ExternalLink href="https://vercel.com/docs" label="Vercel Docs" desc="Next.js deploy, Edge Functions" />
      <ExternalLink href="https://opentelemetry.io/docs/" label="OpenTelemetry" desc="Traces, metrics, logs" />
    </div>
  </Section>
);

// ─── 8. BEST PRACTICES ──────────────────────────────────────

const bestPracticeTopics = [
  {
    title: "Testing (TDD & Beyond)", icon: FiCheckCircle, color: "text-green-500",
    items: [
      "Unit tests: Vitest, Jest, pytest — isolate functions, mock dependencies",
      "Integration tests: Supertest, TestContainers — test real DB, Redis, API",
      "E2E tests: Playwright, Cypress, Selenium — user flows, visual regression",
      "TDD cycle: red → green → refactor. Write test first, then code, then improve",
      "Coverage: Istanbul, pytest-cov — aim for 80%+, focus on critical paths",
      "Mocking: MSW (API), Vitest mocks, unittest.mock — mock boundaries, not internals",
      "Fixtures: factories, fakes, seed data — reproducibility across test runs",
      "Load testing: k6, Artillery, Locust — concurrent users, ramp-up, thresholds",
    ],
  },
  {
    title: "Idempotency & Error Handling", icon: FiAlertTriangle, color: "text-yellow-500",
    items: [
      "Idempotency: same request multiple times = same result. Idempotency keys in headers",
      "Error handling: consistent JSON error shape, error codes, status codes, stack in dev",
      "Retry: exponential backoff + jitter, max retries, circuit breaker pattern",
      "Graceful degradation: fallbacks, stale cache, feature degradation, error UX",
      "Validation: Zod/Joi/Yup — validate at boundaries, strip unexpected fields",
      "Logging errors: structured logs, error IDs, correlation IDs, context enrichment",
    ],
  },
  {
    title: "Performance & Optimization", icon: FiZap, color: "text-purple-500",
    items: [
      "Caching: Redis, CDN, browser cache, HTTP caching headers (Cache-Control, ETag)",
      "Database: indexing, query optimization, connection pooling, read replicas",
      "Memory: garbage collection tuning, memory pools, streaming vs buffering",
      "CPU: worker threads, clustering, offloading to queues, serverless scaling",
      "Network: keep-alive, compression (gzip, brotli), HTTP/2, CDN, edge compute",
      "Frontend: code splitting, lazy loading, bundle analysis, image optimization",
    ],
  },
];

const bestPractices = [
  { name: "SOLID Principles", desc: "S: Single Responsibility, O: Open-Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion" },
  { name: "DRY (Don't Repeat Yourself)", desc: "Extract shared logic into utilities, hooks, middlewares, and services. Avoid copy-paste." },
  { name: "KISS (Keep It Simple, Stupid)", desc: "Simple solutions over clever ones. Readability > brevity. Avoid premature abstraction." },
  { name: "YAGNI (You Aren't Gonna Need It)", desc: "Don't build features until needed. Speculative code = maintenance cost with zero value." },
  { name: "Clean Architecture", desc: "Layers: entities → use cases → interface adapters → frameworks. Dependencies point inward." },
  { name: "12-Factor App", desc: "Codebase, dependencies, config, backing services, build/release/run, processes, port binding, concurrency, disposability, dev/prod parity, logs, admin processes." },
];

const BestPractices = () => (
  <Section title="Best Practices" desc="TDD, idempotency, SOLID, 12-factor, error handling, performance — production-grade patterns for 2026.">
    <PrerequisitesBanner />
    {bestPracticeTopics.map(({ title, icon: Icon, color, items }) => (
      <Card key={title} className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={20} className={color} />
          <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
              <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    ))}

    <h4 className="text-xl font-bold mb-3 mt-8 text-green-700 dark:text-green-400">Engineering Principles</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {bestPractices.map(({ name, desc }) => (
        <Card key={name} className="border-l-4 border-green-400">
          <h5 className="font-bold text-base text-green-700 dark:text-green-400">{name}</h5>
          {sub(desc)}
        </Card>
      ))}
    </div>
  </Section>
);

// ─── 9. CAREER SKILLS ───────────────────────────────────────

const skillCategories = [
  { name: "AI & Machine Learning", items: ["Deep Learning (PyTorch, TF)", "LLM Engineering (RAG, agents)", "Computer Vision, NLP, Speech", "MLOps, model serving, monitoring"], color: "text-purple-500" },
  { name: "DevOps & Infrastructure", items: ["Docker, K8s, Terraform", "CI/CD, GitOps, ArgoCD", "Cloud (AWS, GCP, Azure)", "Observability (OTel, Grafana)"], color: "text-blue-500" },
  { name: "Full-Stack Development", items: ["React, Next.js, TypeScript", "Node, FastAPI, GraphQL", "SQL, NoSQL, Prisma, Drizzle", "System design, architecture"], color: "text-green-500" },
  { name: "UI/UX & Design", items: ["Figma, design systems, prototyping", "Accessibility (WCAG 2.2)", "Responsive, mobile-first design", "User research, A/B testing"], color: "text-pink-500" },
  { name: "Cybersecurity", items: ["OWASP Top 10, penetration testing", "Zero Trust architecture", "Security audits, compliance (SOC2)", "IAM, OAuth, WebAuthn, FIDO2"], color: "text-red-500" },
  { name: "Cloud Computing", items: ["AWS Solutions Architect", "GCP Professional Cloud Arch", "Serverless, container orchestration", "Cost optimization, FinOps"], color: "text-orange-500" },
  { name: "Project & Product", items: ["Agile, Scrum, Kanban, SAFE", "PRD writing, stakeholder mgmt", "Roadmapping, OKRs, KPIs", "Data-driven decision making"], color: "text-yellow-500" },
  { name: "IoT, AR, Mobile", items: ["React Native, Flutter, Swift/Kotlin", "WebRTC, HLS, real-time streaming", "IoT: MQTT, edge computing", "AR: Unity, ARKit, WebXR, 8thWall"], color: "text-teal-500" },
];

const CareerSkills = () => (
  <Section title="Top Skills in Demand (2026)" desc="AI/ML, DevOps, full-stack, UI/UX, cybersecurity, cloud, product, IoT, AR, mobile — comprehensive career roadmap.">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {skillCategories.map(({ name, items, color }) => (
        <Card key={name}>
          <h4 className={`font-bold text-lg mb-2 ${color}`}>{name}</h4>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
                <FiArrowRight size={14} className={`${color} shrink-0 mt-1`} />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://roadmap.sh/" label="roadmap.sh" desc="Role-based developer roadmaps" />
      <ExternalLink href="https://github.com/kamranahmedse/developer-roadmap" label="Developer Roadmap" desc="Full-stack, AI, DevOps paths" />
      <ExternalLink href="https://www.coursera.org/" label="Coursera" desc="Specializations from top universities" />
      <ExternalLink href="https://www.deeplearning.ai/" label="DeepLearning.AI" desc="AI/ML courses by Andrew Ng" />
    </div>
  </Section>
);

// ─── TABS ───────────────────────────────────────────────────

const tabs = [
  { id: "roadmap", label: "Roadmap", icon: FiBookOpen },
  { id: "fullstack", label: "Full-Stack", icon: FiServer },
  { id: "ai", label: "AI & Agents", icon: FiCpu },
  { id: "design", label: "System Design", icon: FiLayers },
  { id: "api", label: "API Design", icon: FiGlobe },
  { id: "security", label: "Security", icon: FiShield },
  { id: "devops", label: "DevOps", icon: FiCloud },
  { id: "practices", label: "Best Practices", icon: FiCheckCircle },
  { id: "skills", label: "Career Skills", icon: FiUsers },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("roadmap");
  const components = {
    roadmap: Roadmap, fullstack: FullStack, ai: AiSection,
    design: SystemDesign, api: ApiDesign, security: Security,
    devops: DevOps, practices: BestPractices, skills: CareerSkills,
  };
  const ActiveComponent = components[activeTab];

  return (
    <div className="px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <FiBookOpen className="text-yellow-500" size={36} />
          <h1 className="text-4xl font-extrabold">DevAIStack — Full Engineering Curriculum</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-8">
          Complete 2026 learning platform: full-stack, AI, system design, API design, security, DevOps, best practices, and career skills. Everything from beginner to advanced, nothing hidden.
        </p>

        <div className="flex flex-wrap gap-1 mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-t text-sm font-semibold transition-colors ${
                activeTab === id
                  ? "text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-500 -mb-[3px]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="animate-fade-up"><ActiveComponent /></div>

        <div className="mt-12 text-center text-base text-gray-500 dark:text-gray-400 font-medium border-t border-gray-200 dark:border-gray-700 pt-8">
          DevAIStack — open-source engineering education platform. Built with production-grade MERN auth.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
