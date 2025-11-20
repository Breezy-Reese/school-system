import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import ParentDashboard from "./ParentDashboard";

export default function AdminViewAllDashboards() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8">Admin View: All Dashboards</h1>
      <section className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Admin Dashboard</h2>
        <AdminDashboard />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Teacher Dashboard</h2>
        <TeacherDashboard />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>
        <StudentDashboard />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Parent Dashboard</h2>
        <ParentDashboard />
      </section>
    </div>
  );
}
