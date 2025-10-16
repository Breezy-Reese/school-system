import { useState, useEffect } from 'react';

interface Fee {
  _id: string;
  student: { name: string; email: string };
  amount: number;
  dueDate: string;
  status: string;
  description: string;
}

function ManageFees() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    student: '',
    amount: '',
    dueDate: '',
    description: '',
  });

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await fetch('https://school-system-4m52.onrender.com/api/fees');
      if (!response.ok) throw new Error('Failed to fetch fees');
      const data = await response.json();
      setFees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://school-system-4m52.onrender.com/api/users?role=student');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://school-system-4m52.onrender.com/api/fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to create fee');
      fetchFees();
      setForm({ student: '', amount: '', dueDate: '', description: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`https://school-system-4m52.onrender.com/api/fees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update fee');
      fetchFees();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteFee = async (id: string) => {
    try {
      const response = await fetch(`https://school-system-4m52.onrender.com/api/fees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete fee');
      fetchFees();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading fees...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">Manage Fees</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Add New Fee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={form.student}
            onChange={(e) => setForm({ ...form, student: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student.email}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Fee
        </button>
      </form>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Student</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id}>
              <td className="py-2 px-4 border-b">{fee.student.name}</td>
              <td className="py-2 px-4 border-b">${fee.amount}</td>
              <td className="py-2 px-4 border-b">{new Date(fee.dueDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={fee.status}
                  onChange={(e) => updateStatus(fee._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">{fee.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteFee(fee._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageFees;
