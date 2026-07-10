import { FiArrowRight } from "react-icons/fi";
import { Section, Card, ExternalLink } from "./shared";

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

export default CareerSkills;
