import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, Globe, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function AuthPage({ mode = "login" }) {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const subtitle = useMemo(
    () =>
      isLogin
        ? "Welcome back. Manage students, analytics, and performance in one place."
        : "Start your premium workspace for student lifecycle operations.",
    [isLogin]
  );

  const submit = async () => {
    if (!username.trim() || password.length < 6) {
      toast.error("Enter username and password (min 6 chars)");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password });
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Logged in");
        navigate("/app");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password });
        toast.success("Registration successful");
        navigate("/");
      }
    } catch (error) {
      const responseData = error?.response?.data;
      const message =
        typeof responseData === "object"
          ? responseData?.message
          : responseData || error?.message || "Authentication failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 p-4 md:p-8 gap-4 md:gap-8">
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden lg:flex rounded-3xl overflow-hidden surface"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-600/80 to-cyan-500/70" />
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative z-10 p-10 flex flex-col justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">CampusSphere</h1>
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-semibold leading-tight">
              Discover courses with a startup-grade student experience.
            </h2>
            <p className="text-white/85">
              Explore all courses, track your learning journey, and stay informed with a polished student-first dashboard.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-3xl surface flex items-center justify-center p-6 md:p-12"
      >
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{isLogin ? "Sign in" : "Create account"}</h2>
            <p className="text-soft mt-2 text-sm">{subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="surface rounded-xl py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
              <Globe size={16} /> Google
            </button>
            <button className="surface rounded-xl py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
              <GitBranch size={16} /> GitHub
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-soft mb-1.5 block">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter username"
              />
            </label>
            <label className="block text-sm">
              <span className="text-soft mb-1.5 block">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Minimum 6 characters"
              />
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={submit}
            disabled={loading}
            className="w-full gradient-btn rounded-xl text-white py-3 font-medium disabled:opacity-70"
          >
            {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
          </motion.button>

          <p className="text-sm text-soft text-center">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <Link className="text-blue-500 font-semibold" to={isLogin ? "/register" : "/"}>
              {isLogin ? "Create account" : "Sign in"}
            </Link>
          </p>
        </div>
      </motion.section>
    </div>
  );
}

export default AuthPage;
