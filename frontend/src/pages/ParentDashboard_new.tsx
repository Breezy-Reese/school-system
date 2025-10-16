import { Link } from 'react-router-dom';

function ParentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-700">👨‍👩‍👧 Parent Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/view-child-attendance">
          <button className="bg-orange-500 text-white p-4 rounded-lg shadow hover:bg-orange-600 w-full">
            View Child's Attendance
          </button>
        </Link>
        <Link to="/view-child-results">
          <button className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 w-full">
            View Child's Results
          </button>
        </Link>
        <Link to="/view-child-fees">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 w-full">
            Check Fee Payments
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ParentDashboard;
