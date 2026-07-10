import { FiServer, FiCloud, FiTool, FiCheckCircle } from "react-icons/fi";
import { SiDocker } from "react-icons/si";
import { Section, Card, ExternalLink, PrerequisitesBanner } from "./shared";

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

export default DevOps;
