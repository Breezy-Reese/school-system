import { Link } from 'react-router-dom';

function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">👩‍🏫 Teacher Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/mark-attendance">
          <button className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 w-full">
            Mark Attendance
          </button>
        </Link>
        <Link to="/upload-results">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 w-full">
            Upload Results
          </button>
        </Link>
        <Link to="/manage-timetable">
          <button className="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 w-full">
            Manage Timetable
          </button>
        </Link>
      </div>
    </div>
  );
}
export default TeacherDashboard;
