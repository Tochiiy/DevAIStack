import { useState } from "react";
import { FiBookOpen, FiServer, FiCpu, FiLayers, FiGlobe, FiShield, FiCloud, FiCheckCircle, FiUsers } from "react-icons/fi";
import Roadmap from "./dashboard/Roadmap";
import FullStack from "./dashboard/FullStack";
import AiSection from "./dashboard/AiSection";
import SystemDesign from "./dashboard/SystemDesign";
import ApiDesign from "./dashboard/ApiDesign";
import Security from "./dashboard/Security";
import DevOps from "./dashboard/DevOps";
import BestPractices from "./dashboard/BestPractices";
import CareerSkills from "./dashboard/CareerSkills";

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
          Complete 2026 learning platform: full-stack, AI, system design, API design, security, DevOps, best practices, and career skills.
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
