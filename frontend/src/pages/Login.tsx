import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch user from database
      const response = await fetch(`http://localhost:5000/api/users?email=${email}`);
      if (!response.ok) {
        alert("Login failed: " + response.statusText);
        return;
      }
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://school-system-4m52.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          class: className,
          subject: role === "teacher" ? subject : undefined,
        }),
      });

      if (response.ok) {
        alert("Account created successfully! Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setClassName("");
        setSubject("");
      } else {
        alert("Failed to create account!");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Sign up failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={isLogin ? handleLogin : handleSignUp}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 mb-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
            {(role === "student" || role === "teacher") && (
              <input
                type="text"
                placeholder="Class (e.g., 10A)"
                className="w-full border p-2 mb-3 rounded"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            )}
            {role === "teacher" && (
              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-2 mb-3 rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            )}
          </>
        )}

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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-3"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-blue-600 hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>

        {isLogin && (
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Demo Accounts:</strong></p>
            <p>Admin: admin@school.com</p>
            <p>Teacher: alice.thompson@school.com</p>
            <p>Student: emma.smith@student.com</p>
            <p>Parent: john.smith@example.com</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
