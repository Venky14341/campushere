import axios from "axios";

const api = axios.create({
  // In production, set VITE_API_URL in Vercel env vars.
  // Empty string keeps requests relative to current domain if needed.
  baseURL: import.meta.env.VITE_API_URL || "",
});

export default api;
