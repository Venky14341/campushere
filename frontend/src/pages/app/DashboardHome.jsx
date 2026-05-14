import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Radio,
  UserRoundCheck,
  Clock3,
  Compass,
  ArrowUpRight,
  CalendarClock,
  Sparkles,
  Trophy,
  Flame
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Learners", value: "128.4K", delta: "+6.2%", icon: Users },
  { label: "Live Classes Today", value: 236, delta: "+18", icon: Radio },
  { label: "Top Educators", value: 82, delta: "+4", icon: UserRoundCheck },
  { label: "Watch Hours", value: "18.6K", delta: "+12%", icon: Clock3 }
];

const topTracks = [
  { name: "IIT-JEE", learners: "42K", fill: "78%" },
  { name: "NEET", learners: "36K", fill: "69%" },
  { name: "Foundation", learners: "23K", fill: "51%" }
];

const schedule = [
  { title: "JEE Physics Live", time: "8:00 PM" },
  { title: "NEET Biology Live", time: "8:45 PM" },
  { title: "Doubt Marathon", time: "9:30 PM" }
];

const visualShowcase = [
  {
    title: "Immersive Live Classrooms",
    subtitle: "HD streaming with real-time doubt support",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Mentor-Led Exam Strategy",
    subtitle: "Top educators for IIT-JEE and NEET tracks",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Performance Analytics",
    subtitle: "Data-backed insights to improve rank",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
  }
];

function StatCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="surface rounded-2xl p-5 relative overflow-hidden"
    >
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-soft">{item.label}</p>
          <p className="text-3xl font-semibold mt-2">{item.value}</p>
          <p className="text-xs text-emerald-400 mt-2 inline-flex items-center gap-1">
            <ArrowUpRight size={12} /> {item.delta} this week
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
          <Icon size={19} />
        </div>
      </div>
    </motion.div>
  );
}

function DashboardHome() {
  const hour = new Date().getHours();
  const greeting = useMemo(() => {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, [hour]);

  return (
    <div className="space-y-5">
      <section className="surface rounded-3xl p-6 md:p-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-cyan-500/10" />
        <div className="absolute -left-12 -bottom-16 w-56 h-56 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute right-0 top-0 w-52 h-52 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/10 border border-[var(--border)] text-xs">
              <Sparkles size={13} className="text-cyan-300" />
              CAMPUSSPHERE PREMIUM LEARNING
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{greeting}, Alex. Your learning dashboard is accelerating.</h1>
            <p className="text-soft mt-3 max-w-2xl">Track your live classes, solve quizzes daily, and follow exam-focused journeys with a world-class online learning experience.</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/app/courses" className="gradient-btn text-white px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                <Compass size={16} /> Explore Courses
              </Link>
              <Link to="/app/live" className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-soft)] transition inline-flex items-center gap-2">
                <CalendarClock size={15} /> Join 8 PM Live Class
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="glass rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-soft">Learning Streak</p>
              <p className="text-2xl font-semibold mt-2 inline-flex items-center gap-2"><Flame size={20} className="text-orange-400" /> 17 Days</p>
              <p className="text-xs text-soft mt-2">Daily quiz and class attendance is above 90%.</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-soft">Achievement</p>
              <p className="text-lg font-semibold mt-2 inline-flex items-center gap-2"><Trophy size={18} className="text-yellow-400" /> Top 8% Learner Rank</p>
              <p className="text-xs text-soft mt-2">Keep your momentum to unlock mentor sessions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <StatCard key={item.label} item={item} index={index} />
        ))}
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {visualShowcase.map((card, idx) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="surface rounded-2xl overflow-hidden group"
          >
            <div className="relative">
              <img
                src={card.image}
                alt={card.title}
                className="h-48 w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-white font-semibold">{card.title}</h3>
                <p className="text-slate-200/90 text-xs mt-1">{card.subtitle}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-4">
        <div className="surface rounded-2xl p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Top Exam Tracks</h2>
            <span className="text-xs text-soft">Updated 5 min ago</span>
          </div>
          <div className="space-y-4">
            {topTracks.map((track) => (
              <div key={track.name}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <p>{track.name}</p>
                  <p className="text-soft">{track.learners}</p>
                </div>
                <div className="h-2 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: track.fill }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface rounded-2xl p-5">
          <h2 className="font-semibold">Tonight's Timeline</h2>
          <div className="mt-4 space-y-3">
            {schedule.map((slot) => (
              <div key={slot.title} className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-sm font-medium">{slot.title}</p>
                <p className="text-xs text-soft mt-1">Starts at {slot.time}</p>
              </div>
            ))}
          </div>
          <Link to="/app/live" className="mt-4 block text-center rounded-xl gradient-btn text-white py-2.5 text-sm font-medium">Open Live Calendar</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Link to="/app/live" className="surface rounded-2xl p-4 hover:-translate-y-0.5 transition-transform text-sm">Join Live Class</Link>
        <Link to="/app/daily-quiz" className="surface rounded-2xl p-4 hover:-translate-y-0.5 transition-transform text-sm">Practice Daily Quiz (30 Days)</Link>
        <Link to="/app/courses" className="surface rounded-2xl p-4 hover:-translate-y-0.5 transition-transform text-sm">Watch Recorded Sessions</Link>
        <Link to="/app/quizzes" className="surface rounded-2xl p-4 hover:-translate-y-0.5 transition-transform text-sm">Start Programming Quiz (30 Questions)</Link>
      </section>
    </div>
  );
}

export default DashboardHome;
