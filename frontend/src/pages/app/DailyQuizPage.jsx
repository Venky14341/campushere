import { useState } from "react";
import { CheckCircle2, Circle, Trophy, Flame } from "lucide-react";
import toast from "react-hot-toast";

const dailyQuestions = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Day ${i + 1} Programming Quiz`,
  questions: 30,
  topic: i % 2 === 0 ? "Mixed DSA + OOP" : "Language Fundamentals"
}));

function DailyQuizPage() {
  const [completedDays, setCompletedDays] = useState([1, 2, 3, 4, 5]);

  const toggleComplete = (day) => {
    setCompletedDays((prev) => {
      const exists = prev.includes(day);
      const next = exists ? prev.filter((d) => d !== day) : [...prev, day];
      toast.success(exists ? `Day ${day} marked pending` : `Day ${day} marked completed`);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Daily Quiz Challenge - 30 Days</h1>
        <p className="text-soft text-sm mt-1">One quiz per day, 30 questions each day. Build consistency and exam speed.</p>
      </section>

      <section className="grid sm:grid-cols-3 gap-3">
        <div className="surface rounded-2xl p-4">
          <p className="text-soft text-xs">Completed Days</p>
          <p className="text-2xl font-semibold mt-1">{completedDays.length}/30</p>
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-soft text-xs">Current Streak</p>
          <p className="text-2xl font-semibold mt-1 inline-flex items-center gap-2"><Flame size={20} className="text-orange-400" /> 5 Days</p>
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-soft text-xs">Target</p>
          <p className="text-2xl font-semibold mt-1 inline-flex items-center gap-2"><Trophy size={20} className="text-yellow-400" /> 900 Questions</p>
        </div>
      </section>

      <section className="surface rounded-2xl p-5">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {dailyQuestions.map((item) => {
            const done = completedDays.includes(item.day);
            return (
              <div key={item.day} className={`rounded-xl border p-4 transition ${done ? "border-emerald-500/50 bg-emerald-500/10" : "border-[var(--border)]"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.title}</h3>
                  <button onClick={() => toggleComplete(item.day)}>
                    {done ? <CheckCircle2 className="text-emerald-400" size={18} /> : <Circle size={18} className="text-soft" />}
                  </button>
                </div>
                <p className="text-xs text-soft mt-1">{item.topic}</p>
                <p className="text-xs text-soft mt-1">{item.questions} Questions</p>
                <button className="mt-3 w-full rounded-lg border border-[var(--border)] py-2 text-sm hover:bg-[var(--bg-soft)]">Take Quiz</button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default DailyQuizPage;
