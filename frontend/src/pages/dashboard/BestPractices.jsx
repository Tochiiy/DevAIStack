import { FiCheckCircle, FiAlertTriangle, FiZap } from "react-icons/fi";
import { Section, Card, PrerequisitesBanner } from "./shared";

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
          <p className="text-base text-gray-600 dark:text-gray-300 font-medium">{desc}</p>
        </Card>
      ))}
    </div>
  </Section>
);

export default BestPractices;
