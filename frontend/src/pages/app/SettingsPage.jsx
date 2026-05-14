import { useState } from "react";

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-b-0">
      <p className="text-sm">{label}</p>
      <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full transition ${value ? "bg-blue-500" : "bg-slate-400/50"}`}
      >
        <span className={`block w-5 h-5 rounded-full bg-white transition mt-1 ${value ? "ml-6" : "ml-1"}`} />
      </button>
    </div>
  );
}

function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [security, setSecurity] = useState(true);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <section className="surface rounded-2xl p-5 lg:col-span-2">
        <h3 className="font-semibold mb-4">Learner Profile</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Full name" defaultValue="Alex Morgan" />
          <input className="rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Email" defaultValue="alex@studentmail.com" />
          <input className="rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Target Exam" defaultValue="JEE Advanced" />
          <input className="rounded-xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Timezone" defaultValue="Asia/Kolkata" />
        </div>
        <button className="mt-4 gradient-btn text-white px-4 py-2 rounded-xl">Save Changes</button>
      </section>

      <section className="surface rounded-2xl p-5">
        <h3 className="font-semibold mb-3">Learning Notifications</h3>
        <Toggle label="Class Reminders" value={emailAlerts} onChange={() => setEmailAlerts((s) => !s)} />
        <Toggle label="New Batch Alerts" value={pushAlerts} onChange={() => setPushAlerts((s) => !s)} />
      </section>

      <section className="surface rounded-2xl p-5 lg:col-span-3">
        <h3 className="font-semibold mb-3">Account & Privacy</h3>
        <Toggle label="Two-factor Authentication" value={security} onChange={() => setSecurity((s) => !s)} />
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded-xl border border-[var(--border)]">Change Password</button>
          <button className="px-4 py-2 rounded-xl border border-red-500/40 text-red-400">Deactivate Account</button>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
