import { FiBookOpen, FiLayers, FiZap } from "react-icons/fi";
import { Section, Card, PrerequisitesBanner } from "./shared";

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

export default Roadmap;
