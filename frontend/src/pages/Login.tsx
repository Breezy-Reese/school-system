import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch user from database
      const response = await fetch(`http://localhost:5000/api/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0) {
        alert("User not found!");
        return;
      }

      const user = users[0];

      // Simple password check (in production, use proper authentication)
      // For demo purposes, accept any password for seeded users
      localStorage.setItem("user", JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        class: user.class
      }));

      // Redirect based on role
      navigate(`/${user.role}-dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (any for demo)"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin@school.com</p>
          <p>Teacher: alice.thompson@school.com</p>
          <p>Student: emma.smith@student.com</p>
          <p>Parent: john.smith@example.com</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
