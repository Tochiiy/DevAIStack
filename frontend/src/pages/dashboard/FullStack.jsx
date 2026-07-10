import { FiCheckCircle } from "react-icons/fi";
import { SiNodedotjs, SiFastapi, SiReact, SiPostgresql } from "react-icons/si";
import { Section, Card, ExternalLink, PrerequisitesBanner } from "./shared";

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

export default FullStack;
