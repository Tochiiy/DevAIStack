import { FiGithub, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} DevAIStack. All rights reserved.</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a
            href="https://github.com/Tochiiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 hover:underline font-medium"
          >
            <FiGithub size={16} /> Tochiiy
          </a>
          <a
            href="mailto:tochukwusun24@gmail.com"
            className="inline-flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 hover:underline font-medium"
          >
            <FiMail size={16} /> tochukwusun24@gmail.com
          </a>
        </div>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1 text-sm font-mono font-bold text-yellow-500 animate-pulse">
            <span className="inline-block w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-black text-xs font-bold">&lt;/&gt;</span>
            dev
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
