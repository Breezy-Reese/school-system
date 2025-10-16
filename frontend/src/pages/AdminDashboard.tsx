import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://school-system-4m52.onrender.com/api/users/count?role=student")
      .then(res => res.json())
      .then(data => setStudentCount(data.count))
      .catch(err => console.error(err));

    fetch("https://school-system-4m52.onrender.com/api/users/count?role=teacher")
      .then(res => res.json())
      .then(data => setTeacherCount(data.count))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700">🛠️ Admin Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-700">Total Students</h2>
          <p className="text-3xl font-bold text-blue-900">{studentCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-700">Total Teachers</h2>
          <p className="text-3xl font-bold text-green-900">{teacherCount}</p>
        </div>
        <button
          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600"
          onClick={() => navigate("/manage-students")}
        >
          Manage Students
        </button>
        <button
          className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600"
          onClick={() => navigate("/manage-teachers")}
        >
          Manage Teachers
        </button>
        <button className="bg-red-500 text-white p-4 rounded-lg shadow hover:bg-red-600" onClick={() => navigate("/manage-fees")}>
          Fee Management
        </button>
        <button className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600" onClick={() => navigate("/manage-timetable")}>
          Manage Timetable
        </button>
      </div>
    </div>
  );
}
export default AdminDashboard;
