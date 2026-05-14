import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CreditCard, ShieldCheck } from "lucide-react";
import { courseCatalog } from "../../data/coursesData";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CourseApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@studentmail.com");

  const course = useMemo(() => courseCatalog.find((c) => String(c.id) === String(id)), [id]);

  const startPayment = async () => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      toast.error("Razorpay key missing. Add VITE_RAZORPAY_KEY_ID in frontend/.env");
      return;
    }

    const ok = await loadRazorpayScript();
    if (!ok) {
      toast.error("Unable to load Razorpay checkout");
      return;
    }

    const options = {
      key,
      amount: course.price * 100,
      currency: "INR",
      name: "CampusSphere",
      description: `Course Enrollment - ${course.title}`,
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
      handler: function () {
        toast.success("Payment successful and enrollment confirmed");
        navigate("/app/courses");
      },
      prefill: { name, email },
      notes: { course: course.title },
      theme: { color: "#4f46e5" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!course) {
    return <section className="surface rounded-2xl p-8">Course not found.</section>;
  }

  return (
    <div className="space-y-4">
      <section className="surface rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Course Application</h1>
        <p className="text-soft text-sm mt-1">Complete application and payment to enroll in this batch.</p>
      </section>

      <section className="surface rounded-2xl p-5 grid lg:grid-cols-2 gap-5">
        <div>
          <img src={course.image} alt={course.title} className="w-full h-52 object-cover rounded-xl mb-3" />
          <h2 className="text-lg font-semibold">{course.title}</h2>
          <p className="text-soft text-sm">By {course.educator} - {course.level} - {course.duration}</p>
          <p className="mt-3 text-2xl font-bold">INR {course.price}</p>
        </div>

        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Full Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Email" />

          <button onClick={startPayment} className="w-full gradient-btn text-white rounded-xl py-3 inline-flex items-center justify-center gap-2">
            <CreditCard size={16} /> Pay with Razorpay
          </button>

          <p className="text-xs text-soft inline-flex items-center gap-1"><ShieldCheck size={13} /> Secure payment powered by Razorpay</p>
        </div>
      </section>
    </div>
  );
}

export default CourseApplyPage;
