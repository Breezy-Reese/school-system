import { useState, useEffect } from 'react';

interface AttendanceRecord {
  date: string;
  status: string;
  teacherName: string;
}

function ViewAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    if (!userObj || userObj.role !== 'student') {
      setError('You must be logged in as a student to view attendance.');
      setLoading(false);
      return;
    }

    try {
      // Fetch attendance records for the logged-in student
      const response = await fetch(`http://localhost:5000/api/attendance?student=${userObj.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch attendance');
      }
      const data = await response.json();

      // Map data to AttendanceRecord[]
      const records = data.map((record: any) => ({
        date: new Date(record.date).toLocaleDateString(),
        status: record.status,
        teacherName: record.teacher.name || record.teacher.email || 'Unknown',
      }));

      setAttendanceRecords(records);
    } catch (err: any) {
      setError(err.message || 'Error fetching attendance');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading attendance records...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">View Attendance</h1>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Marked By</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index} className={record.status === 'present' ? 'text-green-600' : 'text-red-600'}>
                <td className="py-2 px-4 border-b">{record.date}</td>
                <td className="py-2 px-4 border-b">{record.status}</td>
                <td className="py-2 px-4 border-b">{record.teacherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAttendance;
