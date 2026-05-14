import { CalendarClock, Radio, Clock3 } from "lucide-react";

const schedule = [
  { day: "Mon", topic: "JEE Physics Live", educator: "Aman Sir", time: "8:00 PM - 10:00 PM", status: "Live Soon" },
  { day: "Tue", topic: "NEET Biology Live", educator: "Neha Ma'am", time: "8:00 PM - 10:00 PM", status: "Waiting Room" },
  { day: "Wed", topic: "JEE Maths Strategy", educator: "Rohit Sir", time: "8:00 PM - 10:00 PM", status: "Live Soon" },
  { day: "Thu", topic: "CUET English Live", educator: "Priya Ma'am", time: "8:00 PM - 10:00 PM", status: "Waiting Room" },
  { day: "Fri", topic: "NEET Chemistry Live", educator: "Ananya Ma'am", time: "8:00 PM - 10:00 PM", status: "Live Soon" },
  { day: "Sat", topic: "Problem Solving Marathon", educator: "Karthik Sir", time: "8:00 PM - 10:00 PM", status: "Waiting Room" },
  { day: "Sun", topic: "Weekly Doubt Clearing", educator: "Mentor Panel", time: "8:00 PM - 10:00 PM", status: "Live Soon" }
];

function LiveClassesPage() {
  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Live Classes</h1>
        <p className="text-soft text-sm mt-1">All daily live classes run from 8:00 PM to 10:00 PM. Join waiting room before class starts.</p>
      </section>

      <section className="surface rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4 text-soft text-sm"><CalendarClock size={15} /> Weekly Calendar (8 PM - 10 PM)</div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {schedule.map((item) => (
            <div key={item.day} className="rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{item.day}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400">{item.status}</span>
              </div>
              <p className="text-sm">{item.topic}</p>
              <p className="text-xs text-soft mt-1">By {item.educator}</p>
              <div className="mt-3 text-xs text-soft inline-flex items-center gap-1"><Clock3 size={13} /> {item.time}</div>
              <button className="mt-3 w-full gradient-btn text-white rounded-lg py-2 text-sm inline-flex items-center justify-center gap-1.5">
                <Radio size={14} /> Join Waiting Room
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LiveClassesPage;
