import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [distribution, setDistribution] = useState({ student: 0, teacher: 0, admin: 0, parent: 0 });
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

    fetch("https://school-system-4m52.onrender.com/api/users/distribution")
      .then(res => res.json())
      .then(data => setDistribution(data))
      .catch(err => console.error(err));
  }, []);

  const pieData = {
    labels: ['Students', 'Teachers', 'Admins', 'Parents'],
    datasets: [
      {
        data: [distribution.student, distribution.teacher, distribution.admin, distribution.parent],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">User Distribution</h2>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={pieData} />
            </div>
          </div>
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
