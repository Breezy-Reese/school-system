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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Hub */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/admin-view-all" element={<AdminViewAllDashboards />} />
      <Route path="/mark-attendance" element={<MarkAttendance />} />
      <Route path="/view-attendance" element={<ViewAttendance />} />
      <Route path="/view-child-attendance" element={<ViewChildAttendance />} />
      <Route path="/view-child-fees" element={<ViewChildFees />} />
      <Route path="/view-child-results" element={<ViewChildResults />} />
      <Route path="/manage-fees" element={<ManageFees />} />
      <Route path="/manage-students" element={<ManageUsers role="student" />} />
      <Route path="/manage-teachers" element={<ManageUsers role="teacher" />} />
      <Route path="/manage-timetable" element={<ManageTimetable />} />
      <Route path="/view-timetable" element={<ViewTimetable />} />
      <Route path="/upload-results" element={<UploadResults />} />
      <Route path="/check-results" element={<CheckResults />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
