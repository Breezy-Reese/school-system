import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">🎓 Student Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/view-attendance">
          <button className="bg-purple-500 text-white p-4 rounded-lg shadow hover:bg-purple-600 w-full">
            View Attendance
          </button>
        </Link>
        <Link to="/check-results">
          <button className="bg-indigo-500 text-white p-4 rounded-lg shadow hover:bg-indigo-600 w-full">
            Check Results
          </button>
        </Link>
        <Link to="/view-timetable">
          <button className="bg-pink-500 text-white p-4 rounded-lg shadow hover:bg-pink-600 w-full">
            View Timetable
          </button>
        </Link>
      </div>
    </div>
  );
}
export default StudentDashboard;
