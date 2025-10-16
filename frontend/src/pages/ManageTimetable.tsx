import { useState, useEffect } from 'react';

interface TimetableEntry {
  _id: string;
  class: string;
  day: string;
  subject: string;
  time: string;
  teacher: {
    name: string;
    email: string;
  };
}

function ManageTimetable() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    class: '',
    day: '',
    subject: '',
    time: '',
    teacher: '',
  });

  useEffect(() => {
    fetchTimetable();
    fetchTeachers();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/timetable');
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users?role=teacher');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchTimetable();
        setForm({ class: '', day: '', subject: '', time: '', teacher: '' });
      } else {
        alert('Error creating timetable entry');
      }
    } catch (error) {
      console.error('Error creating timetable entry:', error);
      alert('Error creating timetable entry');
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/timetable/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTimetable();
      } else {
        alert('Error deleting timetable entry');
      }
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
      alert('Error deleting timetable entry');
    }
  };

  if (loading) return <div className="p-6">Loading timetable...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-700 mb-4">Manage Timetable</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Add New Timetable Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Time (e.g., 9:00 AM - 10:00 AM)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <select
            value={form.teacher}
            onChange={(e) => setForm({ ...form, teacher: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher.email}>
                {teacher.name} ({teacher.subject})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Entry
        </button>
      </form>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Day</th>
            <th className="py-2 px-4 border-b">Subject</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Teacher</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry) => (
            <tr key={entry._id}>
              <td className="py-2 px-4 border-b">{entry.class}</td>
              <td className="py-2 px-4 border-b">{entry.day}</td>
              <td className="py-2 px-4 border-b">{entry.subject}</td>
              <td className="py-2 px-4 border-b">{entry.time}</td>
              <td className="py-2 px-4 border-b">{entry.teacher.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteEntry(entry._id)}
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

export default ManageTimetable;
