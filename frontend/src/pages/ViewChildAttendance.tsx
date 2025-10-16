import { useState, useEffect } from 'react';

interface AttendanceRecord {
  childName: string;
  date: string;
  status: string;
  teacherName: string;
}

function ViewChildAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    if (!userObj || userObj.role !== 'parent') {
      setError('You must be logged in as a parent to view child attendance.');
      setLoading(false);
      return;
    }

    try {
      // Fetch children of the parent
      const responseChildren = await fetch(`http://localhost:5000/api/users?role=student&parent=${userObj.email}`);
      if (!responseChildren.ok) {
        throw new Error('Failed to fetch children');
      }
      const children = await responseChildren.json();

      // Fetch attendance for each child
      const attendancePromises = children.map(async (child: any) => {
        const responseAttendance = await fetch(`http://localhost:5000/api/attendance?student=${child.email}`);
        if (!responseAttendance.ok) {
          throw new Error('Failed to fetch attendance for child');
        }
        const attendanceData = await responseAttendance.json();
        return { childName: child.name, attendance: attendanceData };
      });

      const attendanceResults = await Promise.all(attendancePromises);

      // Flatten attendance records with child name
      const records = attendanceResults.flatMap((result: any) =>
        result.attendance.map((record: any) => ({
          childName: result.childName,
          date: new Date(record.date).toLocaleDateString(),
          status: record.status,
          teacherName: record.teacher.name || record.teacher.email || 'Unknown',
        }))
      );

      setAttendanceRecords(records);
    } catch (err: any) {
      setError(err.message || 'Error fetching attendance');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading child attendance records...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">View Child's Attendance</h1>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for your children.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Child</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Marked By</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index} className={record.status === 'present' ? 'text-green-600' : 'text-red-600'}>
                <td className="py-2 px-4 border-b">{record.childName}</td>
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

export default ViewChildAttendance;
