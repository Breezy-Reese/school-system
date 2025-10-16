import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      navigate(`/${userObj.role}-dashboard`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Main Dashboard</h1>
      <p className="mb-4">Choose your dashboard:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin-dashboard"
          className="p-6 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
        >
          Admin Dashboard
        </Link>

        <Link
          to="/teacher-dashboard"
          className="p-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Teacher Dashboard
        </Link>

        <Link
          to="/student-dashboard"
          className="p-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Student Dashboard
        </Link>

        <Link
          to="/parent-dashboard"
          className="p-6 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
        >
          Parent Dashboard
        </Link>
      </div>
      {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!).role === "admin" && (
        <div className="mt-8">
          <Link
            to="/admin-view-all"
            className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            View All Dashboards (Admin)
          </Link>
        </div>
      )}
    </div>
  );
}
