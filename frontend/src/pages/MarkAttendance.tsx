import { useState, useEffect } from 'react';

interface Student {
  _id: string;
  name: string;
  email: string;
}

function MarkAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users?role=student');
      const data = await response.json();
      setStudents(data);
      const initialAttendance = data.reduce((acc: Record<string, boolean>, student: Student) => {
        acc[student._id] = false; // default absent
        return acc;
      }, {});
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSubmit = async () => {
    const attendances = students.map(student => ({
      student: student._id,
      status: attendance[student._id] ? 'present' : 'absent'
    }));
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    const teacherId = userObj && userObj.role === 'teacher' ? userObj.email : null; // Using email as ID for now, adjust as needed

    const payload = {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      teacher: teacherId,
      attendances
    };
    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        alert('Attendance submitted successfully!');
      } else {
        alert('Error submitting attendance');
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Error submitting attendance');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Mark Attendance</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Class: 10A - Date: {new Date().toLocaleDateString()}</h2>
        <div className="space-y-2">
          {students.map((student) => (
            <div key={student._id} className="flex items-center justify-between p-2 border rounded">
              <span className="font-medium">{student.name}</span>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={student._id}
                    checked={attendance[student._id]}
                    onChange={() => handleAttendanceChange(student._id, true)}
                    className="mr-2"
                  />
                  Present
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={student._id}
                    checked={!attendance[student._id]}
                    onChange={() => handleAttendanceChange(student._id, false)}
                    className="mr-2"
                  />
                  Absent
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}

export default MarkAttendance;
