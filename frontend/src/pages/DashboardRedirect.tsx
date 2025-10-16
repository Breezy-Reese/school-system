// src/pages/DashboardRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardRedirect() {
  const navigate = useNavigate();

  // Mock role storage (later replace with context/auth state)
  const role = localStorage.getItem("role"); 

  useEffect(() => {
    if (!role) {
      navigate("/login"); // not logged in → back to login
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "teacher") {
      navigate("/teacher-dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    } else if (role === "parent") {
      navigate("/parent-dashboard");
    }
  }, [role, navigate]);

  return <p>Loading dashboard...</p>;
}

export default DashboardRedirect;
