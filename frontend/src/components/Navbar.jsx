import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiSettings, FiBookOpen } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuth, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    ...(isAuth
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/auth-guide", label: "Guide" },
          { to: "/about-me", label: "Me" },
          ...(user?.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg md:text-xl"
          >
            <span className="text-yellow-500 font-mono font-extrabold text-lg leading-none">&lt;/&gt;</span>
            DevAIStack
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm md:text-base font-medium md:font-semibold transition-colors ${
                  pathname === l.to
                    ? "text-yellow-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {isAuth && (
              <>
                <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "text-yellow-500 bg-yellow-500/10"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {isAuth && (
              <>
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {user?.name}
                </div>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full px-3 py-2 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
