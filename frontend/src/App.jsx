import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Logout = lazy(() => import("./pages/Logout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AuthGuide = lazy(() => import("./pages/AuthGuide"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// ─── ROUTE GUARDS ───────────────────────────────────────────
// GuestRoute  — redirects authenticated users away (login/register)
// ProtectedRoute — redirects unauthenticated users to login
// AdminRoute  — redirects non-admin users to dashboard
function GuestRoute({ children }) {
  const { isAuth, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center py-20"><FiLoader className="animate-spin text-yellow-500" size={40} /></div>;
  return isAuth ? <Navigate to="/dashboard" replace /> : children;
}

function ProtectedRoute({ children }) {
  const { isAuth, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center py-20"><FiLoader className="animate-spin text-yellow-500" size={40} /></div>;
  return isAuth ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { isAuth, user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center py-20"><FiLoader className="animate-spin text-yellow-500" size={40} /></div>;
  if (!isAuth) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

const bg =
  "https://assets.bytebytego.com/diagrams/0199-full-stack-developer-roadmap.png";

function AppContent() {
  const { theme } = useTheme();
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <img
        src={bg}
        alt=""
        onError={(e) => (e.target.style.display = "none")}
        className="fixed inset-0 w-full h-full object-cover object-center opacity-[0.15] dark:opacity-[0.08] pointer-events-none select-none"
      />
      <div className="relative z-0 flex flex-col min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} theme={theme} />
        <Navbar />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <FiLoader className="animate-spin text-yellow-500" size={40} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/verify-otp" element={<GuestRoute><VerifyOtp /></GuestRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
              <Route path="/reset-password/:token" element={<GuestRoute><ResetPassword /></GuestRoute>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/auth-guide" element={<ProtectedRoute><AuthGuide /></ProtectedRoute>} />
              <Route path="/about-me" element={<ProtectedRoute><AboutMe /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
