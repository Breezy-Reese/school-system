import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  class?: string;
  subject?: string;
}

interface ManageUsersProps {
  role: string;
}

function ManageUsers({ role }: ManageUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", class: "", subject: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://school-system-4m52.onrender.com/api/users?role=${role}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", class: "", subject: "" });
    // Open modal or form
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, class: user.class || "", subject: user.subject || "" });
    // Open modal or form
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`https://school-system-4m52.onrender.com/api/users/${id}`, { method: "DELETE" });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { ...formData, role };
    try {
      if (editingUser) {
        await fetch(`https://school-system-4m52.onrender.com/api/users/${editingUser._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } else {
        await fetch("https://school-system-4m52.onrender.com/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }
      fetchUsers();
      setFormData({ name: "", email: "", class: "", subject: "" });
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage {role.charAt(0).toUpperCase() + role.slice(1)}s</h1>
      <button onClick={handleAdd} className="bg-blue-500 text-white p-2 rounded mb-4">Add {role}</button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            {role === "student" && <th className="border border-gray-300 p-2">Class</th>}
            {role === "teacher" && <th className="border border-gray-300 p-2">Subject</th>}
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              {role === "student" && <td className="border border-gray-300 p-2">{user.class}</td>}
              {role === "teacher" && <td className="border border-gray-300 p-2">{user.subject}</td>}
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Simple form for add/edit */}
      {(editingUser || formData.name) && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border p-2 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="border p-2 mr-2"
          />
          {role === "student" && (
            <input
              type="text"
              placeholder="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="border p-2 mr-2"
            />
          )}
          {role === "teacher" && (
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="border p-2 mr-2"
            />
          )}
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
          <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </form>
      )}
      <button onClick={() => navigate("/admin-dashboard")} className="mt-4 bg-gray-500 text-white p-2 rounded">Back to Dashboard</button>
    </div>
  );
}

export default ManageUsers;
