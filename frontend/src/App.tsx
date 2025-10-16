import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import AdminViewAllDashboards from "./pages/AdminViewAllDashboards";
import MarkAttendance from "./pages/MarkAttendance";
import UploadResults from "./pages/UploadResults";
import CheckResults from "./pages/CheckResults";
import ViewAttendance from "./pages/ViewAttendance";
import ViewChildAttendance from "./pages/ViewChildAttendance";
import ViewChildFees from "./pages/ViewChildFees";
import ManageUsers from "./pages/ManageUsers";
import ManageFees from "./pages/ManageFees";
import ManageTimetable from "./pages/ManageTimetable";
import ViewTimetable from "./pages/ViewTimetable";
import ViewChildResults from "./pages/ViewChildResults";

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" />;
  }
  const userObj = JSON.parse(user);
  if (!allowedRoles.includes(userObj.role)) {
    return <Navigate to={`/${userObj.role}-dashboard`} />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Hub */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/parent-dashboard" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>} />
      <Route path="/admin-view-all" element={<ProtectedRoute allowedRoles={["admin"]}><AdminViewAllDashboards /></ProtectedRoute>} />
      <Route path="/mark-attendance" element={<ProtectedRoute allowedRoles={["teacher", "admin"]}><MarkAttendance /></ProtectedRoute>} />
      <Route path="/view-attendance" element={<ProtectedRoute allowedRoles={["student"]}><ViewAttendance /></ProtectedRoute>} />
      <Route path="/view-child-attendance" element={<ProtectedRoute allowedRoles={["parent"]}><ViewChildAttendance /></ProtectedRoute>} />
      <Route path="/view-child-fees" element={<ProtectedRoute allowedRoles={["parent"]}><ViewChildFees /></ProtectedRoute>} />
      <Route path="/view-child-results" element={<ProtectedRoute allowedRoles={["parent"]}><ViewChildResults /></ProtectedRoute>} />
      <Route path="/manage-fees" element={<ProtectedRoute allowedRoles={["admin"]}><ManageFees /></ProtectedRoute>} />
      <Route path="/manage-students" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUsers role="student" /></ProtectedRoute>} />
      <Route path="/manage-teachers" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUsers role="teacher" /></ProtectedRoute>} />
      <Route path="/manage-timetable" element={<ProtectedRoute allowedRoles={["teacher", "admin"]}><ManageTimetable /></ProtectedRoute>} />
      <Route path="/view-timetable" element={<ProtectedRoute allowedRoles={["student"]}><ViewTimetable /></ProtectedRoute>} />
      <Route path="/upload-results" element={<ProtectedRoute allowedRoles={["teacher", "admin"]}><UploadResults /></ProtectedRoute>} />
      <Route path="/check-results" element={<ProtectedRoute allowedRoles={["student"]}><CheckResults /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
