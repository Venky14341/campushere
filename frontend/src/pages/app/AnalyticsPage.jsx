import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

const perfData = [
  { name: "Week 1", score: 76 },
  { name: "Week 2", score: 82 },
  { name: "Week 3", score: 79 },
  { name: "Week 4", score: 91 }
];

const courses = [
  { name: "CS", value: 32 },
  { name: "AI", value: 24 },
  { name: "Biz", value: 18 },
  { name: "UX", value: 14 }
];

const trend = [
  { day: "Mon", attendance: 88 },
  { day: "Tue", attendance: 91 },
  { day: "Wed", attendance: 89 },
  { day: "Thu", attendance: 94 },
  { day: "Fri", attendance: 92 }
];

const colors = ["#3b82f6", "#6366f1", "#06b6d4", "#8b5cf6"];

function AnalyticsPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="surface rounded-2xl p-5 h-[320px]">
        <h3 className="font-semibold mb-4">Learner Performance Score</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={perfData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="surface rounded-2xl p-5 h-[320px]">
        <h3 className="font-semibold mb-4">Popular Exam/Course Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={courses} dataKey="value" innerRadius={55} outerRadius={96}>
              {courses.map((_, idx) => (
                <Cell key={idx} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="surface rounded-2xl p-5 h-[320px] lg:col-span-2">
        <h3 className="font-semibold mb-4">Live Class Attendance Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#06b6d4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsPage;
