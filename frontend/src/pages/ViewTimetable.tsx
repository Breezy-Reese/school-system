import { useState, useEffect } from 'react';

interface TimetableEntry {
  _id: string;
  class: string;
  day: string;
  subject: string;
  time: string;
  teacher: {
    name: string;
  };
}

function ViewTimetable() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    fetchUserClass();
  }, []);

  const fetchUserClass = async () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        setSelectedClass(userObj.class || '10A'); // Default to 10A if no class
        fetchTimetable(userObj.class || '10A');
      }
    } catch (error) {
      console.error('Error fetching user class:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetable = async (className: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/timetable?class=${className}`);
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const className = e.target.value;
    setSelectedClass(className);
    fetchTimetable(className);
  };

  if (loading) return <div className="p-6">Loading timetable...</div>;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">View Timetable</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full p-2 border rounded"
          >
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Day</th>
                <th className="border border-gray-300 p-2">Subject</th>
                <th className="border border-gray-300 p-2">Time</th>
                <th className="border border-gray-300 p-2">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dayEntries = timetable.filter(entry => entry.day === day);
                return dayEntries.length > 0 ? (
                  dayEntries.map((entry, index) => (
                    <tr key={`${day}-${index}`}>
                      {index === 0 && <td className="border border-gray-300 p-2 font-semibold" rowSpan={dayEntries.length}>{day}</td>}
                      <td className="border border-gray-300 p-2">{entry.subject}</td>
                      <td className="border border-gray-300 p-2">{entry.time}</td>
                      <td className="border border-gray-300 p-2">{entry.teacher.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={day}>
                    <td className="border border-gray-300 p-2 font-semibold">{day}</td>
                    <td className="border border-gray-300 p-2" colSpan={3}>No classes scheduled</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewTimetable;
