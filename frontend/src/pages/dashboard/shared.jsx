import { FiBookOpen, FiArrowRight } from "react-icons/fi";

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

export { Section, Card, sub, ExternalLink, PrerequisitesBanner };
