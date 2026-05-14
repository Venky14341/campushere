import { useMemo, useState } from "react";
import { Brain, PlayCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { quizData } from "../../data/quizData";

function QuizHub() {
  const [language, setLanguage] = useState(quizData[0].language);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const activeQuiz = useMemo(() => quizData.find((q) => q.language === language), [language]);
  const current = activeQuiz.questions[index];
  const total = activeQuiz.questions.length;

  const startQuiz = () => {
    setStarted(true);
    setIndex(0);
    setScore(0);
    setSelected(null);
    toast.success(`${language} quiz started`);
  };

  const submitAndNext = () => {
    if (selected === null) {
      toast.error("Select an option first");
      return;
    }

    if (selected === current.answerIndex) setScore((s) => s + 1);

    if (index + 1 >= total) {
      const final = selected === current.answerIndex ? score + 1 : score;
      toast.success(`Quiz completed: ${final}/${total}`);
      setStarted(false);
      return;
    }

    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Programming Quiz Arena</h1>
        <p className="text-soft text-sm mt-1">Each language has 30 questions. Practice daily to improve speed and accuracy.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {quizData.map((q) => (
            <button
              key={q.language}
              onClick={() => {
                setLanguage(q.language);
                setStarted(false);
              }}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                language === q.language ? "gradient-btn text-white border-transparent" : "border-[var(--border)]"
              }`}
            >
              {q.language} ({q.questions.length})
            </button>
          ))}
        </div>
      </section>

      {!started ? (
        <section className="surface rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-lg">{language} Quiz Pack</h2>
            <p className="text-soft text-sm mt-1">30 MCQs covering fundamentals, OOP, data structures, concurrency, and real interview topics.</p>
          </div>
          <button onClick={startQuiz} className="gradient-btn text-white px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
            <PlayCircle size={16} /> Start {language} Quiz
          </button>
        </section>
      ) : (
        <section className="surface rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 text-sm">
            <p className="text-soft">Question {index + 1} / {total}</p>
            <p className="text-soft">Score: {score}</p>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-soft)] overflow-hidden mb-5">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>

          <h3 className="text-lg font-medium leading-relaxed">{current.question}</h3>

          <div className="mt-4 space-y-2">
            {current.options.map((option, i) => (
              <button
                key={option}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                  selected === i ? "border-blue-500 bg-blue-500/10" : "border-[var(--border)] hover:bg-[var(--bg-soft)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="text-xs text-soft inline-flex items-center gap-1">
              <Brain size={13} /> Choose the best answer, then continue.
            </div>
            <button onClick={submitAndNext} className="gradient-btn text-white px-4 py-2 rounded-xl text-sm inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Submit & Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default QuizHub;
