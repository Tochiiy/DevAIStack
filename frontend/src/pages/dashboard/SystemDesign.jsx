import { FiBox, FiGrid, FiZap, FiAlertTriangle } from "react-icons/fi";
import { Section, Card, PrerequisitesBanner } from "./shared";

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

const sub = (text, className = "") => <p className={`text-base text-gray-600 dark:text-gray-300 font-medium ${className}`}>{text}</p>;

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

export default SystemDesign;
