import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  BrainCircuit,
  CalendarCheck2,
  Video,
  BarChart3,
  Settings,
  Search,
  Menu,
  Moon,
  Sun,
  LogOut,
  ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { to: "/app", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/app/courses", label: "Courses", icon: GraduationCap },
  { to: "/app/quizzes", label: "Quizzes", icon: BrainCircuit },
  { to: "/app/daily-quiz", label: "Daily Quiz", icon: CalendarCheck2 },
  { to: "/app/live", label: "Live Classes", icon: Video },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "My Profile", icon: Settings }
];

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const crumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean).slice(1);
    return ["CampusSphere", ...parts.map((p) => p[0].toUpperCase() + p.slice(1))];
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-3 md:p-5">
      <div className="flex gap-3 md:gap-5 min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2.5rem)]">
        <aside
          className={`surface rounded-2xl md:rounded-3xl p-3 md:p-4 transition-all duration-300 ${
            collapsed ? "w-[78px]" : "w-[250px]"
          } hidden sm:flex flex-col`}
        >
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="mb-4 w-10 h-10 rounded-xl surface flex items-center justify-center"
          >
            <Menu size={18} />
          </button>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive ? "gradient-btn text-white shadow-lg" : "hover:bg-[var(--bg-soft)]"
                    }`
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <header className="surface rounded-2xl md:rounded-3xl p-3 md:p-4 flex items-center justify-between gap-3 mb-4 md:mb-5">
            <div className="flex items-center gap-2 text-sm text-soft overflow-x-auto whitespace-nowrap scrollbar-thin">
              {crumbs.map((crumb, idx) => (
                <div key={crumb + idx} className="flex items-center gap-2">
                  <span className={idx === crumbs.length - 1 ? "text-[var(--text)] font-semibold" : ""}>{crumb}</span>
                  {idx !== crumbs.length - 1 && <ChevronRight size={14} />}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center rounded-xl border border-[var(--border)] px-3 py-2 w-full max-w-sm">
              <Search size={16} className="text-soft" />
              <input className="bg-transparent text-sm px-2 w-full outline-none" placeholder="Search courses, tracks, analytics..." />
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl surface flex items-center justify-center relative">
                <Bell size={17} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-2 right-2" />
              </button>
              <button
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                className="w-10 h-10 rounded-xl surface flex items-center justify-center"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="surface rounded-xl px-3 h-10 flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full gradient-btn" />
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-44 glass rounded-xl p-2 z-20"
                    >
                      <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm flex items-center gap-2">
                        <LogOut size={15} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
