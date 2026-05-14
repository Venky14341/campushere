import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock3, Users, PlayCircle, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courseCatalog } from "../../data/coursesData";

function StudentManagement() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const navigate = useNavigate();

  const tags = ["All", "JEE", "NEET", "Foundation", "CUET"];

  const filteredCourses = useMemo(() => {
    return courseCatalog.filter((course) => {
      const matchesQuery = [course.title, course.educator, course.level, course.tag]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTag = activeTag === "All" || course.tag === activeTag;
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Explore Online Courses</h1>
        <p className="text-soft text-sm mt-1">Find live classes, recorded sessions, and exam-focused batches from top educators.</p>
      </section>

      <section className="surface rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search size={16} className="absolute left-3 top-3.5 text-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search JEE, NEET, educators, topics..."
              className="w-full rounded-xl border border-[var(--border)] bg-transparent py-3 pl-9 pr-3"
            />
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-soft">
            <Filter size={15} /> Smart filters enabled
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                activeTag === tag ? "gradient-btn text-white border-transparent" : "border-[var(--border)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.map((course, index) => (
          <motion.article
            key={course.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="surface rounded-2xl p-5 hover:-translate-y-1 transition-transform"
          >
            <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-xl mb-4" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400">{course.tag}</span>
              <span className="text-xs text-soft">{course.level}</span>
            </div>
            <h3 className="font-semibold text-lg leading-snug">{course.title}</h3>
            <p className="text-soft text-sm mt-1">By {course.educator}</p>

            <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-soft">
              <div className="rounded-lg border border-[var(--border)] p-2 inline-flex items-center gap-1"><Users size={13} /> {course.learners}</div>
              <div className="rounded-lg border border-[var(--border)] p-2 inline-flex items-center gap-1"><Clock3 size={13} /> {course.duration}</div>
              <div className="rounded-lg border border-[var(--border)] p-2 inline-flex items-center gap-1"><Star size={13} /> {course.rating}</div>
              <div className="rounded-lg border border-[var(--border)] p-2 text-emerald-400 font-semibold">INR {course.price}</div>
            </div>

            <button
              onClick={() => navigate(`/app/courses/${course.id}/apply`)}
              className="mt-4 w-full gradient-btn text-white py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              <PlayCircle size={15} /> Apply & Continue
            </button>
          </motion.article>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <section className="surface rounded-2xl p-10 text-center text-soft">
          No courses match your search. Try another exam track or educator.
        </section>
      )}
    </div>
  );
}

export default StudentManagement;
