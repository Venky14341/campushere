import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/app/DashboardHome";
import StudentManagement from "./pages/app/StudentManagement";
import AnalyticsPage from "./pages/app/AnalyticsPage";
import SettingsPage from "./pages/app/SettingsPage";
import QuizHub from "./pages/app/QuizHub";
import DailyQuizPage from "./pages/app/DailyQuizPage";
import LiveClassesPage from "./pages/app/LiveClassesPage";
import CourseApplyPage from "./pages/app/CourseApplyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<StudentManagement />} />
          <Route path="courses/:id/apply" element={<CourseApplyPage />} />
          <Route path="quizzes" element={<QuizHub />} />
          <Route path="daily-quiz" element={<DailyQuizPage />} />
          <Route path="live" element={<LiveClassesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="students" element={<Navigate to="/app/courses" replace />} />
        </Route>

        <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
